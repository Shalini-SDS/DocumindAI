import { AlertTriangle, CheckCircle, Info, TrendingUp, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface InsightCardProps {
  type: "anomaly" | "recommendation" | "warning";
  title: string;
  description: string;
  details?: string;
  status?: string;
}

interface AuditInsightData {
  insights: InsightCardProps[];
  spendingByCategory: any[];
  detectedOpportunities: any[];
  topMetrics: {
    totalExpenses: number;
    complianceRate: number;
    riskScore: number;
  };
}

const mockInsightData: AuditInsightData = {
  insights: [
    {
      type: "anomaly",
      title: "Trend Expense Increasing",
      description: "Travel expenses have increased by 25% this month compared to last month. The expenses have increased for 25% this month compared to last month.",
      details: "Total travel spend: $8,500"
    },
    {
      type: "warning",
      title: "Duplicate Records Found",
      description: "A duplicate receipt from Unique Vendor dated 03 Dec 2025 has been detected",
      details: "Amount: $1,500"
    },
    {
      type: "recommendation",
      title: "Improved Documentation Rate",
      description: "Documentation completeness has improved to 92%, up 3% from last month. Maintaining records will help reduce compliance issues.",
      details: "Target: 95%"
    },
    {
      type: "recommendation",
      title: "Office Supply Saving Opportunity",
      description: "Analysis suggests combining office supply orders to achieve volume discounts of approximately $500-700 monthly.",
      details: "Recommended: Use preferred vendor"
    },
    {
      type: "anomaly",
      title: "Unusual Vendor Activity",
      description: "Vendor 'Tech Solutions Inc' has 5 transactions in 3 days, which is unusual based on historical patterns.",
      details: "Risk Level: Medium"
    }
  ],
  spendingByCategory: [
    { category: "Travel", amount: 8500 },
    { category: "IT", amount: 6200 },
    { category: "Office", amount: 3400 },
    { category: "Food", amount: 2100 },
    { category: "Misc", amount: 1800 }
  ],
  detectedOpportunities: [
    {
      title: "Consolidate Office Supplies",
      description: "Combine orders to multiple suppliers into one preferred vendor",
      category: "Office Supplies",
      amount: 650
    },
    {
      title: "Negotiate Travel Rates",
      description: "Volume discount negotiation with airline and hotel partners",
      category: "Travel",
      amount: 1200
    },
    {
      title: "Optimize Software Subscriptions",
      description: "Review and consolidate duplicate software licenses",
      category: "IT",
      amount: 850
    },
    {
      title: "Vendor Consolidation",
      description: "Reduce vendor count and negotiate better rates",
      category: "Multiple",
      amount: 1500
    }
  ],
  topMetrics: {
    totalExpenses: 22000,
    complianceRate: 94.8,
    riskScore: 62.5
  }
};

function InsightCard({ type, title, description, details, status }: InsightCardProps) {
  const getBadgeClass = (type: string) => {
    if (type === "anomaly") return "badge red";
    if (type === "warning") return "badge yellow";
    return "badge green";
  };

  const getBadgeText = (type: string) => {
    if (type === "anomaly") return "Anomaly Detected";
    if (type === "warning") return "Requires Action";
    return "Recommendation";
  };
  
  const getIcon = (type: string) => {
    if (type === "anomaly") return <AlertTriangle size={24} />;
    if (type === "warning") return <AlertTriangle size={24} />;
    return <CheckCircle size={24} />;
  };

  return (
    <div className="insight-detail-card">
      <div className="insight-card-header">
        <div className="insight-icon">{getIcon(type)}</div>
        <span className={getBadgeClass(type)}>{getBadgeText(type)}</span>
      </div>
      <h4 className="insight-title">{title}</h4>
      <p className="insight-description">{description}</p>
      {details && <p className="insight-details">{details}</p>}
      {status && <p className="insight-details" style={{ color: "var(--text-secondary)", fontSize: "12px" }}>Status: {status}</p>}
    </div>
  );
}

export default function AuditorAIInsights() {
  const [data, setData] = useState<AuditInsightData>(mockInsightData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useApi, setUseApi] = useState(false);

  const API_URL = "http://127.0.0.1:5000";

  useEffect(() => {
    if (useApi) {
      fetchAIInsights();
    }
  }, [useApi]);

  const fetchAIInsights = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/api/auditor/ai-insights`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch AI insights");
      }
      
      const result = await response.json();
      
      if (result.success) {
        setData(result.data || mockInsightData);
      } else {
        throw new Error(result.message || "Failed to load insights");
      }
    } catch (err) {
      console.error("Error fetching AI insights:", err);
      setError("Failed to load AI insights from server. Showing mock data.");
      setData(mockInsightData);
    } finally {
      setLoading(false);
    }
  };

  const spendingData = data.spendingByCategory && data.spendingByCategory.length > 0
    ? data.spendingByCategory
    : [];

  return (
    <>
      <div style={{ marginBottom: "12px" }}>
        <h2 className="dashboard-title">Audit AI Insights</h2>
        <p className="dashboard-subtitle">AI-powered analysis and recommendations for audit compliance</p>
      </div>

      {/* Top Metrics */}
      <div className="grid cols-4">
        <div className="stat-card">
          <div className="stat-label">Total Expenses</div>
          <div className="stat-value">${data.topMetrics.totalExpenses.toLocaleString()}</div>
          <div className="stat-label">Under review</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Compliance Rate</div>
          <div className="stat-value">{data.topMetrics.complianceRate.toFixed(1)}%</div>
          <div className="stat-label">Current audit status</div>
        </div>
        <div className="stat-card accent-green">
          <div className="stat-label">Risk Score</div>
          <div className="stat-value">{data.topMetrics.riskScore.toFixed(1)}</div>
          <div className="stat-label">Overall assessment</div>
        </div>
        <div className="stat-card accent-yellow">
          <div className="stat-label">Insights Generated</div>
          <div className="stat-value">{data.insights.length}</div>
          <div className="stat-label">Actionable items</div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="section-card">
        <div className="section-header">
          <h3>Audit AI Insights</h3>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {error && (
              <span style={{ fontSize: "12px", color: "#ffa94d" }}>
                📌 Using demo data
              </span>
            )}
            <a 
              className="secondary-link" 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setUseApi(!useApi);
                if (!useApi) {
                  fetchAIInsights();
                }
              }}
            >
              {useApi ? "Use Demo Data" : "Refresh"}
            </a>
          </div>
        </div>
        <div className="insights-list">
          {loading ? (
            <div style={{ textAlign: "center", color: "#999", padding: "20px" }}>
              Loading AI insights...
            </div>
          ) : data.insights.length === 0 ? (
            <div style={{ textAlign: "center", color: "#999", padding: "20px" }}>
              No insights available yet. Process audit items to generate insights.
            </div>
          ) : (
            data.insights.map((insight, index) => (
              <InsightCard key={index} {...insight} />
            ))
          )}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid cols-2">
        {/* Spending by Category */}
        <div className="section-card">
          <div className="section-header">
            <h3>Top 5 Spending Categories This Month</h3>
          </div>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1b2a4d" />
                <XAxis dataKey="category" stroke="#5870a5" />
                <YAxis stroke="#5870a5" />
                <Tooltip
                  contentStyle={{ background: "#0c1736", borderRadius: 12, border: "1px solid rgba(71,102,190,0.45)" }}
                  labelStyle={{ color: "#99a5cc" }}
                  itemStyle={{ color: "#e6ecff" }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Bar dataKey="amount" fill="#3ba8ff" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid cols-3" style={{ marginTop: "12px" }}>
            {spendingData.slice(0, 3).map((item) => (
              <div key={item.category} className="stat-label">
                <span className="badge blue">${item.amount.toLocaleString()}</span>
                <span style={{ marginTop: "4px" }}>{item.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="section-card">
          <div className="section-header">
            <h3>Category Distribution</h3>
          </div>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie 
                  data={spendingData} 
                  dataKey="amount" 
                  nameKey="category"
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60} 
                  outerRadius={100} 
                  paddingAngle={2}
                >
                  {spendingData.map((item, index) => {
                    const colors = ["#3ba8ff", "#24e0ff", "#38d788", "#ffd36a", "#ff6b6b"];
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#0c1736", borderRadius: 12, border: "1px solid rgba(71,102,190,0.45)" }}
                  labelStyle={{ color: "#99a5cc" }}
                  itemStyle={{ color: "#e6ecff" }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detected Opportunities */}
      <div className="grid cols-2">
        <div className="section-card">
          <div className="section-header">
            <h3>AI Detected Savings Opportunities</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {data.detectedOpportunities && data.detectedOpportunities.length > 0 ? (
              data.detectedOpportunities.map((opportunity, index) => (
                <div 
                  key={index}
                  style={{
                    background: "var(--surface-card-alt)",
                    borderRadius: "12px",
                    padding: "16px",
                    border: "1px solid var(--border-pipeline)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                      {opportunity.title || opportunity.category}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                      {opportunity.description || opportunity.recommendation}
                    </div>
                  </div>
                  <span className="badge green" style={{ whiteSpace: "nowrap", marginLeft: "12px" }}>
                    ${opportunity.amount?.toLocaleString() || "0"}
                  </span>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", color: "#999", padding: "20px" }}>
                No savings opportunities detected
              </div>
            )}
          </div>
        </div>

        {/* Total Potential Savings */}
        <div className="section-card">
          <div className="section-header">
            <h3>Savings Summary</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <div className="stat-label" style={{ marginBottom: "8px" }}>Total Potential Savings</div>
              <div style={{ fontSize: "36px", fontWeight: 700, color: "#38d788" }}>
                ${data.detectedOpportunities.reduce((sum, opp) => sum + (opp.amount || 0), 0).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="stat-label" style={{ marginBottom: "8px" }}>Opportunities Identified</div>
              <div style={{ fontSize: "28px", fontWeight: 700 }}>
                {data.detectedOpportunities.length}
              </div>
            </div>
            <div style={{
              background: "rgba(56, 215, 136, 0.1)",
              border: "1px solid rgba(56, 215, 136, 0.3)",
              borderRadius: "12px",
              padding: "14px",
              fontSize: "13px",
              color: "var(--text-secondary)"
            }}>
              <strong style={{ color: "#38d788", display: "block", marginBottom: "6px" }}>
                📊 Recommendation
              </strong>
              Review flagged transactions for optimization potential and cost reduction strategies.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
