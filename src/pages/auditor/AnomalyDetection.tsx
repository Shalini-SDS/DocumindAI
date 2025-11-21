import { useState } from "react";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Target,
  Info,
  Check,
  X
} from "lucide-react";
import {
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// Mock data for anomalies over time
const anomaliesOverTimeData = [
  { month: "May", count: 9 },
  { month: "Jun", count: 12 },
  { month: "Jul", count: 8 },
  { month: "Aug", count: 11 },
  { month: "Sep", count: 7 },
  { month: "Oct", count: 9 }
];

// Mock data for anomaly reason distribution
const reasonDistributionData = [
  { name: "Duplicate", value: 25, color: "#ff6b6b" },
  { name: "Excessive Amount", value: 20, color: "#ffa94d" },
  { name: "Missing Receipt", value: 30, color: "#ff6b6b" },
  { name: "Unusual Vendor", value: 15, color: "#ffa94d" },
  { name: "Others", value: 10, color: "#99a5cc" }
];

// Mock data for flagged transactions
const flaggedTransactionsData = [
  {
    id: 1,
    date: "2025-11-03",
    user: "Mike Chen",
    vendor: "Global Airlines",
    amount: "$8,900",
    reason: "Duplicate Receipt",
    severity: "high",
    confidence: 87
  },
  {
    id: 2,
    date: "2025-11-02",
    user: "Sarah Johnson",
    vendor: "ABC Taxi Service",
    amount: "$2,500",
    reason: "Excessive Amount",
    severity: "medium",
    confidence: 89
  },
  {
    id: 3,
    date: "2025-11-01",
    user: "Robert Brown",
    vendor: "Unknown Store XYZ",
    amount: "$780",
    reason: "Unusual Vendor",
    severity: "low",
    confidence: 76
  },
  {
    id: 4,
    date: "2025-10-31",
    user: "Lisa Anderson",
    vendor: "Cash Payment",
    amount: "$1,200",
    reason: "Missing Receipt",
    severity: "medium",
    confidence: 100
  },
  {
    id: 5,
    date: "2025-10-28",
    user: "David Wilson",
    vendor: "Restaurant XYZ",
    amount: "$950",
    reason: "Duplicate Receipt",
    severity: "medium",
    confidence: 82
  },
  {
    id: 6,
    date: "2025-10-25",
    user: "Mike Chen",
    vendor: "Hotel Chain",
    amount: "$450",
    reason: "Unusual Pattern",
    severity: "low",
    confidence: 71
  }
];

// Mock data for AI explainability
const explainabilityData = [
  {
    id: 1,
    vendor: "Global Airlines",
    amount: "$8,900",
    severity: "high",
    title: "Duplicate Receipt Detected: Two identical receipts for $8,900 were submitted on the same day by the same user. Receipt numbers match, suggesting potential double billing.",
    confidence: 97
  },
  {
    id: 2,
    vendor: "ABC Taxi Service",
    amount: "$2,500",
    severity: "medium",
    title: "Excessive Amount: This taxi amount is 3.4 standard deviations above the mean for this category ($715). The amount is unusually high, triggering our anomaly detection.",
    confidence: 89
  },
  {
    id: 3,
    vendor: "Unknown Store XYZ",
    amount: "$780",
    severity: "low",
    title: "Unusual Vendor: This vendor has not appeared in our system before. No prior transaction history exists, which may indicate a new or potentially fraudulent vendor.",
    confidence: 76
  }
];

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle: string;
  accentClass?: string;
}

function MetricCard({ icon, label, value, subtitle, accentClass }: MetricCardProps) {
  return (
    <div className={`stat-card ${accentClass || ""}`}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
        <div className="stat-label">{label}</div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{subtitle}</div>
    </div>
  );
}

interface ExplainabilityCardProps {
  data: typeof explainabilityData[0];
}

