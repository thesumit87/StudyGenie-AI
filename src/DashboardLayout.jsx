import { useState } from "react";
import "./DashboardLayout.css";

function DashboardLayout({
  children,
  activePage = "Dashboard",
  onNavigate,
  onLogout,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: "⌂" },
    { name: "AI Assistant", icon: "✦" },
    { name: "Notes", icon: "▤" },
    { name: "Quiz", icon: "□" },
    { name: "Progress", icon: "⌁" },
    { name: "Books", icon: "▥" },
    { name: "Profile", icon: "♟" },
  ];

  const handleNavigate = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div
      className={`dashboard-layout ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">◆</div>
          <span>
            StudyGenie <b>AI</b>
          </span>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`sidebar-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => handleNavigate(item.name)}
              title={item.name}
            >
              <span className="sidebar-icon">
                {item.icon}
              </span>

              <span className="sidebar-text">
                {item.name}
              </span>
            </button>
          ))}
        </nav>

        <button
          className="sidebar-logout"
          onClick={onLogout}
        >
          <span>↪</span>
          <span className="sidebar-text">Logout</span>
        </button>
      </aside>

      <div className="dashboard-main">

        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button
              className="hamburger-btn"
              onClick={() =>
                setSidebarOpen((prev) => !prev)
              }
              aria-label="Toggle sidebar"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className="topbar-search">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search anything..."
              />
            </div>
          </div>

          <div className="topbar-profile">
            <img
              src={
                localStorage.getItem("profilePhoto") ||
                "/default-avatar.png"
              }
              alt="Profile"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            <strong>
              Hi,{" "}
              {JSON.parse(
                localStorage.getItem("studygenieProfile") ||
                  '{"name":"Student"}'
              ).name || "Student"}
            </strong>

            <span className="online-dot"></span>
          </div>
        </header>

        <main className="dashboard-page">
          {children}
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;