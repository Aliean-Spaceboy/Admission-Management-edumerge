import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Settings, Users } from "lucide-react";

// Imports from your folder structure
import Dashboard from "./pages/Dashboard";
import MasterSetup from "./pages/MasterSetup";
import AdmissionDesk from "./pages/AdmissionDesk";

// Import the top header component we created earlier
import Header from "./components/Header";

// Global Styles
import "./index.css";

function App() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Overview Dashboard", icon: LayoutDashboard },
    { path: "/master", label: "Master Configurator", icon: Settings },
    { path: "/admission", label: "Admission Desk", icon: Users },
  ];

  return (
    <div className="layout-container">
      {/* 🚀 UPGRADED GLASSMORPHIC SIDEBAR */}
      <aside
        className="sidebar glass-panel"
        style={{
          borderRadius: 0,
          borderTop: "none",
          borderLeft: "none",
          borderBottom: "none",
          zIndex: 20,
        }}
      >
        <div style={{ padding: "10px", marginBottom: "2.5rem" }}>
          <h2
            className="glow-text"
            style={{ fontSize: "28px", margin: 0, letterSpacing: "-0.5px" }}
          >
            EduCRM
          </h2>
          <small
            style={{
              color: "var(--text-muted)",
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontSize: "11px",
              fontWeight: "600",
            }}
          >
            Admin Portal
          </small>
        </div>

        <nav
          style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                <Icon
                  size={20}
                  style={{
                    color: isActive
                      ? "var(--accent-blue)"
                      : "var(--text-muted)",
                  }}
                />
                <span style={{ fontWeight: isActive ? "600" : "500" }}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* 🚀 MAIN CONTENT AREA */}
      <main
        className="main-content"
        style={{ display: "flex", flexDirection: "column", padding: 0 }}
      >
        {/* Top Header Component goes here so it stays fixed above the scrolling pages */}
        <Header />

        {/* Scrollable Page Content Area */}
        <div style={{ padding: "2rem", flex: 1, overflowY: "auto" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/master" element={<MasterSetup />} />
            <Route path="/admission" element={<AdmissionDesk />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
