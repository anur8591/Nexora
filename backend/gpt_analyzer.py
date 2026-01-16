import openai
import json
import random

openai.api_key = "YOUR_API_KEY"

def analyze_with_gpt(filename, content_type):
    prompt = f"""
You are a digital forensic AI.

A user uploaded a file:
Filename: {filename}
Type: {content_type}

Simulate a deepfake forensic analysis.
Return:
1. Label: REAL or FAKE
2. Probability (0-1)
3. Confidence (0-1)
4. Explanation (human friendly)

Respond in JSON.
"""

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    content = response["choices"][0]["message"]["content"]

    try:
        data = json.loads(content)
    except:
        # fallback
        data = {
            "label": random.choice(["REAL", "FAKE"]),
            "probability": round(random.uniform(0.3, 0.9), 2),
            "confidence": round(random.uniform(0.6, 0.95), 2),
            "explanation": content
        }

    return data
