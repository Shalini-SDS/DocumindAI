"""
Expense Verification Pipeline
Orchestrates the multi-agent system for expense analysis.
"""

from typing import Dict, Any, List
from ai_agents.document_understanding_agent import DocumentUnderstandingAgent
from ai_agents.expense_categorization_agent import ExpenseCategorizationAgent
from ai_agents.fraud_consistency_agent import FraudConsistencyAgent
from ai_agents.audit_summary_agent import AuditSummaryAgent
from services.anomaly_detection import anomaly_detector


class ExpenseVerificationPipeline:
    """Main pipeline for expense verification using multi-agent AI system."""

    def __init__(self):
        self.doc_agent = DocumentUnderstandingAgent()
        self.cat_agent = ExpenseCategorizationAgent()
        self.fraud_agent = FraudConsistencyAgent()
        self.summary_agent = AuditSummaryAgent()

    def process_expense(self, ocr_text: str, historical_expenses: List[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Process an expense through the complete AI pipeline.

        Args:
            ocr_text: Raw OCR text from PaddleOCR-VL
            historical_expenses: List of previous expenses for context

        Returns:
            Complete analysis results
        """
        if historical_expenses is None:
            historical_expenses = []

        # Step 1: Document Understanding
        doc_result = self.doc_agent.process({"ocr_text": ocr_text})
        extracted_data = doc_result["extracted_data"]

        # Step 2: Expense Categorization
        cat_input = {
            "vendor": extracted_data.get("vendor"),
            "amount": extracted_data.get("amount"),
            "items": extracted_data.get("items", []),
            "description": ocr_text[:200]  # First 200 chars as description
        }
        cat_result = self.cat_agent.process(cat_input)

        # Step 3: Fraud & Consistency Analysis
        fraud_input = {
            "vendor": extracted_data.get("vendor"),
            "amount": extracted_data.get("amount"),
            "category": cat_result["category"],
            "date": extracted_data.get("date"),
            "history": historical_expenses
        }
        fraud_result = self.fraud_agent.process(fraud_input)

        # Step 4: Anomaly Detection
        current_expense = {
            "vendor": extracted_data.get("vendor"),
            "amount": extracted_data.get("amount"),
            "category": cat_result["category"]
        }
        anomaly_score = anomaly_detector.detect_anomaly(current_expense, historical_expenses)

        # Step 5: Audit Summary
        summary_input = {
            "vendor": extracted_data.get("vendor"),
            "amount": extracted_data.get("amount"),
            "category": cat_result["category"],
            "date": extracted_data.get("date"),
            "items": extracted_data.get("items", []),
            "doc_confidence": extracted_data.get("confidence", 0),
            "cat_reasoning": cat_result["reasoning"],
            "fraud_risk": fraud_result["risk_level"],
            "fraud_confidence": fraud_result["confidence"],
            "anomaly_score": anomaly_score
        }
        summary_result = self.summary_agent.process(summary_input)

        # Compile final results
        final_result = {
            "expense_data": extracted_data,
            "categorization": cat_result,
            "fraud_analysis": fraud_result,
            "anomaly_score": anomaly_score,
            "audit_summary": summary_result,
            "processing_steps": [
                doc_result,
                cat_result,
                fraud_result,
                summary_result
            ]
        }

        return final_result

    def get_pipeline_status(self) -> Dict[str, Any]:
        """Get status of all pipeline components."""
        return {
            "agents": [
                self.doc_agent.name,
                self.cat_agent.name,
                self.fraud_agent.name,
                self.summary_agent.name
            ],
            "services": ["Anomaly Detection (Isolation Forest)"],
            "status": "Ready"
        }


# Global pipeline instance
expense_pipeline = ExpenseVerificationPipeline()