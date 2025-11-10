import os
from pathlib import Path

import cv2
import pytesseract


def _configure_tesseract():
    cmd = os.environ.get('TESSERACT_CMD')
    if cmd:
        path = Path(cmd)
        if path.exists():
            pytesseract.pytesseract.tesseract_cmd = str(path)
            return
    for candidate in (
        Path(r"C:\Program Files\Tesseract-OCR\tesseract.exe"),
        Path("/usr/bin/tesseract"),
        Path("/usr/local/bin/tesseract"),
    ):
        if candidate.exists():
            pytesseract.pytesseract.tesseract_cmd = str(candidate)
            return


def extract_text_from_image(image_path):
    _configure_tesseract()
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError('Unable to load image')
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.bilateralFilter(gray, 9, 75, 75)
    _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    text = pytesseract.image_to_string(thresh)
    return text.strip()
