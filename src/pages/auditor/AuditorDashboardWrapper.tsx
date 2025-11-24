import { Outlet, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import type { ReactElement } from "react";
import {
  FiActivity,
  FiArchive,
  FiBarChart2,
  FiBookOpen,
  FiGrid,
  FiLayers,
  FiLogOut
} from "react-icons/fi";

export default function AuditorDashboardWrapper(): ReactElement {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <DashboardLayout
      appName="AI Expense Transparency"
      sidebarLinks={[
        { label: "Dashboard Overview", icon: <FiGrid />, path: "/dashboard/auditor" },
        { label: "All Expenses", icon: <FiArchive />, path: "/dashboard/auditor/all-expenses" },
        { label: "Anomaly Review", icon: <FiActivity />, path: "/dashboard/auditor/anomaly-detection" },
        { label: "Reports", icon: <FiBarChart2 />, path: "/dashboard/auditor/reports" },
        { label: "Audit Trail", icon: <FiLayers />, path: "/dashboard/auditor/audit-trail" },
        { label: "AI Insights", icon: <FiBookOpen />, path: "/dashboard/auditor/ai-insights" },
        { label: "Logout", icon: <FiLogOut />, onClick: handleLogout }
      ]}
      footerLinks={[]}
      title="Auditor Dashboard"
      subtitle=""
      userName="Admin User"
      userRole="Auditor"
    >
      <Outlet />
    </DashboardLayout>
  );
}