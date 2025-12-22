"""
Document Understanding Agent
Parses OCR output into structured expense fields.
"""

from typing import Dict, Any
from .base_agent import BaseAgent


class DocumentUnderstandingAgent(BaseAgent):
    """Agent responsible for parsing OCR text into structured expense data."""

    def __init__(self):
        super().__init__("Document Understanding Agent")

    def get_prompt_template(self) -> str:
        return """
You are an expert document analyzer for expense receipts and invoices.

Given the following OCR text from a receipt or invoice, extract the key information into a structured JSON format.

OCR Text:
{ocr_text}

Please return a JSON object with the following fields:
- vendor: The business name/vendor
- amount: The total amount (as a number)
- date: The transaction date (YYYY-MM-DD format if available)
- items: Array of purchased items (if discernible)
- confidence: Your confidence score (0-1) in the extraction accuracy

Be precise and only extract information that is clearly present in the text.
If a field is not found, use null or empty array as appropriate.

Return only the JSON object, no additional text.
"""

    def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process OCR text to extract structured expense data.

        Args:
            input_data: Dict containing 'ocr_text'

        Returns:
            Dict with extracted fields and explanation
        """
        ocr_text = input_data.get('ocr_text', '')

        prompt = self.get_prompt_template().format(ocr_text=ocr_text)
        response = self.call_ernie(prompt)

        parsed_data = self.parse_json_response(response)

        return {
            "agent": self.name,
            "extracted_data": parsed_data,
            "explanation": f"Extracted key expense information from OCR text with {parsed_data.get('confidence', 0)*100:.1f}% confidence"
        }