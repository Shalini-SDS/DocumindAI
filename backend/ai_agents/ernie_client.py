"""
ERNIE 4.5 Client for DocMind AI
Handles API calls to Baidu ERNIE 4.5 model.
"""

import requests
import json
from typing import Dict, Any


class ErnieClient:
    """Client for interacting with Baidu ERNIE 4.5 API."""

    def __init__(self, api_key: str, secret_key: str):
        """
        Initialize ERNIE client.

        Args:
            api_key: Baidu API key
            secret_key: Baidu secret key
        """
        self.api_key = api_key
        self.secret_key = secret_key
        self.access_token = None
        self._get_access_token()

    def _get_access_token(self):
        """Get access token from Baidu."""
        url = "https://aip.baidubce.com/oauth/2.0/token"
        params = {
            "grant_type": "client_credentials",
            "client_id": self.api_key,
            "client_secret": self.secret_key
        }

        response = requests.post(url, params=params)
        if response.status_code == 200:
            self.access_token = response.json().get("access_token")
        else:
            raise Exception(f"Failed to get access token: {response.text}")

    def generate_response(self, prompt: str, max_tokens: int = 1000) -> str:
        """
        Generate response from ERNIE 4.5.

        Args:
            prompt: Input prompt
            max_tokens: Maximum tokens to generate

        Returns:
            Generated text response
        """
        url = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-4.5-8k"

        headers = {
            "Content-Type": "application/json"
        }

        payload = {
            "access_token": self.access_token,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "max_tokens": max_tokens
        }

        response = requests.post(url, headers=headers, data=json.dumps(payload))

        if response.status_code == 200:
            result = response.json()
            return result.get("result", "")
        else:
            raise Exception(f"ERNIE API error: {response.text}")


# For demo purposes, create a mock client
class MockErnieClient:
    """Mock client for demonstration purposes."""

    def generate_response(self, prompt: str, max_tokens: int = 1000) -> str:
        """Mock response generation."""
        # Simple mock responses based on prompt content
        prompt_lower = prompt.lower()
        if "document understanding" in prompt_lower or "extract the key information" in prompt_lower:
            return """{
                "vendor": "Starbucks Coffee",
                "amount": 8.50,
                "date": "2025-12-22",
                "items": ["Grande Coffee", "Blueberry Muffin", "Tax"],
                "confidence": 0.95
            }"""
        elif "expense categorization" in prompt_lower:
            return """{
                "category": "Food & Dining",
                "subcategory": "Coffee Shops",
                "confidence": 0.88,
                "reasoning": "Receipt shows coffee and pastry purchases from Starbucks"
            }"""
        elif "fraud" in prompt_lower:
            return """{
                "is_fraudulent": false,
                "risk_level": "Low",
                "confidence": 0.92,
                "reasoning": "Transaction amount and vendor are consistent with user's history",
                "recommendations": ["No action required"]
            }"""
        elif "audit summary" in prompt_lower:
            return """{
                "status": "Approved",
                "summary": "Business expense for coffee and pastry at Starbucks. Amount within normal range for this category.",
                "recommendations": ["No action required"],
                "overall_confidence": 0.91,
                "key_findings": ["Reasonable amount for coffee shop purchase", "Vendor matches historical pattern"]
            }"""
        else:
            return "Mock response: Analysis complete."


# Use mock client for demo
ernie_client = MockErnieClient()