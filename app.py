import sys
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE_DIR)
sys.path.insert(0, os.path.join(BASE_DIR, "backend"))
sys.path.insert(0, os.path.join(BASE_DIR, "backend", "pipelines"))

import streamlit as st
import tempfile
import time
from PIL import Image
import pypdfium2 as pdfium

# Import backend components
try:
    from expense_verification_pipeline import expense_pipeline
    from utils.ocr import extract_text_from_image
except ImportError as e:
    # Try alternate import path if first one fails
    try:
        from pipelines.expense_verification_pipeline import expense_pipeline
        from utils.ocr import extract_text_from_image
    except ImportError as e2:
        st.error(f"Failed to import backend components: {e2}")
        st.info("Ensure you are running streamlit from the project root and 'backend' directory exists.")
        st.stop()

# Page Config
st.set_page_config(
    page_title="DocMind AI - Expense Auditor",
    page_icon="🚀",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Styling
st.markdown("""
<style>
    .main {
        background-color: #f8f9fa;
    }
    .stMetric {
        background-color: #ffffff;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .status-approved { color: #28a745; font-weight: bold; }
    .status-pending { color: #ffc107; font-weight: bold; }
    .status-rejected { color: #dc3545; font-weight: bold; }
</style>
""", unsafe_allow_html=True)

# Sidebar
with st.sidebar:
    st.title("🤖 DocMind AI")
    st.image("https://img.icons8.com/fluency/96/artificial-intelligence.png", width=80)
    st.markdown("---")
    st.header("System Status")
    
    pipeline_status = expense_pipeline.get_pipeline_status()
    st.success(f"Pipeline: {pipeline_status['status']}")
    
    st.markdown("**Active AI Agents:**")
    for agent in pipeline_status['agents']:
        st.write(f"✅ {agent}")
    
    st.markdown("---")
    st.info("DocMind AI uses ERNIE 4.5 to process and verify business expenses automatically.")

# Main UI
st.title("🚀 Expense Auditor Dashboard")
st.subheader("Multi-Agent Receipt Analysis & Verification")

uploaded_file = st.file_uploader("Upload Receipt or Invoice", type=["jpg", "jpeg", "png", "pdf"])

if uploaded_file:
    # Progress and layout
    progress_bar = st.progress(0)
    status_text = st.empty()
    
    # Save uploaded file to a temporary location
    suffix = os.path.splitext(uploaded_file.name)[1]
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        tmp.write(uploaded_file.getvalue())
        tmp_path = tmp.name

    try:
        col1, col2 = st.columns([1, 1.5])
        
        with col1:
            st.subheader("📄 Document Preview")
            if uploaded_file.type == "application/pdf":
                status_text.text("Rendering PDF...")
                pdf = pdfium.PdfDocument(tmp_path)
                page = pdf[0]
                bitmap = page.render(scale=2)
                img = bitmap.to_pil()
                st.image(img, use_container_width=True, caption=f"First page of {uploaded_file.name}")
                
                # Save first page as image for OCR
                ocr_source = tmp_path + ".png"
                img.save(ocr_source)
            else:
                st.image(uploaded_file, use_container_width=True, caption=uploaded_file.name)
                ocr_source = tmp_path

        with col2:
            st.subheader("📊 Analysis Results")
            
            # Step 1: OCR
            status_text.text("Step 1/3: Extracting text using PaddleOCR...")
            progress_bar.progress(33)
            ocr_start = time.time()
            ocr_text = extract_text_from_image(ocr_source)
            ocr_end = time.time()
            
            # Step 2: AI Pipeline
            status_text.text("Step 2/3: Running Multi-Agent AI Pipeline...")
            progress_bar.progress(66)
            
            # Mock historical data for context (in production this would come from DB)
            historical_expenses = [
                {"vendor": "Starbucks", "amount": 12.50, "category": "Food"},
                {"vendor": "Office Depot", "amount": 45.00, "category": "Office Supplies"},
                {"vendor": "Uber", "amount": 25.00, "category": "Transportation"},
                {"vendor": "Starbucks", "amount": 8.50, "category": "Food"}
            ]
            
            pipeline_result = expense_pipeline.process_expense(ocr_text, historical_expenses)
            progress_bar.progress(100)
            status_text.text("Analysis Complete!")
            time.sleep(0.5)
            status_text.empty()
            progress_bar.empty()

            # Display Results
            summary = pipeline_result["audit_summary"]
            
            # Key Metrics
            m1, m2, m3 = st.columns(3)
            with m1:
                status_val = summary["status"]
                st.metric("Audit Status", status_val)
            with m2:
                st.metric("Confidence", f"{summary['overall_confidence']*100:.0f}%")
            with m3:
                risk = pipeline_result["fraud_analysis"]["risk_level"]
                st.metric("Risk Level", risk)

            # Detailed Tabs
            tab1, tab2, tab3, tab4 = st.tabs(["📋 Summary", "🔍 Extraction", "⚠️ Fraud & Anomaly", "📝 Raw OCR"])
            
            with tab1:
                st.markdown(f"### Verdict: {summary['status']}")
                st.write(summary["summary"])
                
                if summary["recommendations"]:
                    st.markdown("#### Recommendations")
                    for rec in summary["recommendations"]:
                        st.write(f"- {rec}")
                
                if "key_findings" in summary:
                    st.markdown("#### Key Findings")
                    for finding in summary["key_findings"]:
                        st.write(f"• {finding}")

            with tab2:
                exp = pipeline_result["expense_data"]
                cat = pipeline_result["categorization"]
                
                c1, c2 = st.columns(2)
                with c1:
                    st.write(f"**Vendor:** {exp.get('vendor', 'Unknown')}")
                    st.write(f"**Amount:** ${exp.get('amount', 0):.2f}")
                    st.write(f"**Date:** {exp.get('date', 'Unknown')}")
                with c2:
                    st.write(f"**Category:** {cat['category']}")
                    st.write(f"**Subcategory:** {cat['subcategory']}")
                    st.write(f"**Cat. Reasoning:** {cat['reasoning']}")
                
                st.markdown("**Line Items Detected:**")
                items = exp.get("items", [])
                if items:
                    st.write(", ".join(items))
                else:
                    st.info("No specific line items identified.")

            with tab3:
                fraud = pipeline_result["fraud_analysis"]
                anomaly = pipeline_result["anomaly_score"]
                
                st.markdown("#### Fraud Analysis")
                st.write(f"**Risk Level:** {fraud['risk_level']}")
                st.write(f"**Reasoning:** {fraud['reasoning']}")
                
                st.divider()
                
                st.markdown("#### Statistical Anomaly Detection")
                st.write(f"**Anomaly Score:** `{anomaly:.4f}`")
                if anomaly > 0:
                    st.success("Analysis: This expense matches normal spending patterns.")
                else:
                    st.warning("Analysis: This expense deviates from historical patterns.")
                
                st.info("Score > 0 indicates normal behavior; Score < 0 indicates a potential anomaly.")

            with tab4:
                st.caption(f"Extraction took {ocr_end - ocr_start:.2f} seconds")
                st.text_area("OCR Result", ocr_text, height=300)

    except Exception as e:
        st.error(f"Error processing document: {str(e)}")
        st.exception(e)
    finally:
        # Cleanup temporary files
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
        if 'ocr_source' in locals() and ocr_source != tmp_path and os.path.exists(ocr_source):
            os.remove(ocr_source)

else:
    # Welcome Screen
    st.info("Please upload a receipt image or PDF to start the audit process.")
    
    col1, col2, col3 = st.columns(3)
    with col1:
        st.markdown("#### 📤 Upload")
        st.write("Drag and drop your receipt or invoice here.")
    with col2:
        st.markdown("#### 🤖 Process")
        st.write("Our multi-agent system extracts and categorizes data.")
    with col3:
        st.markdown("#### ✅ Verify")
        st.write("Get instant fraud risk assessment and audit status.")

    st.markdown("---")
    st.subheader("Example Document")
    st.write("You can find sample documents in the `backend/uploads` directory.")
