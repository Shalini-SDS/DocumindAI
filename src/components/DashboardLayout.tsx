import { ReactNode, useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiBell, FiMoon, FiSettings, FiSun, FiLogOut } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

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
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("userName");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              const isActive = link.path
                ? location.pathname === link.path || location.pathname.startsWith(`${link.path}/`)
                : false;
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
            <div ref={profileMenuRef} style={{ position: "relative", display: "flex", alignItems: "center", gap: "12px" }}>
              <button 
                className="icon-button" 
                type="button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                style={{
                  cursor: "pointer",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #3ba8ff 0%, #2e8ecc 100%)",
                  border: "2px solid var(--border-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: 0
                }}
              >
                {userName.charAt(0).toUpperCase()}
              </button>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <strong style={{ fontSize: "14px", color: "var(--text-primary)" }}>{userName}</strong>
                <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{userRole}</span>
              </div>
              {showProfileMenu && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: "8px",
                  background: "var(--surface-card)",
                  border: "1px solid var(--border-soft)",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  minWidth: "200px",
                  zIndex: 1000
                }}>
                  <div style={{ padding: "8px 0" }}>
                    <div style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      color: "var(--text-primary)",
                      fontSize: "14px",
                      fontWeight: 500,
                      borderBottom: "1px solid var(--border-soft)"
                    }}>
                      My Account
                    </div>
                    <div style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      color: "var(--text-primary)",
                      fontSize: "14px",
                      transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--surface-hover)"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                      Profile Settings
                    </div>
                    <div style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      color: "var(--text-primary)",
                      fontSize: "14px",
                      transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--surface-hover)"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                      Preferences
                    </div>
                    <div style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      color: "#ff6b6b",
                      fontSize: "14px",
                      borderTop: "1px solid var(--border-soft)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--surface-hover)"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    onClick={handleLogout}
                    >
                      <FiLogOut size={16} />
                      Logout
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
