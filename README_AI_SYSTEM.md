# DocMind AI - Multi-Agent Expense Verification System

## Overview

DocMind AI is an AI-powered expense verification system that uses ERNIE 4.5 as the core reasoning engine in a multi-agent architecture to enable comprehensive expense understanding, verification, fraud analysis, and audit explanation.

## Architecture

### Multi-Agent System with ERNIE 4.5

The system employs four specialized AI agents, each powered by Baidu's ERNIE 4.5 model:

1. **Document Understanding Agent**
   - Parses OCR output into structured expense fields
   - Extracts vendor, amount, date, items, and confidence scores

2. **Expense Categorization Agent**
   - Classifies expense type and provides reasoning
   - Supports 8 main categories with subcategories

3. **Fraud & Consistency Agent**
   - Validates transactions using semantic reasoning + history
   - Performs policy compliance checks and risk assessment

4. **Audit Summary Agent**
   - Generates human-readable audit explanations
   - Provides final recommendations and confidence scores

### End-to-End Pipeline

```
PaddleOCR-VL → ERNIE Multi-Agent Reasoning → Isolation Forest → Final Audit Result
```

## Tech Stack

- **OCR**: PaddleOCR-VL for text, layout, and bounding box extraction
- **AI Engine**: ERNIE 4.5 (Baidu) for reasoning and analysis
- **Anomaly Detection**: Scikit-learn Isolation Forest
- **Orchestration**: Custom pipeline with agent coordination
- **Backend**: Python Flask/FastAPI
- **Storage**: MongoDB/MySQL

## Installation

1. Install dependencies:
```bash
pip install -r backend/requirements.txt
```

2. Set up ERNIE 4.5 API credentials (for production):
```python
ernie_client = ErnieClient(api_key="your_key", secret_key="your_secret")
```

## Usage

### Demo
```bash
cd backend
python main.py
```

### Integration
```python
from pipelines.expense_verification_pipeline import expense_pipeline

# OCR text from PaddleOCR-VL
ocr_text = "STARBUCKS... Total: $8.50"

# Historical expenses for context
history = [
    {"vendor": "Starbucks", "amount": 12.50, "category": "Food & Dining"},
    # ... more historical data
]

# Process expense
result = expense_pipeline.process_expense(ocr_text, history)

print(f"Status: {result['audit_summary']['status']}")
print(f"Summary: {result['audit_summary']['summary']}")
```

## Agent Prompts

Each agent uses optimized prompts for ERNIE 4.5:

### Document Understanding
```
You are an expert document analyzer for expense receipts...
Given the following OCR text from a receipt, extract key information into JSON format.
```

### Expense Categorization
```
You are an expert financial analyst specializing in expense categorization...
Available categories: Food & Dining, Transportation, Office Supplies, etc.
```

### Fraud Analysis
```
You are a fraud detection expert analyzing business expense transactions...
Analyze for fraud indicators, policy compliance, and consistency with spending patterns.
```

### Audit Summary
```
You are an audit specialist creating clear, professional expense audit reports...
Create a comprehensive audit summary based on all analysis results.
```

## Explainability Features

- **Confidence Scores**: Each agent returns confidence levels (0-1)
- **Reasoning**: Detailed explanations for decisions
- **Key Findings**: Important observations from analysis
- **Recommendations**: Specific actions suggested

## Output Format

```json
{
  "expense_data": {
    "vendor": "Starbucks Coffee",
    "amount": 8.50,
    "date": "2025-12-22",
    "items": ["Grande Coffee", "Blueberry Muffin"],
    "confidence": 0.95
  },
  "categorization": {
    "category": "Food & Dining",
    "subcategory": "Coffee Shops",
    "confidence": 0.88,
    "reasoning": "Receipt shows coffee purchases"
  },
  "fraud_analysis": {
    "is_fraudulent": false,
    "risk_level": "Low",
    "confidence": 0.92,
    "reasoning": "Consistent with user history"
  },
  "anomaly_score": 0.123,
  "audit_summary": {
    "status": "Approved",
    "summary": "Business expense within normal range",
    "recommendations": ["No action required"],
    "overall_confidence": 0.91
  }
}
```

## Hackathon Best Practices

- ✅ Clean folder structure (`agents/`, `services/`, `pipelines/`)
- ✅ Clear docstrings and comments
- ✅ Easy-to-demo main.py
- ✅ Modular, single-responsibility agents
- ✅ Comprehensive error handling
- ✅ Mock clients for demonstration

## Future Enhancements

- Integration with CAMEL-AI framework for advanced orchestration
- Real ERNIE 4.5 API integration
- Enhanced anomaly detection with more features
- Multi-language support
- Real-time processing capabilities

## License

This project is part of the DocMind AI hackathon submission.