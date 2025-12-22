"""
Expense Categorization Agent
Classifies expense type and provides reasoning.
"""

from typing import Dict, Any
from .base_agent import BaseAgent


class ExpenseCategorizationAgent(BaseAgent):
    """Agent responsible for categorizing expenses and explaining the classification."""

    def __init__(self):
        super().__init__("Expense Categorization Agent")

    def get_prompt_template(self) -> str:
        return """
You are an expert financial analyst specializing in expense categorization.

Given the following expense information, classify it into appropriate categories.

Expense Data:
Vendor: {vendor}
Amount: ${amount}
Items: {items}
Description: {description}

Available categories:
- Food & Dining (restaurants, groceries, coffee shops)
- Transportation (gas, parking, public transit, rideshare)
- Office Supplies (stationery, equipment)
- Travel (hotels, flights, car rentals)
- Utilities (internet, phone, electricity)
- Entertainment (movies, events, subscriptions)
- Healthcare (medical, pharmacy, insurance)
- Miscellaneous (anything that doesn't fit above)

Please return a JSON object with:
- category: The main category
- subcategory: More specific classification if applicable
- confidence: Your confidence score (0-1)
- reasoning: Brief explanation of why this category was chosen

Return only the JSON object.
"""

    def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Categorize the expense and provide reasoning.

        Args:
            input_data: Dict containing vendor, amount, items, etc.

        Returns:
            Dict with category and explanation
        """
        vendor = input_data.get('vendor', 'Unknown')
        amount = input_data.get('amount', 0)
        items = input_data.get('items', [])
        description = input_data.get('description', '')

        prompt = self.get_prompt_template().format(
            vendor=vendor,
            amount=amount,
            items=', '.join(items) if items else 'Not specified',
            description=description
        )

        response = self.call_ernie(prompt)
        parsed_data = self.parse_json_response(response)

        return {
            "agent": self.name,
            "category": parsed_data.get('category', 'Miscellaneous'),
            "subcategory": parsed_data.get('subcategory', ''),
            "confidence": parsed_data.get('confidence', 0.5),
            "reasoning": parsed_data.get('reasoning', 'Category classification completed')
        }