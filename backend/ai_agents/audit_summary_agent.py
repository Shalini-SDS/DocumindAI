"""
Audit Summary Agent
Generates human-readable audit explanations and final recommendations.
"""

from typing import Dict, Any
from .base_agent import BaseAgent


class AuditSummaryAgent(BaseAgent):
    """Agent responsible for generating comprehensive audit summaries."""

    def __init__(self):
        super().__init__("Audit Summary Agent")

    def get_prompt_template(self) -> str:
        return """
You are an audit specialist creating clear, professional expense audit reports.

Transaction Details:
- Vendor: {vendor}
- Amount: ${amount}
- Category: {category}
- Date: {date}
- Extracted Items: {items}

Analysis Results:
- Document Understanding: {doc_confidence}% confidence
- Categorization: {cat_reasoning}
- Fraud Risk: {fraud_risk} ({fraud_confidence}% confidence)
- Anomaly Score: {anomaly_score}

Based on all analysis, create a comprehensive audit summary.

Return JSON with:
- status: "Approved", "Rejected", "Needs Review"
- summary: 2-3 sentence explanation
- recommendations: Array of specific actions
- overall_confidence: 0-1 score
- key_findings: Array of important observations

Return only the JSON object.
"""

    def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate comprehensive audit summary.

        Args:
            input_data: Dict containing all analysis results

        Returns:
            Dict with final audit summary
        """
        # Extract data from input
        vendor = input_data.get('vendor', 'Unknown')
        amount = input_data.get('amount', 0)
        category = input_data.get('category', 'Miscellaneous')
        date = input_data.get('date', 'Unknown')
        items = input_data.get('items', [])

        doc_confidence = int(input_data.get('doc_confidence', 0) * 100)
        cat_reasoning = input_data.get('cat_reasoning', 'Standard categorization')
        fraud_risk = input_data.get('fraud_risk', 'Low')
        fraud_confidence = int(input_data.get('fraud_confidence', 0) * 100)
        anomaly_score = input_data.get('anomaly_score', 0)

        prompt = self.get_prompt_template().format(
            vendor=vendor,
            amount=amount,
            category=category,
            date=date,
            items=', '.join(items) if items else 'None specified',
            doc_confidence=doc_confidence,
            cat_reasoning=cat_reasoning,
            fraud_risk=fraud_risk,
            fraud_confidence=fraud_confidence,
            anomaly_score=f"{anomaly_score:.2f}"
        )

        response = self.call_ernie(prompt)
        parsed_data = self.parse_json_response(response)

        return {
            "agent": self.name,
            "status": parsed_data.get('status', 'Needs Review'),
            "summary": parsed_data.get('summary', 'Audit completed'),
            "recommendations": parsed_data.get('recommendations', []),
            "overall_confidence": parsed_data.get('overall_confidence', 0.5),
            "key_findings": parsed_data.get('key_findings', [])
        }