import { useEffect, useState } from "react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface MetricCardProps {
  label: string;
  value: string | number;
  subtitle: string;
  accentClass?: string;
}

function MetricCard({ label, value, subtitle, accentClass }: MetricCardProps) {
  return (
    <div className={`stat-card ${accentClass || ""}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{subtitle}</div>
    </div>
  );
}

interface AIInsight {
  id: string;
  type: string;
  severity: "Info" | "Alert" | "Success" | "Warning";
  message: string;
}

interface AIInsightCardProps {
  insight: AIInsight;
}

function AIInsightCard({ insight }: AIInsightCardProps) {
  const severityColors: Record<string, string> = {
    Info: "#3ba8ff",
    Alert: "#ff6b6b",
    Success: "#38d788",
    Warning: "#ffa94d"
  };

  const severityBgColors: Record<string, string> = {
    Info: "var(--badge-blue-bg)",
    Alert: "var(--badge-red-bg)",
    Success: "var(--badge-green-bg)",
    Warning: "var(--badge-yellow-bg)"
  };

  const severityIcons: Record<string, string> = {
    Info: "ℹ️",
    Alert: "⚠️",
    Success: "✓",
    Warning: "⚡"
  };

  return (
    <div
      className="section-card"
      style={{
        borderColor: severityColors[insight.severity],
        borderWidth: "1px",
        borderStyle: "solid"
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: severityBgColors[insight.severity],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            flexShrink: 0
          }}
        >
          {severityIcons[insight.severity]}
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "8px", color: "var(--text-primary)" }}>
            {insight.type}
          </h4>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            {insight.message}
          </p>
        </div>
      </div>
    </div>
  );
}

interface ReportsData {
  totalExpenses: number;
  complianceRate: number;
  averagePerTransaction: number;
  flaggedItems: number;
  expenseTrendData: Array<{ month: string; amount: number }>;
  categorySpendingData: Array<{ category: string; amount: number }>;
  aiInsights: AIInsight[];
}

export default function Reports() {
  const [data, setData] = useState<ReportsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/admin/reports");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setData({
            totalExpenses: result.totalExpenses,
            complianceRate: result.complianceRate,
            averagePerTransaction: result.averagePerTransaction,
            flaggedItems: result.flaggedItems,
            expenseTrendData: result.expenseTrendData,
            categorySpendingData: result.categorySpendingData || [],
            aiInsights: result.aiInsights
          });
        } else {
          throw new Error(result.error || "Failed to fetch reports");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch reports data";
        setError(errorMessage);
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportsData();
  }, []);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatCompactCurrency = (value: number): string => {
    if (value >= 1000000) {
      return "$" + (value / 1000000).toFixed(1) + "M";
    } else if (value >= 1000) {
      return "$" + (value / 1000).toFixed(1) + "K";
    }
    return formatCurrency(value);
  };

  const formatPercentage = (value: number): string => {
    return value.toFixed(1) + "%";
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p style={{ color: "var(--text-secondary)" }}>Loading reports...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p style={{ color: "var(--logout-color)" }}>Error: {error || "No data available"}</p>
      </div>
    );
  }

  return (
    <>
      <div style={{ marginBottom: "12px" }}>
        <h2 className="dashboard-title">My Expense Reports and Insights</h2>
        <p className="dashboard-subtitle">Comprehensive analytics for tracking your spending and anomalies</p>
      </div>

      <div className="grid cols-1">
        <div className="section-card">
          <div className="section-header">
            <h3>Expense Trend Over Time</h3>
            <div style={{ display: "flex", gap: "12px", fontSize: "13px" }}>
              <span className="badge blue">Last 6 Months</span>
            </div>
          </div>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <LineChart data={data.expenseTrendData}>
                <XAxis
                  dataKey="month"
                  stroke="#5870a5"
                  dy={6}
                  tickLine={false}
                  axisLine={false}
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  stroke="#5870a5"
                  tickLine={false}
                  axisLine={false}
                  style={{ fontSize: "12px" }}
                  tickFormatter={(value) => formatCompactCurrency(value)}
                />
                <Tooltip
                  cursor={{ stroke: "#3ba8ff", strokeWidth: 1 }}
                  contentStyle={{
                    background: "#0c1736",
                    borderRadius: 12,
                    border: "1px solid rgba(71,102,190,0.45)"
                  }}
                  labelStyle={{ color: "#99a5cc" }}
                  itemStyle={{ color: "#e6ecff" }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#3ba8ff"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#3ba8ff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid cols-4">
        <MetricCard
          label="Total Expenses"
          value={formatCompactCurrency(data.totalExpenses)}
          subtitle="All time"
        />
        <MetricCard
          label="Compliance Rate"
          value={formatPercentage(data.complianceRate)}
          subtitle="Success rate"
          accentClass="accent-green"
        />
        <MetricCard
          label="Average per Transaction"
          value={formatCurrency(data.averagePerTransaction)}
          subtitle="Per expense"
        />
        <MetricCard
          label="Flagged Items"
          value={data.flaggedItems}
          subtitle="Needs review"
          accentClass="accent-yellow"
        />
      </div>

      {data.categorySpendingData.length > 0 && (
        <div className="grid cols-1">
          <div className="section-card">
            <div className="section-header">
              <h3>Spending by Category</h3>
            </div>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={data.categorySpendingData}>
                  <XAxis
                    dataKey="category"
                    stroke="#5870a5"
                    dy={6}
                    tickLine={false}
                    axisLine={false}
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    stroke="#5870a5"
                    tickLine={false}
                    axisLine={false}
                    style={{ fontSize: "12px" }}
                    tickFormatter={(value) => formatCompactCurrency(value)}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(59, 168, 255, 0.1)" }}
                    contentStyle={{
                      background: "#0c1736",
                      borderRadius: 12,
                      border: "1px solid rgba(71,102,190,0.45)"
                    }}
                    labelStyle={{ color: "#99a5cc" }}
                    itemStyle={{ color: "#e6ecff" }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Bar dataKey="amount" fill="#3ba8ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      <div className="section-card">
        <div className="section-header">
          <h3>AI-Generated Insights</h3>
        </div>
        <div className="grid cols-2">
          {data.aiInsights.map((insight) => (
            <AIInsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </>
  );
}
