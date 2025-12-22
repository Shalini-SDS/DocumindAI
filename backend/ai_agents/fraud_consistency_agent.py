"""
Fraud & Consistency Agent
Validates transactions using semantic reasoning and historical data.
"""

from typing import Dict, Any, List
from .base_agent import BaseAgent


class FraudConsistencyAgent(BaseAgent):
    """Agent responsible for fraud detection and consistency validation."""

    def __init__(self):
        super().__init__("Fraud & Consistency Agent")

    def get_prompt_template(self) -> str:
        return """
You are a fraud detection expert analyzing business expense transactions.

Current Transaction:
Vendor: {vendor}
Amount: ${amount}
Category: {category}
Date: {date}

Historical Transactions (last 10):
{history}

Company Policies:
- Meals must be reasonable (< $50 per person)
- Office supplies should match business needs
- Travel expenses require pre-approval
- Personal expenses are not reimbursable

Analyze for:
1. Fraud indicators (unusual amounts, suspicious vendors, frequency anomalies)
2. Policy compliance
3. Consistency with user's spending patterns

Return JSON with:
- is_fraudulent: boolean
- risk_level: "Low", "Medium", "High"
- confidence: 0-1 score
- reasoning: Detailed explanation of analysis
- recommendations: Any suggested actions

Return only the JSON object.
"""

    def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze transaction for fraud and consistency.

        Args:
            input_data: Dict containing transaction data and history

        Returns:
            Dict with fraud analysis results
        """
        vendor = input_data.get('vendor', 'Unknown')
        amount = input_data.get('amount', 0)
        category = input_data.get('category', 'Miscellaneous')
        date = input_data.get('date', 'Unknown')
        history = input_data.get('history', [])

        # Format history for prompt
        history_text = "\n".join([
            f"- {h.get('vendor', 'Unknown')}: ${h.get('amount', 0)} ({h.get('category', 'Misc')})"
            for h in history[:10]  # Limit to last 10
        ]) if history else "No historical data available"

        prompt = self.get_prompt_template().format(
            vendor=vendor,
            amount=amount,
            category=category,
            date=date,
            history=history_text
        )

        response = self.call_ernie(prompt)
        parsed_data = self.parse_json_response(response)

        return {
            "agent": self.name,
            "is_fraudulent": parsed_data.get('is_fraudulent', False),
            "risk_level": parsed_data.get('risk_level', 'Medium'),
            "confidence": parsed_data.get('confidence', 0.5),
            "reasoning": parsed_data.get('reasoning', 'Fraud analysis completed'),
            "recommendations": parsed_data.get('recommendations', [])
        }