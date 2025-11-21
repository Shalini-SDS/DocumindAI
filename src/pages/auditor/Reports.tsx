import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const expenseTrendData = [
  { month: "Jan", flaggedAmount: 5000, totalExpenses: 32000 },
  { month: "Feb", flaggedAmount: 4800, totalExpenses: 30500 },
  { month: "Mar", flaggedAmount: 5200, totalExpenses: 31200 },
  { month: "Apr", flaggedAmount: 4500, totalExpenses: 30800 },
  { month: "May", flaggedAmount: 5100, totalExpenses: 32500 },
  { month: "Jun", flaggedAmount: 4700, totalExpenses: 31800 },
  { month: "Jul", flaggedAmount: 5600, totalExpenses: 33200 },
  { month: "Aug", flaggedAmount: 5300, totalExpenses: 32100 },
  { month: "Sep", flaggedAmount: 5800, totalExpenses: 33800 },
  { month: "Oct", flaggedAmount: 5100, totalExpenses: 32900 }
];

const categoryWiseData = [
  { category: "Travel", amount: 16500 },
  { category: "Food", amount: 5800 },
  { category: "Office", amount: 4200 },
  { category: "IT", amount: 3900 },
  { category: "Misc", amount: 2100 }
];

const fraudDetectionData = [
  { category: "Duplicates", count: 15, fill: "#ff6b6b" },
  { category: "Unusual", count: 8, fill: "#ffa94d" },
  { category: "Unmatched", count: 14, fill: "#ff8c42" },
  { category: "Overpaid", count: 5, fill: "#ff6b6b" }
];

export default function AuditorReports() {
  const [dateRange, setDateRange] = useState("Last 5 Months");
  const [department, setDepartment] = useState("All Departments");
  const [category, setCategory] = useState("All Categories");

  return (
    <>
      <div style={{ marginBottom: "12px" }}>
        <h2 className="dashboard-title">Reports</h2>
        <p className="dashboard-subtitle">Comprehensive analysis of spending patterns and anomalies</p>
      </div>

      {/* Filters Section */}
      <div className="grid cols-3" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 500 }}>
            📅 Date Range
          </label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-field"
            style={{ cursor: "pointer" }}
          >
            <option>Last 5 Months</option>
            <option>Last 3 Months</option>
            <option>Last Year</option>
            <option>All Time</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 500 }}>
            🏢 Department
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="input-field"
            style={{ cursor: "pointer" }}
          >
            <option>All Departments</option>
            <option>Finance</option>
            <option>HR</option>
            <option>Operations</option>
            <option>Marketing</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 500 }}>
            📊 Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
            style={{ cursor: "pointer" }}
          >
            <option>All Categories</option>
            <option>Travel</option>
            <option>Food</option>
            <option>Office</option>
            <option>IT</option>
          </select>
        </div>
      </div>

      {/* Expense Trend Chart */}
      <div className="section-card">
        <div className="section-header">
          <h3>Expense Trend Over Time</h3>
        </div>
        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <LineChart data={expenseTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1b2a4d" />
              <XAxis dataKey="month" stroke="#5870a5" />
              <YAxis stroke="#5870a5" />
              <Tooltip
                contentStyle={{ background: "#0c1736", borderRadius: 12, border: "1px solid rgba(71,102,190,0.45)" }}
                labelStyle={{ color: "#99a5cc" }}
                itemStyle={{ color: "#e6ecff" }}
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Legend
                wrapperStyle={{ color: "var(--text-secondary)" }}
                contentStyle={{ background: "transparent" }}
              />
              <Line
                type="monotone"
                dataKey="flaggedAmount"
                stroke="#ff6b6b"
                strokeWidth={2}
                dot={{ fill: "#ff6b6b", r: 4 }}
                name="Flagged Amount"
              />
              <Line
                type="monotone"
                dataKey="totalExpenses"
                stroke="#3ba8ff"
                strokeWidth={2}
                dot={{ fill: "#3ba8ff", r: 4 }}
                name="Total Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid cols-2">
        {/* Category-Wise Spending */}
        <div className="section-card">
          <div className="section-header">
            <h3>Category-Wise Spending</h3>
          </div>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart
                data={categoryWiseData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1b2a4d" />
                <XAxis type="number" stroke="#5870a5" />
                <YAxis dataKey="category" type="category" stroke="#5870a5" width={100} />
                <Tooltip
                  contentStyle={{ background: "#0c1736", borderRadius: 12, border: "1px solid rgba(71,102,190,0.45)" }}
                  labelStyle={{ color: "#99a5cc" }}
                  itemStyle={{ color: "#e6ecff" }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Bar dataKey="amount" fill="#3ba8ff" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fraud Detection Statistics */}
        <div className="section-card">
          <div className="section-header">
            <h3>Fraud Detection Statistics</h3>
          </div>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={fraudDetectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1b2a4d" />
                <XAxis dataKey="category" stroke="#5870a5" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#5870a5" />
                <Tooltip
                  contentStyle={{ background: "#0c1736", borderRadius: 12, border: "1px solid rgba(71,102,190,0.45)" }}
                  labelStyle={{ color: "#99a5cc" }}
                  itemStyle={{ color: "#e6ecff" }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {fraudDetectionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid cols-4">
        <div className="stat-card">
          <div className="stat-label">Total Analyzed</div>
          <div className="stat-value">172</div>
          <div className="stat-label">Transactions</div>
        </div>
        <div className="stat-card accent-green">
          <div className="stat-label">Clean Data</div>
          <div className="stat-value">97.7%</div>
          <div className="stat-label">No issues detected</div>
        </div>
        <div className="stat-card accent-yellow">
          <div className="stat-label">Flagged Amounts</div>
          <div className="stat-value">$11.2K</div>
          <div className="stat-label">Under review</div>
        </div>
        <div className="stat-card accent-red">
          <div className="stat-label">Avg Resolution</div>
          <div className="stat-value">2.3</div>
          <div className="stat-label">Days</div>
        </div>
      </div>

      {/* AI-Generated Insights */}
      <div className="section-card">
        <div className="section-header">
          <h3>AI-Generated Insights</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Spending Pattern */}
          <div
            style={{
              background: "rgba(59, 168, 255, 0.1)",
              border: "1px solid rgba(59, 168, 255, 0.3)",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              gap: "12px"
            }}
          >
            <div style={{ fontSize: "20px" }}>📊</div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: "4px", color: "var(--text-primary)" }}>
                Spending Pattern
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                Travel expenses have increased by 23% compared to last quarter. This aligns with the Q4 conference season. IT spending remains consistent with budget allocations.
              </div>
            </div>
          </div>

          {/* Anomaly Alert */}
          <div
            style={{
              background: "rgba(255, 169, 77, 0.1)",
              border: "1px solid rgba(255, 169, 77, 0.3)",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              gap: "12px"
            }}
          >
            <div style={{ fontSize: "20px" }}>⚠️</div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: "4px", color: "var(--text-primary)" }}>
                Anomaly Alert
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                2 duplicate transactions detected in October. Over AI flagged these for manual review. Average resolution time for similar issues is 1.8 days.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
