import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  isPositive,
  delay,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-panel"
      style={{ padding: "24px", position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h3
          style={{
            color: "var(--text-secondary)",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          {title}
        </h3>
        <div
          style={{
            padding: "8px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <Icon size={20} color="var(--accent-blue)" />
        </div>
      </div>
      <div style={{ fontSize: "32px", fontWeight: "700", marginBottom: "8px" }}>
        {value}
      </div>
      <div
        style={{
          fontSize: "13px",
          color: isPositive ? "#10b981" : "#ef4444",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <span
          style={{
            background: isPositive
              ? "rgba(16, 185, 129, 0.1)"
              : "rgba(239, 68, 68, 0.1)",
            padding: "2px 6px",
            borderRadius: "4px",
          }}
        >
          {change}
        </span>
        <span style={{ color: "var(--text-secondary)" }}>vs last month</span>
      </div>
      {/* Decorative background glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-20px",
          right: "-20px",
          width: "100px",
          height: "100px",
          background: "var(--accent-blue)",
          filter: "blur(50px)",
          opacity: 0.1,
          zIndex: -1,
        }}
      ></div>
    </motion.div>
  );
}
