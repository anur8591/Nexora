from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
import uuid, os

from gpt_analyzer import analyze_with_gpt
from report_generator import generate_report

app = FastAPI()

UPLOAD_DIR = "uploads"
REPORT_DIR = "reports"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(REPORT_DIR, exist_ok=True)

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    file_path = f"{UPLOAD_DIR}/{file_id}_{file.filename}"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Step 1: GPT Analysis
    analysis = analyze_with_gpt(file.filename, file.content_type)

    # Step 2: Generate Report
    report_path = generate_report(file.filename, analysis)

    return {
        "label": analysis["label"],
        "probability": analysis["probability"],
        "confidence": analysis["confidence"],
        "explanation": analysis["explanation"],
        "report_url": f"/download/{os.path.basename(report_path)}"
    }

@app.get("/download/{report_name}")
def download_report(report_name: str):
    return FileResponse(
        path=f"reports/{report_name}",
        filename=report_name,
        media_type="application/pdf"
    )
