import sys
import os

# Add backend to path to import utils
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from utils.ocr import extract_text_from_image

image_path = r'backend\uploads\logos\1f778ff1-d4f0-468c-b5ff-3ac258871349_receipt.jpg'

if not os.path.exists(image_path):
    print(f"Image not found at {image_path}")
    # Try alternate path
    image_path = os.path.join('backend', 'uploads', 'logos', '1f778ff1-d4f0-468c-b5ff-3ac258871349_receipt.jpg')

print(f"Testing OCR on: {image_path}")
try:
    text = extract_text_from_image(image_path)
    print("OCR Result:")
    print(text)
except Exception as e:
    print(f"OCR failed with error: {e}")
    import traceback
    traceback.print_exc()
