📄 DocMind AI

AI-Powered Expense Verification & Fraud Detection Platform

🚀 Overview

DocMind AI is an intelligent expense monitoring and auditing system designed for NGOs and small organizations. It automates expense verification using PaddleOCR-VL for document understanding and ERNIE 4.5 for semantic reasoning within a multi-agent architecture.
The system detects anomalies, prevents duplicate or fraudulent claims, and provides explainable audit insights through an interactive dashboard.

💡 Problem Statement

Manual expense tracking using paper receipts and spreadsheets leads to:

Human errors and data inconsistency

Duplicate or fraudulent expense claims

Delayed audits and poor transparency

Reduced trust from donors and stakeholders

DocMind AI addresses these issues through AI-driven automation and explainable intelligence.

✨ Key Features

📷 Multimodal OCR with PaddleOCR-VL
Extracts text, layout, and key fields from receipts and invoices.

🧠 ERNIE 4.5 Multi-Agent Reasoning System
Specialized agents collaboratively:

Parse financial documents

Categorize expenses

Validate consistency

Generate audit explanations

🚨 Fraud & Anomaly Detection
Uses Isolation Forest to identify abnormal spending patterns.

📊 Explainable Audit Dashboard
Displays flagged transactions with reasoning and confidence scores.

🔍 Duplicate & Semantic Matching
Detects duplicate claims even with vendor name or format variations.

🏗 System Architecture
Receipt / Invoice
        ↓
PaddleOCR-VL (Text + Layout Extraction)
        ↓
ERNIE 4.5 Multi-Agent System (CAMEL-AI)
   ├── Document Understanding Agent
   ├── Expense Categorization Agent
   ├── Fraud & Consistency Agent
   └── Audit Summary Agent
        ↓
Isolation Forest (Anomaly Scoring)
        ↓
Explainable Audit Dashboard

🧠 Multi-Agent Design (ERNIE 4.5)
Agent	Responsibility
Document Understanding Agent	Extracts structured fields from OCR output
Expense Categorization Agent	Classifies expense type with reasoning
Fraud & Consistency Agent	Detects duplicates and inconsistencies
Audit Summary Agent	Generates human-readable audit explanations

Each agent is powered by ERNIE 4.5 and follows a single-responsibility design for clarity and explainability.

🛠 Tech Stack
OCR & Vision

PaddleOCR-VL

LLM & Agents

ERNIE 4.5 / ERNIE 5

CAMEL-AI (Multi-Agent Framework)

Backend

Python (Flask / FastAPI)

AI & ML

Scikit-learn (Isolation Forest)

Pandas, NumPy

Database

MongoDB / MySQL

Visualization

Web Dashboard

Matplotlib / Power BI (optional)

▶ How It Works

User uploads a receipt or invoice

PaddleOCR-VL extracts text and layout information

ERNIE-powered agents analyze and verify the transaction

Isolation Forest detects anomalies

System outputs an explainable audit decision

🔮 Future Enhancements

Fine-tuning PaddleOCR-VL for handwritten and multilingual receipts

Domain-specific fine-tuning of ERNIE for audit and compliance tasks

Automated audit report generation

Real-time fraud alerts

Edge and offline deployment for low-connectivity regions

Role-based access control for auditors, admins, and donors

🌍 Use Cases

NGOs and charitable organizations

Small and medium enterprises

Grant-funded projects

Educational and healthcare institutions

🏆 Hackathon Alignment

✅ Best PaddleOCR-VL Fine-Tune

✅ Best ERNIE Multimodal Application

✅ Best Agent System (CAMEL-AI)

📎 Links

🔗 GitHub Repository: https://github.com/your-username/docmind-ai

🎥 Demo Video: https://youtube.com/your-demo-link

🌐 Live Demo: https://your-demo-url.com

📜 License

This project is released for educational and hackathon purposes.

💬 One-line Summary for Judges

DocMind AI combines PaddleOCR-VL and ERNIE 4.5 in a multi-agent system to deliver explainable, real-time expense auditing and fraud detection.
