import { Bell, Search, User } from "lucide-react";

export default function Header() {
  return (
    <header
      className="glass-panel"
      style={{
        borderRadius: "0",
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        padding: "20px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      <div style={{ position: "relative", width: "300px" }}>
        <Search
          size={18}
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-secondary)",
          }}
        />
        <input
          type="text"
          placeholder="Search students, admissions..."
          style={{
            width: "100%",
            padding: "12px 16px 12px 48px",
            borderRadius: "24px",
            background: "rgba(0,0,0,0.2)",
            border: "1px solid var(--border-color)",
            color: "white",
            outline: "none",
            fontFamily: "var(--font-family)",
          }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <div
          style={{
            position: "relative",
            cursor: "pointer",
            color: "var(--text-secondary)",
          }}
        >
          <Bell size={22} />
          <div
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "10px",
              height: "10px",
              background: "var(--accent-purple)",
              borderRadius: "50%",
              border: "2px solid var(--bg-dark)",
            }}
          ></div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={20} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: "500", fontSize: "15px" }}>
              Admin User
            </div>
            <div style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
              Registrar Office
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
