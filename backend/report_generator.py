from fpdf import FPDF
import uuid

def generate_report(filename, analysis):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    pdf.cell(0, 10, "NEXORA – Deepfake Analysis Report", ln=True)
    pdf.ln(10)

    pdf.cell(0, 10, f"File: {filename}", ln=True)
    pdf.cell(0, 10, f"Label: {analysis['label']}", ln=True)
    pdf.cell(0, 10, f"Probability: {analysis['probability']}", ln=True)
    pdf.cell(0, 10, f"Confidence: {analysis['confidence']}", ln=True)

    pdf.ln(10)
    pdf.multi_cell(0, 8, "Explanation:")
    pdf.multi_cell(0, 8, analysis["explanation"])

    name = f"report_{uuid.uuid4()}.pdf"
    path = f"reports/{name}"

    pdf.output(path)
    return path
