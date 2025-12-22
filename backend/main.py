"""
DocMind AI - Multi-Agent Expense Verification Demo
Demonstrates the ERNIE 4.5 powered multi-agent system.
"""

import json
from pipelines.expense_verification_pipeline import expense_pipeline


def demo_expense_verification():
    """Demonstrate the complete expense verification pipeline."""

    # Sample OCR text from PaddleOCR-VL
    sample_ocr_text = """
    STARBUCKS COFFEE
    123 Main Street
    Transaction #12345
    Date: Dec 22, 2025

    Items:
    - Grande Coffee  $4.50
    - Blueberry Muffin  $3.25
    - Tax  $0.75

    Total: $8.50
    Thank you for your business!
    """

    # Sample historical expenses for context
    historical_expenses = [
        {"vendor": "Starbucks", "amount": 12.50, "category": "Food & Dining"},
        {"vendor": "Office Depot", "amount": 45.00, "category": "Office Supplies"},
        {"vendor": "Uber", "amount": 25.00, "category": "Transportation"},
        {"vendor": "Starbucks", "amount": 6.75, "category": "Food & Dining"},
        {"vendor": "Amazon", "amount": 89.99, "category": "Office Supplies"}
    ]

    print("🚀 DocMind AI - Multi-Agent Expense Verification Demo")
    print("=" * 60)

    print(f"📄 Processing OCR Text:\n{sample_ocr_text.strip()}")
    print("\n" + "=" * 60)

    # Process through the pipeline
    result = expense_pipeline.process_expense(sample_ocr_text, historical_expenses)

    # Display results
    print("📊 ANALYSIS RESULTS:")
    print("=" * 60)

    # Expense Data
    expense = result["expense_data"]
    print(f"🏪 Vendor: {expense.get('vendor', 'Unknown')}")
    print(f"💰 Amount: ${expense.get('amount', 0):.2f}")
    print(f"📅 Date: {expense.get('date', 'Unknown')}")
    print(f"📝 Items: {', '.join(expense.get('items', []))}")
    print(f"🎯 Extraction Confidence: {expense.get('confidence', 0)*100:.1f}%")

    print("\n" + "-" * 40)

    # Categorization
    cat = result["categorization"]
    print(f"📂 Category: {cat['category']}")
    print(f"📋 Subcategory: {cat['subcategory']}")
    print(f"🧠 Reasoning: {cat['reasoning']}")

    print("\n" + "-" * 40)

    # Fraud Analysis
    fraud = result["fraud_analysis"]
    print(f"🔍 Fraud Risk: {fraud['risk_level']}")
    print(f"⚠️  Fraudulent: {'Yes' if fraud['is_fraudulent'] else 'No'}")
    print(f"💡 Analysis: {fraud['reasoning']}")

    print("\n" + "-" * 40)

    # Anomaly Score
    anomaly = result["anomaly_score"]
    print(f"📈 Anomaly Score: {anomaly:.3f}")
    print(f"📊 Status: {'Normal' if anomaly > 0 else 'Anomalous'}")

    print("\n" + "-" * 40)

    # Final Audit Summary
    summary = result["audit_summary"]
    print(f"📋 Final Status: {summary['status']}")
    print(f"📝 Summary: {summary['summary']}")
    print(f"⭐ Overall Confidence: {summary['overall_confidence']*100:.1f}%")

    if summary['recommendations']:
        print(f"💡 Recommendations: {', '.join(summary['recommendations'])}")

    print("\n" + "=" * 60)
    print("✅ Demo completed successfully!")
    print("🎯 Multi-agent AI system with ERNIE 4.5 is ready for production use.")


def demo_pipeline_status():
    """Show pipeline component status."""
    status = expense_pipeline.get_pipeline_status()
    print("\n🔧 Pipeline Status:")
    print(f"🤖 Agents: {', '.join(status['agents'])}")
    print(f"🛠️  Services: {', '.join(status['services'])}")
    print(f"📊 Status: {status['status']}")


if __name__ == "__main__":
    demo_expense_verification()
    demo_pipeline_status()