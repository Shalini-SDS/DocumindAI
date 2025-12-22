from paddleocr import PaddleOCR
import os

_ocr = None

def _get_ocr():
    global _ocr
    if _ocr is None:
        _ocr = PaddleOCR(use_textline_orientation=True, lang='en')
    return _ocr

def extract_text_from_image(image_path: str) -> str:
    """Extract text from an image file using Paddle OCR."""
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"File not found: {image_path}")

    try:
        ocr = _get_ocr()
        result = ocr.ocr(image_path)
        text_lines = []
        if result and isinstance(result[0], dict):
            # New PaddleOCR API
            rec_texts = result[0].get('rec_texts', [])
            rec_scores = result[0].get('rec_scores', [])
            for text, score in zip(rec_texts, rec_scores):
                if score > 0.5:  # Only include high confidence detections
                    text_lines.append(text)
        else:
            # Old API fallback
            for line in result:
                line_text = []
                for word_info in line:
                    text, confidence = word_info[1]
                    if confidence > 0.5:
                        line_text.append(text)
                if line_text:
                    text_lines.append(' '.join(line_text))
        text = '\n'.join(text_lines)
        return text.strip()
    except Exception as e:
        raise RuntimeError(f"OCR processing failed: {str(e)}")


