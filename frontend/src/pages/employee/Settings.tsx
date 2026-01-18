import { useState, useEffect } from "react";

const tabs = [
  { key: "profile", label: "Profile" },
  { key: "ai", label: "AI Settings" },
  { key: "notifications", label: "Notifications" }
];

interface SettingsData {
  profile: {
    displayName: string;
    email: string;
  };
  ai: {
    enabled: boolean;
    responseTone: string;
    accuracyThreshold: number;
  };
  notifications: {
    email: boolean;
    push: boolean;
    expenseAlerts: boolean;
    weeklyReports: boolean;
  };
  preferences: {
    theme: string;
  };
}

const initialSettings: SettingsData = {
  profile: {
    displayName: "Employee User",
    email: "employee@example.com"
  },
  ai: {
    enabled: true,
    responseTone: "professional",
    accuracyThreshold: 85
  },
  notifications: {
    email: true,
    push: true,
    expenseAlerts: true,
    weeklyReports: true
  },
  preferences: {
    theme: "dark"
  }
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].key);
  const [settings, setSettings] = useState<SettingsData>(initialSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const API_URL = "http://127.0.0.1:5000";

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/settings/employee`);
      const data = await response.json();
      if (data.success && data.settings) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
      setMessage({ type: "error", text: "Failed to load settings" });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (section?: string) => {
    try {
      setSaving(true);
      setMessage(null);
      const response = await fetch(`${API_URL}/settings/employee`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      const data = await response.json();
      if (data.success) {
        let message = "Settings saved successfully";
        if (section === "profile") {
          message = "Profile settings saved successfully";
        } else if (section === "ai") {
          message = "AI settings saved successfully";
        } else if (section === "notifications") {
          message = "Notification settings saved successfully";
        }
        setMessage({ type: "success", text: message });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to save settings" });
      }
    } catch (err) {
      console.error("Error saving settings:", err);
      setMessage({ type: "error", text: "Failed to save settings" });
    } finally {
      setSaving(false);
    }
  };

  const updateProfile = (field: string, value: string) => {
    setSettings({
      ...settings,
      profile: {
        ...settings.profile,
        [field]: value
      }
    });
  };

  const updateAI = (field: string, value: boolean | string | number) => {
    setSettings({
      ...settings,
      ai: {
        ...settings.ai,
        [field]: value
      }
    });
  };

  const updateNotifications = (field: string, value: boolean) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [field]: value
      }
    });
  };

  if (loading) {
    return (
      <div className="settings-card">
        <p style={{ textAlign: "center", color: "#999" }}>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="settings-card">
      {message && (
        <div style={{
          padding: "12px 16px",
          marginBottom: "16px",
          borderRadius: "8px",
          background: message.type === "success" ? "rgba(56, 215, 136, 0.1)" : "rgba(255, 107, 107, 0.1)",
          color: message.type === "success" ? "#38d788" : "#ff6b6b",
          border: `1px solid ${message.type === "success" ? "#38d788" : "#ff6b6b"}`
        }}>
          {message.text}
        </div>
      )}
      <div className="tab-strip">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab-button${activeTab === tab.key ? " active" : ""}`}
            type="button"
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === "profile" && (
        <div className="tab-panel">
          <div className="settings-grid">
            <div className="settings-field">
              <label htmlFor="full-name">Full Name</label>
              <input 
                id="full-name" 
                className="input-field" 
                value={settings.profile.displayName} 
                onChange={(e) => updateProfile("displayName", e.target.value)}
              />
            </div>
            <div className="settings-field">
              <label htmlFor="email">Email Address</label>
              <input 
                id="email" 
                className="input-field" 
                value={settings.profile.email}
                onChange={(e) => updateProfile("email", e.target.value)}
              />
            </div>
          </div>
          <button 
            className="primary-button" 
            style={{ width: 180 }}
            onClick={() => handleSaveSettings("profile")}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
      {activeTab === "ai" && (
        <div className="tab-panel">
          <div className="settings-grid">
            <div className="settings-field">
              <label htmlFor="anomaly">Enable Anomaly Detection</label>
              <select 
                id="anomaly" 
                className="input-field" 
                value={settings.ai.enabled ? "enabled" : "disabled"}
                onChange={(e) => updateAI("enabled", e.target.value === "enabled")}
              >
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
            <div className="settings-field">
              <label htmlFor="confidence">Confidence Threshold (%)</label>
              <input 
                id="confidence" 
                type="number"
                className="input-field" 
                value={settings.ai.accuracyThreshold}
                onChange={(e) => updateAI("accuracyThreshold", parseInt(e.target.value) || 85)}
                min="0"
                max="100"
              />
            </div>
            <div className="settings-field">
              <label htmlFor="response-tone">Response Tone</label>
              <select 
                id="response-tone" 
                className="input-field"
                value={settings.ai.responseTone}
                onChange={(e) => updateAI("responseTone", e.target.value)}
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
              </select>
            </div>
          </div>
          <button 
            className="primary-button" 
            style={{ width: 180 }}
            onClick={() => handleSaveSettings("ai")}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save AI Settings"}
          </button>
        </div>
      )}
      {activeTab === "notifications" && (
        <div className="tab-panel">
          <div className="settings-grid">
            <div className="settings-field">
              <label>Email Notifications</label>
              <div className="toggle-column">
                <label>
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.email}
                    onChange={(e) => updateNotifications("email", e.target.checked)}
                  /> Expense notifications
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.expenseAlerts}
                    onChange={(e) => updateNotifications("expenseAlerts", e.target.checked)}
                  /> Expense alerts
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.weeklyReports}
                    onChange={(e) => updateNotifications("weeklyReports", e.target.checked)}
                  /> Weekly summary report
                </label>
              </div>
            </div>
            <div className="settings-field">
              <label>In-App Notifications</label>
              <div className="toggle-column">
                <label>
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.push}
                    onChange={(e) => updateNotifications("push", e.target.checked)}
                  /> Push notifications
                </label>
              </div>
            </div>
          </div>
          <button 
            className="primary-button" 
            style={{ width: 220 }}
            onClick={() => handleSaveSettings("notifications")}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Notification Settings"}
          </button>
        </div>
      )}
      <div className="support-card">
        <div>
          <strong>Support &amp; Help</strong>
          <p>Need assistance? Contact our support team or check our documentation.</p>
        </div>
        <div className="support-actions">
          <button className="filter-chip">View Documentation</button>
          <button className="filter-chip">Contact Support</button>
        </div>
      </div>
    </div>
  );
}
