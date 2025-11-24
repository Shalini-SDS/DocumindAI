import { AlertTriangle, CheckCircle, Info, TrendingUp, Activity } from "lucide-react";
import { useEffect, useState } from "react";

interface InsightCardProps {
  type: "anomaly" | "recommendation";
  title: string;
  description: string;
  details?: string;
}

function InsightCard({ type, title, description, details }: InsightCardProps) {
  const badgeClass = type === "anomaly" ? "badge red" : "badge blue";
  const badgeText = type === "anomaly" ? "Anomaly Detected" : "Recommendation";
  
  const getIcon = (title: string) => {
    if (title.includes("Spending")) return <TrendingUp size={24} />;
    if (title.includes("Cost Control")) return <CheckCircle size={24} />;
    if (title.includes("Documentation")) return <CheckCircle size={24} />;
    if (title.includes("Anomal")) return <AlertTriangle size={24} />;
    if (title.includes("Vendor")) return <Info size={24} />;
    if (title.includes("Category")) return <Info size={24} />;
    return <Activity size={24} />;
  };

  return (
    <div className="insight-detail-card">
      <div className="insight-card-header">
        <div className="insight-icon">{getIcon(title)}</div>
        <span className={badgeClass}>{badgeText}</span>
      </div>
      <h4 className="insight-title">{title}</h4>
      <p className="insight-description">{description}</p>
      {details && <p className="insight-details">{details}</p>}
    </div>
  );
}

export default function AIInsights() {
  const [insights, setInsights] = useState<InsightCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "http://127.0.0.1:5000";

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/api/admin/ai-insights`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch insights");
      }
      
      const data = await response.json();
      
      if (data.success && data.insights) {
        setInsights(data.insights);
      } else {
        setError("No insights available");
      }
    } catch (err) {
      console.error("Error fetching insights:", err);
      setError("Failed to load insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="section-card">
        <div className="section-header">
          <h3>AI Insights</h3>
          <a 
            className="secondary-link" 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              fetchInsights();
            }}
          >
            Refresh
          </a>
        </div>
        <div className="insights-list">
          {loading ? (
            <div style={{ textAlign: "center", color: "#999", padding: "20px" }}>
              Loading insights...
            </div>
          ) : error ? (
            <div style={{ textAlign: "center", color: "#ff6b6b", padding: "20px" }}>
              {error}
            </div>
          ) : insights.length === 0 ? (
            <div style={{ textAlign: "center", color: "#999", padding: "20px" }}>
              No insights available yet. Upload receipts to generate insights.
            </div>
          ) : (
            insights.map((insight, index) => (
              <InsightCard key={index} {...insight} />
            ))
          )}
        </div>
      </div>
    </>
  );
}