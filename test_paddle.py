from paddleocr import PaddleOCR
import sys

try:
    print("Attempting to initialize PaddleOCR...")
    ocr = PaddleOCR(use_textline_orientation=True, lang='en')
    print("PaddleOCR initialized successfully!")
except Exception as e:
    print(f"Failed to initialize PaddleOCR: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