function ExplainabilityCard({ data }: ExplainabilityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const severityColors: Record<string, string> = {
    high: "#ff6b6b",
    medium: "#ffa94d",
    low: "#74b9ff"
  };

  return (
    <div className="section-card" style={{ 
      borderLeft: `4px solid ${severityColors[data.severity]}`,
      cursor: "pointer"
    }}
    onClick={() => setIsExpanded(!isExpanded)}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          background: `${severityColors[data.severity]}22`,
          display: "grid",
          placeContent: "center",
          flexShrink: 0
        }}>
          <Info size={20} color={severityColors[data.severity]} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
            <div>
              <strong style={{ fontSize: "15px", color: "var(--text-primary)" }}>
                {data.vendor} - {data.amount}
              </strong>
              <span className={`badge ${data.severity === "high" ? "red" : data.severity === "medium" ? "yellow" : "blue"}`} style={{ marginLeft: "12px", textTransform: "uppercase" }}>
                {data.severity}
              </span>
            </div>
            {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
          </div>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", margin: "8px 0" }}>
            {data.title}
          </p>
          {isExpanded && (
            <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border-soft)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>AI Confidence:</span>
                <div style={{ 
                  flex: 1, 
                  height: "8px", 
                  background: "var(--surface-input)", 
                  borderRadius: "4px",
                  overflow: "hidden"
                }}>
                  <div style={{ 
                    width: `${data.confidence}%`, 
                    height: "100%", 
                    background: `linear-gradient(90deg, ${severityColors[data.severity]}, ${severityColors[data.severity]}dd)`,
                    borderRadius: "4px"
                  }} />
                </div>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                  {data.confidence}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AnomalyDetection() {
  const [selectedScenario, setSelectedScenario] = useState("All Scenarios");

  const handleValidate = (id: number) => {
    console.log("Validate transaction:", id);
  };

  const handleReject = (id: number) => {
    console.log("Reject transaction:", id);
  };

  const severityBadgeClass = (severity: string): string => {
    const classes: Record<string, string> = {
      high: "badge red",
      medium: "badge yellow",
      low: "badge blue"
    };
    return classes[severity] || "badge blue";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>
            Anomaly Detection
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            AI-powered fraud and suspicious transaction monitoring
          </p>
        </div>
        <div style={{ position: "relative" }}>
          <select
            value={selectedScenario}
            onChange={(e) => setSelectedScenario(e.target.value)}
            className="input-field"
            style={{ 
              paddingRight: "40px",
              appearance: "none",
              cursor: "pointer",
              minWidth: "180px"
            }}
          >
            <option>All Scenarios</option>
            <option>Duplicate Receipts</option>
            <option>Excessive Amounts</option>
            <option>Missing Receipts</option>
            <option>Unusual Vendors</option>
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

      {/* Metric Cards */}
      <div className="grid cols-4">
        <MetricCard
          icon={<AlertTriangle size={20} color="#ff6b6b" />}
          label="Total Flagged"
          value={6}
          subtitle="This month"
          accentClass="accent-red"
        />
        <MetricCard
          icon={<Clock size={20} color="#ffa94d" />}
          label="Pending Reviews"
          value={4}
          subtitle="Awaiting admin action"
          accentClass="accent-yellow"
        />
        <MetricCard
          icon={<CheckCircle size={20} color="#38d788" />}
          label="Approved After Review"
          value={12}
          subtitle="False positives"
          accentClass="accent-green"
        />
        <MetricCard
          icon={<Target size={20} color="#3ba8ff" />}
          label="AI Accuracy"
          value="94.8%"
          subtitle="Detection accuracy"
        />
      </div>

      {/* Charts Section */}
      <div className="grid cols-2">
        {/* Anomalies Over Time */}
        <div className="section-card">
          <div className="section-header">
            <h3>Anomalies Over Time</h3>
          </div>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <LineChart data={anomaliesOverTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1b2a4d" />
                <XAxis 
                  dataKey="month" 
                  stroke="#5870a5"
                  style={{ fontSize: "13px" }}
                />
                <YAxis 
                  stroke="#5870a5"
                  style={{ fontSize: "13px" }}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0c1736",
                    borderRadius: 12,
                    border: "1px solid rgba(71,102,190,0.45)",
                    fontSize: "13px"
                  }}
                  labelStyle={{ color: "#99a5cc" }}
                  itemStyle={{ color: "#e6ecff" }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#ff6b6b"
                  strokeWidth={3}
                  dot={{ fill: "#ff6b6b", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Anomaly Reason Distribution */}
        <div className="section-card">
          <div className="section-header">
            <h3>Anomaly Reason Distribution</h3>
          </div>
          <div style={{ width: "100%", height: 280, position: "relative" }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={reasonDistributionData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name} ${value}%`}
                  labelLine={{ stroke: "#5870a5" }}
                >
                  {reasonDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#0c1736",
                    borderRadius: 12,
                    border: "1px solid rgba(71,102,190,0.45)",
                    fontSize: "13px"
                  }}
                  formatter={(value) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Flagged Transactions Table */}
      <div className="section-card">
        <div className="section-header">
          <h3>
            <AlertTriangle size={18} style={{ display: "inline", marginRight: "8px", verticalAlign: "middle" }} />
            Flagged Transactions
          </h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Vendor</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Severity</th>
                <th>AI Confidence</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {flaggedTransactionsData.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.user}</td>
                  <td>{transaction.vendor}</td>
                  <td style={{ fontWeight: 600 }}>{transaction.amount}</td>
                  <td>
                    <span className="badge blue">{transaction.reason}</span>
                  </td>
                  <td>
                    <span className={severityBadgeClass(transaction.severity)}>
                      {transaction.severity}
                    </span>
                  </td>
                  <td>{transaction.confidence}%</td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => handleValidate(transaction.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          background: "var(--badge-green-bg)",
                          color: "var(--badge-green-color)",
                          border: "1px solid var(--badge-green-color)",
                          fontSize: "12px",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.2s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--badge-green-color)";
                          e.currentTarget.style.color = "#041024";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "var(--badge-green-bg)";
                          e.currentTarget.style.color = "var(--badge-green-color)";
                        }}
                      >
                        <Check size={14} />
                        Valid
                      </button>
                      <button
                        onClick={() => handleReject(transaction.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          background: "var(--badge-red-bg)",
                          color: "var(--badge-red-color)",
                          border: "1px solid var(--badge-red-color)",
                          fontSize: "12px",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.2s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--badge-red-color)";
                          e.currentTarget.style.color = "#041024";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "var(--badge-red-bg)";
                          e.currentTarget.style.color = "var(--badge-red-color)";
                        }}
                      >
                        <X size={14} />
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Explainability Section */}
      <div className="section-card">
        <div className="section-header">
          <h3>
            <Info size={18} style={{ display: "inline", marginRight: "8px", verticalAlign: "middle" }} />
            AI Explainability - Recent Flags
          </h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {explainabilityData.map((item) => (
            <ExplainabilityCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}