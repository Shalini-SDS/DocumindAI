import { ReactNode, useMemo, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { FiActivity, FiBarChart2, FiFileText, FiFolder, FiGrid, FiSettings, FiUploadCloud } from "react-icons/fi";

type PageConfig = {
  key: string;
  label: string;
  icon: ReactNode;
  path: string;
  title: string;
  subtitle: string;
};

const pages: PageConfig[] = [
  {
    key: "overview",
    label: "Dashboard Overview",
    icon: <FiGrid />,
    path: "/dashboard/employee",
    title: "My Expense Dashboard",
    subtitle: "Track and manage your personal expenses"
  },
  {
    key: "upload",
    label: "Upload Receipt",
    icon: <FiUploadCloud />,
    path: "/dashboard/employee/upload",
    title: "Upload Expense Document",
    subtitle: "AI powered OCR will extract data automatically"
  },
  {
    key: "expenses",
    label: "My Expenses",
    icon: <FiFolder />,
    path: "/dashboard/employee/expenses",
    title: "Expense History",
    subtitle: "Review submissions and AI status in one place"
  },
  {
    key: "reports",
    label: "Reports",
    icon: <FiBarChart2 />,
    path: "/dashboard/employee/reports",
    title: "My Expense Reports",
    subtitle: "Comprehensive analytics for tracking your spending"
  },
  {
    key: "anomaly",
    label: "Anomaly Detection",
    icon: <FiActivity />,
    path: "/dashboard/employee/anomaly-detection",
    title: "My Anomaly Detection",
    subtitle: "AI-powered fraud and expense anomaly detection"
  },
  {
    key: "settings",
    label: "Settings",
    icon: <FiSettings />,
    path: "/dashboard/employee/settings",
    title: "Workspace Preferences",
    subtitle: "Customize notifications, AI automation, and policies"
  }
];

export default function EmployeeDashboard() {
  const location = useLocation();
  const [userName, setUserName] = useState("Employee User");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://127.0.0.1:5000";

  useEffect(() => {
    fetchUserSettings();
  }, []);

  const fetchUserSettings = async () => {
    try {
      const response = await fetch(`${API_URL}/settings/employee`);
      const data = await response.json();
      if (data.success && data.settings?.profile?.displayName) {
        setUserName(data.settings.profile.displayName);
      }
    } catch (err) {
      console.error("Error fetching user settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const activePage = useMemo(() => {
    const exact = pages.find((page) => location.pathname === page.path);
    if (exact) {
      return exact;
    }
    return pages.find((page) => location.pathname.startsWith(`${page.path}/`)) ?? pages[0];
  }, [location.pathname]);

  if (loading) {
    return (
      <DashboardLayout
        appName="AI Expense Transparency"
        sidebarLinks={pages.map(({ label, icon, path }) => ({ label, icon, path }))}
        footerLinks={[{ label: "Reports", icon: <FiFileText /> }]}
        title="Loading..."
        subtitle="Please wait"
        userName="Employee User"
        userRole="Employee"
      >
        <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
          Loading dashboard...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      appName="AI Expense Transparency"
      sidebarLinks={pages.map(({ label, icon, path }) => ({ label, icon, path }))}
      footerLinks={[]}
      title={activePage.title}
      subtitle={activePage.subtitle}
      userName={userName}
      userRole="Employee"
    >
      <Outlet />
    </DashboardLayout>
  );
}
