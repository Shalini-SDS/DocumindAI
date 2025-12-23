import gradio as gr
from paddleocr import PaddleOCR

ocr = PaddleOCR(use_angle_cls=True, lang="en")

def analyze_receipt(image_path):
    result = ocr.ocr(image_path, cls=True)
    text = " ".join([word[1][0] for line in result for word in line if len(word) > 1])
    return text if text else "No text detected."

demo = gr.Interface(
    fn=analyze_receipt,
    inputs=gr.Image(type="filepath", label="Upload Receipt"),
    outputs=gr.Textbox(label="Extracted Text"),
    title="DocMindAI – Expense OCR Demo",
)

demo.launch()
