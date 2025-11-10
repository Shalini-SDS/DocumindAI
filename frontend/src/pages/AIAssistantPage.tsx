import './AIAssistantPage.css'
import { FiUpload, FiFileText, FiTrendingUp, FiAlertTriangle, FiCheckCircle, FiMessageSquare } from 'react-icons/fi'

type Props = {
  role?: 'Admin' | 'Auditor' | 'Employee' | string
}

export default function AIAssistantPage({ role = 'User' }: Props) {
  return (
    <div className="ai-assistant-layout">
      <main className="ai-main" role="main">
        <div className="chat-panel">
          <header className="chat-header">
            <div className="title">
              <div className="avatar" />
              <div>
                <div className="name">Smart Auditor AI</div>
                <div className="subtitle">Always online and ready to help</div>
              </div>
            </div>
            <div className="status-badge">{role} • Online</div>
          </header>

          <div className="messages">
            <div className="message bot">
              <p>
                Hello! I'm Smart Auditor AI, your intelligent expense assistant. I can help you with:
              </p>
              <ul>
                <li>Analyzing expense patterns and trends</li>
                <li>Explaining flagged transactions</li>
                <li>Providing insights on spending optimization</li>
                <li>Answering questions about your financial data</li>
                <li>Recommending cost-saving opportunities</li>
              </ul>
              <small className="time">07:23 PM</small>
            </div>
          </div>

          <div className="input-bar">
            <input aria-label="Ask the assistant" placeholder="Ask me anything about your expenses..." />
            <button aria-label="send" className="send-btn" onClick={() => console.log('Send message clicked')}>➤</button>
          </div>
        </div>

        <aside className="right-side">
          <section className="card upload-receipt-section">
            <h4><FiUpload className="card-icon" /> Quick Upload</h4>
            <div className="upload-area">
              <div className="upload-placeholder">
                <FiFileText className="upload-icon" />
                <p>Drop receipt here or click to browse</p>
                <small>Supported: PDF, JPG, PNG (max 10MB)</small>
              </div>
              <button className="upload-btn" onClick={() => console.log('Upload Receipt clicked from AI page')}>
                <FiUpload /> Upload Receipt
              </button>
            </div>
          </section>

          <section className="card suggested-questions interactive">
            <h4><FiMessageSquare className="card-icon" /> Suggested Questions</h4>
            <ul>
              <li onClick={() => console.log('Question clicked: Global Airlines')}>
                <FiAlertTriangle className="question-icon flagged" />
                Why was the Global Airlines transaction flagged?
              </li>
              <li onClick={() => console.log('Question clicked: Top categories')}>
                <FiTrendingUp className="question-icon" />
                What are my top spending categories?
              </li>
              <li onClick={() => console.log('Question clicked: Integrity score')}>
                <FiCheckCircle className="question-icon" />
                How can I improve my expense integrity score?
              </li>
              <li onClick={() => console.log('Question clicked: Anomalies')}>
                <FiAlertTriangle className="question-icon flagged" />
                Explain the recent anomalies detected
              </li>
              <li onClick={() => console.log('Question clicked: Cost savings')}>
                <FiTrendingUp className="question-icon" />
                What cost-saving opportunities are available?
              </li>
            </ul>
          </section>

          <section className="card ai-capabilities interactive">
            <h4>AI Capabilities</h4>
            <ul>
              <li onClick={() => console.log('Capability clicked: Trend Analysis')}>
                <FiTrendingUp className="capability-icon" />
                Trend Analysis — Identify spending patterns
              </li>
              <li onClick={() => console.log('Capability clicked: Anomaly Detection')}>
                <FiAlertTriangle className="capability-icon flagged" />
                Anomaly Detection — Explain flagged transactions
              </li>
              <li onClick={() => console.log('Capability clicked: Report Generation')}>
                <FiFileText className="capability-icon" />
                Report Generation — Custom insights on demand
              </li>
              <li onClick={() => console.log('Capability clicked: Recommendations')}>
                <FiCheckCircle className="capability-icon" />
                Smart Recommendations — Cost‑saving opportunities
              </li>
            </ul>
          </section>

          <section className="card quick-stats interactive">
            <h4>Quick Stats</h4>
            <div className="stat" onClick={() => console.log('Stat clicked: Response Time')}>
              <span>Response Time</span><strong>&lt; 2 sec</strong>
            </div>
            <div className="stat" onClick={() => console.log('Stat clicked: Accuracy Rate')}>
              <span>Accuracy Rate</span><strong>94.8%</strong>
            </div>
            <div className="stat" onClick={() => console.log('Stat clicked: Questions Answered')}>
              <span>Questions Answered</span><strong>1,247</strong>
            </div>
          </section>
        </aside>
      </main>
    </div>
  )
}
