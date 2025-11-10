import './SettingsPage.css'
import { FiMessageSquare, FiUpload, FiSettings as SettingsIcon, FiUser, FiMail } from 'react-icons/fi'

type Props = { role?: string }

export default function SettingsPage({ role = 'User' }: Props) {
  return (
    <div className="settings-layout">
      <div className="settings-container">
        <header className="settings-header">
          <h2><SettingsIcon className="header-icon" /> Settings</h2>
          <div className="role-tag">{role}</div>
        </header>

        <section className="card profile-settings">
          <h3><FiUser className="section-icon" /> Profile</h3>
          <div className="setting-item">
            <label>Display Name</label>
            <input defaultValue={role === 'Admin' ? 'Admin User' : `${role} User`} />
          </div>
          <div className="setting-item">
            <label><FiMail className="label-icon" /> Email</label>
            <input defaultValue={role === 'Admin' ? 'admin@example.com' : `${role.toLowerCase()}@example.com`} />
          </div>
        </section>

        <section className="card ai-settings attractive">
          <h3><FiMessageSquare className="section-icon" /> AI Assistant Settings</h3>
          <div className="setting-item toggle-item">
            <div className="toggle-container">
              <input type="checkbox" id="ai-enable" defaultChecked />
              <label htmlFor="ai-enable" className="toggle-label">
                <span className="toggle-slider"></span>
              </label>
            </div>
            <span className="toggle-text">Enable Smart Auditor AI</span>
          </div>
          <div className="setting-item">
            <label><FiMessageSquare className="label-icon" /> Response Tone</label>
            <select defaultValue="professional">
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="casual">Casual</option>
            </select>
          </div>
          <div className="setting-item">
            <label>AI Accuracy Threshold</label>
            <div className="slider-container">
              <input type="range" min="80" max="100" defaultValue="95" className="accuracy-slider" />
              <span className="slider-value">95%</span>
            </div>
          </div>
        </section>

        <section className="card app-settings">
          <h3><SettingsIcon className="section-icon" /> App Preferences</h3>
          <div className="setting-item">
            <label>Theme</label>
            <select defaultValue="dark">
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </section>

        <section className="card upload-section">
          <h3><FiUpload className="section-icon" /> Quick Actions</h3>
          <div className="upload-buttons">
            <button className="upload-btn primary" onClick={() => console.log('Upload Receipt clicked')}>
              <FiUpload /> Upload Receipt
            </button>
            <button className="upload-btn secondary" onClick={() => console.log('Analyze Expenses clicked')}>
              <SettingsIcon /> Analyze Expenses
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
