import { Home, Users, Settings, BookOpen, BarChart2 } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard", active: true },
    { icon: <Users size={20} />, label: "Admissions" },
    { icon: <BookOpen size={20} />, label: "Courses" },
    { icon: <BarChart2 size={20} />, label: "Analytics" },
    { icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <aside
      className="glass-panel"
      style={{
        width: "260px",
        borderRadius: "0",
        borderLeft: "none",
        borderTop: "none",
        borderBottom: "none",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: "40px" }}>
        <h2
          className="glow-text"
          style={{ fontSize: "24px", letterSpacing: "1px" }}
        >
          EduCore
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "13px",
            marginTop: "4px",
          }}
        >
          Admission Platform
        </p>
      </div>

      <nav
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {navItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "12px 16px",
              borderRadius: "12px",
              cursor: "pointer",
              color: item.active ? "white" : "var(--text-secondary)",
              background: item.active
                ? "linear-gradient(90deg, rgba(59, 130, 246, 0.2), transparent)"
                : "transparent",
              borderLeft: item.active
                ? "3px solid var(--accent-blue)"
                : "3px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {item.icon}
            <span style={{ fontWeight: item.active ? "600" : "400" }}>
              {item.label}
            </span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
