import { useState } from "react";
import { 
  Activity, 
  CheckCircle, 
  Flag,
  FileText,
  Search,
  Shield
} from "lucide-react";
import { FiChevronDown } from "react-icons/fi";

// Mock data for activity log
const activityLogData = [
  {
    id: 1,
    timestamp: "2025-11-03 14:32",
    user: "John Smith",
    action: "Approved Expense",
    actionType: "approved",
    details: "Tech Solutions Inc - $2,450",
    ipAddress: "192.168.1.100"
  },
  {
    id: 2,
    timestamp: "2025-11-03 13:15",
    user: "Sarah Johnson",
    action: "Uploaded Receipt",
    actionType: "uploaded",
    details: "Office Depot - $340",
    ipAddress: "192.168.1.102"
  },
  {
    id: 3,
    timestamp: "2025-11-03 12:45",
    user: "John Smith",
    action: "Flagged as Duplicate",
    actionType: "flagged",
    details: "Global Airlines - $8,900",
    ipAddress: "192.168.1.100"
  },
  {
    id: 4,
    timestamp: "2025-11-03 11:20",
    user: "Emily Davis",
    action: "Generated Audit Report",
    actionType: "generated",
    details: "October 2025 Financial Report",
    ipAddress: "192.168.1.105"
  },
  {
    id: 5,
    timestamp: "2025-11-03 10:30",
    user: "Mike Chen",
    action: "Uploaded Receipt",
    actionType: "uploaded",
    details: "Restaurant Plaza - $450",
    ipAddress: "192.168.1.103"
  },
  {
    id: 6,
    timestamp: "2025-11-02 16:45",
    user: "John Smith",
    action: "Rejected Expense",
    actionType: "rejected",
    details: "ABC Taxi Service - $2,500",
    ipAddress: "192.168.1.100"
  },
  {
    id: 7,
    timestamp: "2025-11-02 15:30",
    user: "Robert Brown",
    action: "Uploaded Receipt",
    actionType: "uploaded",
    details: "Cloud Services Ltd - $1,200",
    ipAddress: "192.168.1.104"
  },
  {
    id: 8,
    timestamp: "2025-11-02 14:15",
    user: "John Smith",
    action: "Returned Expense",
    actionType: "returned",
    details: "Changed Value Chen to User",
    ipAddress: "192.168.1.100"
  },
  {
    id: 9,
    timestamp: "2025-11-02 13:00",
    user: "Emily Davis",
    action: "Rejected Docs",
    actionType: "rejected",
    details: "Q3 Compliance Report CSV",
    ipAddress: "192.168.1.105"
  },
  {
    id: 10,
    timestamp: "2025-11-02 11:45",
    user: "Sarah Johnson",
    action: "Edited Expense",
    actionType: "edited",
    details: "Updated vendor name for $340 expense",
    ipAddress: "192.168.1.102"
  }
];

// Mock data for recent activity timeline
const recentActivityData = [
  {
    id: 1,
    user: "John Smith",
    action: "Approved Expense",
    actionType: "approved",
    details: "Tech Solutions Inc - $2,450",
    timestamp: "2025-11-03 14:32"
  },
  {
    id: 2,
    user: "Sarah Johnson",
    action: "Uploaded Receipt",
    actionType: "uploaded",
    details: "Office Depot - $340",
    timestamp: "2025-11-03 13:15"
  },
  {
    id: 3,
    user: "John Smith",
    action: "Flagged as Duplicate",
    actionType: "flagged",
    details: "Global Airlines - $8,900",
    timestamp: "2025-11-03 12:45"
  },
  {
    id: 4,
    user: "Emily Davis",
    action: "Generated Audit Report",
    actionType: "generated",
    details: "October 2025 Financial Report",
    timestamp: "2025-11-03 11:20"
  },
  {
    id: 5,
    user: "Mike Chen",
    action: "Uploaded Receipt",
    actionType: "uploaded",
    details: "Restaurant Plaza - $450",
    timestamp: "2025-11-03 10:30"
  }
];

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle: string;
}

function MetricCard({ icon, label, value, subtitle }: MetricCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "12px 0" }}>
        <div style={{ 
          width: "42px", 
          height: "42px", 
          borderRadius: "12px",
          background: "var(--surface-icon)",
          display: "grid",
          placeContent: "center",
          border: "1px solid var(--border-soft)"
        }}>
          {icon}
        </div>
        <div className="stat-value">{value}</div>
      </div>
      <div className="stat-label">{subtitle}</div>
    </div>
  );
}

interface TimelineItemProps {
  data: typeof recentActivityData[0];
}

