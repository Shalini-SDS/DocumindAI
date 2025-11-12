from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image
import os

app = Flask(__name__)
CORS(app)

# Path to your local Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r"C:\Users\Y.SHARMILI\OneDrive\Desktop\New folder (2)\Tesseract-OCR\tesseract.exe"

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "✅ Transparency-AI OCR backend is running successfully!"})


@app.route("/ocr", methods=["POST"])
def ocr_extract():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    try:
        text = pytesseract.image_to_string(Image.open(filepath))
        if not text.strip():
            text = "⚠ No readable text found in image."
        return jsonify({"text": text})
    except Exception as e:
        return jsonify({"error": f"OCR failed: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
