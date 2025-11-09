import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiBell, FiMoon, FiSettings, FiSun } from "react-icons/fi";

type SidebarLink = {
  label: string;
  icon: ReactNode;
  path?: string;
  onClick?: () => void;
};

type DashboardLayoutProps = {
  appName: string;
  sidebarLinks: SidebarLink[];
  footerLinks?: SidebarLink[];
  title: string;
  subtitle: string;
  children: ReactNode;
  userName: string;
  userRole: string;
};

export default function DashboardLayout({
  appName,
  sidebarLinks,
  footerLinks = [],
  title,
  subtitle,
  children,
  userName,
  userRole
}: DashboardLayoutProps) {
  const location = useLocation();
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem("transparency-theme");
    return stored === "light" ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("transparency-theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div>
          <div className="sidebar-header">
            <span role="img" aria-label="shield">
              🛡️
            </span>
            {appName}
          </div>
          <nav className="sidebar-nav">
            {sidebarLinks.map((link) => {
              const isActive = link.path ? location.pathname === link.path : false;
              if (link.path) {
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`sidebar-link${isActive ? " active" : ""}`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                );
              }
              if (link.onClick) {
                return (
                  <div
                    key={link.label}
                    className="sidebar-link"
                    onClick={link.onClick}
                    style={{ cursor: "pointer" }}
                  >
                    {link.icon}
                    {link.label}
                  </div>
                );
              }
              return (
                <div key={link.label} className="sidebar-link">
                  {link.icon}
                  {link.label}
                </div>
              );
            })}
          </nav>
        </div>
        <div className="sidebar-footer">
          <div className="sidebar-nav">
            {footerLinks.map((link) => (
              <div key={link.label} className="sidebar-link">
                {link.icon}
                {link.label}
              </div>
            ))}
          </div>
          <button className="logout-button">
            <span role="img" aria-label="logout">
              ⏏️
            </span>
            Logout
          </button>
        </div>
      </aside>
      <main className="dashboard-main">
        <div className="dashboard-topbar">
          <div>
            <div className="dashboard-title">{title}</div>
            <div className="dashboard-subtitle">{subtitle}</div>
          </div>
          <div className="topbar-right">
            <button className="icon-button" type="button" onClick={toggleTheme}>
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>
            <div className="icon-button">
              <FiBell />
            </div>
            <div className="icon-button">
              <FiSettings />
            </div>
            <div className="user-chip">
              <span>{userRole}</span>
              <strong>{userName}</strong>
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
