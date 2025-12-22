"""
Base Agent class for DocMind AI multi-agent system.
"""

from abc import ABC, abstractmethod
from typing import Dict, Any
from .ernie_client import ernie_client


class BaseAgent(ABC):
    """Abstract base class for all AI agents."""

    def __init__(self, name: str):
        self.name = name

    @abstractmethod
    def get_prompt_template(self) -> str:
        """Return the prompt template for this agent."""
        pass

    @abstractmethod
    def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Process input data and return results with explanation."""
        pass

    def call_ernie(self, prompt: str) -> str:
        """Call ERNIE 4.5 with the given prompt."""
        return ernie_client.generate_response(prompt)

    def parse_json_response(self, response: str) -> Dict[str, Any]:
        """Parse JSON response from ERNIE."""
        try:
            import json
            return json.loads(response)
        except json.JSONDecodeError:
            # Fallback: return as text
            return {"response": response, "error": "Failed to parse JSON"}