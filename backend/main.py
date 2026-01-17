import os
import uuid
import json
import hashlib
from datetime import datetime
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from openai import OpenAI
from fpdf import FPDF



# ---------------- CONFIG ----------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, "../frontend")
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
REPORT_DIR = os.path.join(BASE_DIR, "reports")

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(REPORT_DIR, exist_ok=True)

client = OpenAI()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve frontend
app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")

@app.get("/", response_class=HTMLResponse)
def serve_frontend():
    with open(os.path.join(FRONTEND_DIR, "index.html"), "r", encoding="utf-8") as f:
        return f.read()

# ---------------- UTILITIES ----------------

def sha256_of_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            h.update(chunk)
    return h.hexdigest()

# ---------------- GPT ANALYSIS ----------------

def analyze_with_gpt(input_type, content):
    prompt = f"""
You are a digital forensic AI.

Analyze the following {input_type} and return STRICT JSON:

{{
  "label": "Real/Fake/Suspicious",
  "probability": 0-100,
  "confidence": "Low/Medium/High",
  "explanation": "Detailed forensic reasoning"
}}

Content:
{content}
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a forensic deepfake detection assistant."},
                {"role": "user", "content": prompt}
            ]
        )

        raw = response.choices[0].message.content

        # Try to extract JSON
        start = raw.find("{")
        end = raw.rfind("}") + 1
        parsed = json.loads(raw[start:end])

        return parsed

    except Exception as e:
        return {
            "label": "Error",
            "probability": 0,
            "confidence": "Low",
            "explanation": str(e)
        }

# ---------------- PDF REPORT ----------------

def generate_report(title, analysis, file_hash=None):
    case_id = str(uuid.uuid4())
    timestamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    file_path = os.path.join(REPORT_DIR, f"{case_id}.pdf")

    pdf = FPDF()
    pdf.add_page()

    pdf.set_font("Arial", "B", 16)
    pdf.cell(0, 10, "Nexora Deepfake Forensic Report", ln=True)

    pdf.ln(6)
    pdf.set_font("Arial", size=12)
    pdf.cell(0, 8, f"Case ID: {case_id}", ln=True)
    pdf.cell(0, 8, f"Generated: {timestamp}", ln=True)
    pdf.cell(0, 8, f"Title: {title}", ln=True)

    if file_hash:
        pdf.cell(0, 8, f"SHA256: {file_hash}", ln=True)

    pdf.ln(6)
    pdf.cell(0, 8, f"Label: {analysis['label']}", ln=True)
    pdf.cell(0, 8, f"Probability: {analysis['probability']}%", ln=True)
    pdf.cell(0, 8, f"Confidence: {analysis['confidence']}", ln=True)

    pdf.ln(8)
    pdf.multi_cell(0, 8, f"Explanation:\n{analysis['explanation']}")

    pdf.output(file_path)

    return file_path, case_id, timestamp

# ---------------- ROUTES ----------------

@app.post("/analyze/media")
async def analyze_media(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")

    with open(file_path, "wb") as f:
        f.write(await file.read())

    file_hash = sha256_of_file(file_path)

    analysis = analyze_with_gpt("media file", file.filename)
    report_path, case_id, timestamp = generate_report(file.filename, analysis, file_hash)

    return {
        "case_id": case_id,
        "timestamp": timestamp,
        "file_hash": file_hash,
        "analysis": analysis,
        "report_url": f"/download/{os.path.basename(report_path)}"
    }

@app.post("/analyze/text")
async def analyze_text(text: str = Form(...)):
    analysis = analyze_with_gpt("text", text)
    report_path, case_id, timestamp = generate_report("Text Content", analysis)

    return {
        "case_id": case_id,
        "timestamp": timestamp,
        "analysis": analysis,
        "report_url": f"/download/{os.path.basename(report_path)}"
    }

@app.post("/analyze/link")
async def analyze_link(url: str = Form(...)):
    analysis = analyze_with_gpt("web link", url)
    report_path, case_id, timestamp = generate_report("Web Link", analysis)

    return {
        "case_id": case_id,
        "timestamp": timestamp,
        "analysis": analysis,
        "report_url": f"/download/{os.path.basename(report_path)}"
    }

@app.post("/analyze/batch")
async def analyze_batch(files: list[UploadFile] = File(...)):
    results = []

    for file in files:
        file_id = str(uuid.uuid4())
        file_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")

        with open(file_path, "wb") as f:
            f.write(await file.read())

        file_hash = sha256_of_file(file_path)
        analysis = analyze_with_gpt("media file", file.filename)
        report_path, case_id, timestamp = generate_report(file.filename, analysis, file_hash)

        results.append({
            "filename": file.filename,
            "case_id": case_id,
            "timestamp": timestamp,
            "file_hash": file_hash,
            "analysis": analysis,
            "report_url": f"/download/{os.path.basename(report_path)}"
        })

    return {"batch_results": results}

@app.get("/download/{report_name}")
def download_report(report_name: str):
    return FileResponse(
        path=os.path.join(REPORT_DIR, report_name),
        filename=report_name,
        media_type="application/pdf"
    )
