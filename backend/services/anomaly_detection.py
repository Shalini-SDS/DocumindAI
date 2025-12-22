"""
Anomaly Detection Service
Uses Isolation Forest to detect unusual expense patterns.
"""

import numpy as np
from sklearn.ensemble import IsolationForest
from typing import List, Dict, Any


class AnomalyDetectionService:
    """Service for detecting expense anomalies using machine learning."""

    def __init__(self):
        self.model = IsolationForest(
            n_estimators=100,
            contamination=0.1,  # Assume 10% of transactions are anomalies
            random_state=42
        )
        self.is_trained = False

    def train(self, historical_expenses: List[Dict[str, Any]]):
        """
        Train the anomaly detection model on historical expense data.

        Args:
            historical_expenses: List of expense dictionaries with amount, category, etc.
        """
        if not historical_expenses:
            return

        # Extract features: amount, category (encoded), vendor frequency, etc.
        features = []
        for expense in historical_expenses:
            amount = expense.get('amount', 0)
            category = hash(expense.get('category', 'misc')) % 1000  # Simple category encoding
            vendor_hash = hash(expense.get('vendor', 'unknown')) % 1000

            features.append([amount, category, vendor_hash])

        if len(features) > 10:  # Need minimum data for training
            X = np.array(features)
            self.model.fit(X)
            self.is_trained = True

    def detect_anomaly(self, expense: Dict[str, Any], historical_expenses: List[Dict[str, Any]] = None) -> float:
        """
        Detect if an expense is anomalous.

        Args:
            expense: Current expense to analyze
            historical_expenses: Historical data for context

        Returns:
            Anomaly score (negative = anomalous, positive = normal)
        """
        if not self.is_trained:
            # Retrain if we have historical data
            if historical_expenses:
                self.train(historical_expenses)

        if not self.is_trained:
            return 0.0  # Neutral score if no training data

        # Extract features from current expense
        amount = expense.get('amount', 0)
        category = hash(expense.get('category', 'misc')) % 1000
        vendor_hash = hash(expense.get('vendor', 'unknown')) % 1000

        X = np.array([[amount, category, vendor_hash]])

        # Get anomaly score (-1 = anomaly, 1 = normal)
        score = self.model.decision_function(X)[0]

        return score


# Global instance
anomaly_detector = AnomalyDetectionService()