function TimelineItem({ data }: TimelineItemProps) {
  const getActionBadgeClass = (actionType: string): string => {
    const classes: Record<string, string> = {
      approved: "badge green",
      uploaded: "badge blue",
      flagged: "badge red",
      rejected: "badge red",
      generated: "badge blue",
      edited: "badge yellow",
      returned: "badge yellow"
    };
    return classes[actionType] || "badge blue";
  };

  const getIndicatorColor = (actionType: string): string => {
    const colors: Record<string, string> = {
      approved: "#38d788",
      uploaded: "#74b9ff",
      flagged: "#ff6b6b",
      rejected: "#ff6b6b",
      generated: "#74b9ff",
      edited: "#ffa94d",
      returned: "#ffa94d"
    };
    return colors[actionType] || "#74b9ff";
  };

  return (
    <div style={{ 
      display: "flex", 
      gap: "16px",
      position: "relative",
      paddingBottom: "24px"
    }}>
      <div style={{ 
        width: "12px", 
        height: "12px", 
        borderRadius: "50%",
        background: getIndicatorColor(data.actionType),
        marginTop: "6px",
        flexShrink: 0,
        zIndex: 1
      }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
          <strong style={{ fontSize: "14px", color: "var(--text-primary)" }}>
            {data.user}
          </strong>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            {data.timestamp}
          </span>
        </div>
        <div style={{ marginBottom: "6px" }}>
          <span className={getActionBadgeClass(data.actionType)}>
            {data.action}
          </span>
        </div>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0 }}>
          {data.details}
        </p>
      </div>
    </div>
  );
}

export default function AuditTrail() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Actions");

  const getActionBadgeClass = (actionType: string): string => {
    const classes: Record<string, string> = {
      approved: "badge green",
      uploaded: "badge blue",
      flagged: "badge red",
      rejected: "badge red",
      generated: "badge blue",
      edited: "badge yellow",
      returned: "badge yellow"
    };
    return classes[actionType] || "badge blue";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Metric Cards */}
      <div className="grid cols-4">
        <MetricCard
          icon={<Activity size={20} color="#3ba8ff" />}
          label="Total Activities"
          value={10}
          subtitle="Last 30 days"
        />
        <MetricCard
          icon={<CheckCircle size={20} color="#38d788" />}
          label="Approvals"
          value={1}
          subtitle="Actions completed"
        />
        <MetricCard
          icon={<Flag size={20} color="#ff6b6b" />}
          label="Flags/Rejections"
          value={2}
          subtitle="Issues actions"
        />
        <MetricCard
          icon={<FileText size={20} color="#3ba8ff" />}
          label="Reports Generated"
          value={2}
          subtitle="Last 7 reports"
        />
      </div>

      {/* Search and Filter Section */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <Search 
            size={18} 
            style={{ 
              position: "absolute", 
              left: "16px", 
              top: "50%", 
              transform: "translateY(-50%)",
              color: "var(--text-secondary)"
            }} 
          />
          <input
            type="text"
            placeholder="Search activities by user, action, or vendor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            style={{ paddingLeft: "48px", width: "100%" }}
          />
        </div>
        <div style={{ position: "relative", minWidth: "180px" }}>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="input-field"
            style={{ 
              paddingRight: "40px",
              appearance: "none",
              cursor: "pointer",
              width: "100%"
            }}
          >
            <option>All Actions</option>
            <option>Approved Expenses</option>
            <option>Uploaded Receipts</option>
            <option>Flagged Items</option>
            <option>Rejected Items</option>
            <option>Generated Reports</option>
          </select>
          <FiChevronDown 
            style={{ 
              position: "absolute", 
              right: "16px", 
              top: "50%", 
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "var(--text-secondary)"
            }} 
          />
        </div>
      </div>

      {/* Activity Log Table */}
      <div className="section-card">
        <div className="section-header">
          <h3>Activity Log (10 entries)</h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Action</th>
                <th>Details</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {activityLogData.map((activity) => (
                <tr key={activity.id}>
                  <td style={{ fontSize: "13px" }}>{activity.timestamp}</td>
                  <td>{activity.user}</td>
                  <td>
                    <span className={getActionBadgeClass(activity.actionType)}>
                      {activity.action}
                    </span>
                  </td>
                  <td style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                    {activity.details}
                  </td>
                  <td style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                    {activity.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity Timeline */}
      <div className="section-card">
        <div className="section-header">
          <h3>Recent Activity Timeline</h3>
        </div>
        <div style={{ 
          position: "relative",
          paddingLeft: "8px"
        }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: "14px",
            top: "12px",
            bottom: "24px",
            width: "2px",
            background: "var(--border-soft)"
          }} />
          
          {/* Timeline items */}
          <div style={{ position: "relative" }}>
            {recentActivityData.map((item) => (
              <TimelineItem key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Audit Trail Integrity */}
      <div className="section-card" style={{
        background: "var(--surface-info)",
        border: "1px solid rgba(59, 168, 255, 0.3)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: "rgba(59, 168, 255, 0.2)",
            display: "grid",
            placeContent: "center",
            border: "1px solid rgba(59, 168, 255, 0.4)"
          }}>
            <Shield size={24} color="#3ba8ff" />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "6px" }}>
              Audit Trail Integrity
            </h4>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0 }}>
              All activities are logged with timestamps and IP addresses for complete transparency and accountability. This audit trail is immutable and cannot be modified or deleted, ensuring compliance with financial regulations.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                background: "rgba(56, 215, 136, 0.2)",
                color: "#38d788",
                border: "1px solid rgba(56, 215, 136, 0.4)",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "default"
              }}
            >
              Blockchain Verified
            </button>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                background: "rgba(59, 168, 255, 0.2)",
                color: "#3ba8ff",
                border: "1px solid rgba(59, 168, 255, 0.4)",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "default"
              }}
            >
              Tamper-Proof
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}