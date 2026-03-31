import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Users, TrendingUp, CreditCard, Activity } from "lucide-react";
import StatCard from "../components/StatCard";

const chartData = [
  { name: "Jan", current: 4000, previous: 2400 },
  { name: "Feb", current: 3000, previous: 1398 },
  { name: "Mar", current: 2000, previous: 9800 },
  { name: "Apr", current: 2780, previous: 3908 },
  { name: "May", current: 1890, previous: 4800 },
  { name: "Jun", current: 2390, previous: 3800 },
  { name: "Jul", current: 3490, previous: 4300 },
];

export default function Dashboard() {
  return (
    <div
      style={{
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1
          className="glow-text"
          style={{ fontSize: "32px", marginBottom: "8px" }}
        >
          Admission Overview
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Monitor real-time student enrollment and revenue metrics.
        </p>
      </motion.div>

      {/* Cards Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
        }}
      >
        <StatCard
          title="Total Students Enrolled"
          value="12,345"
          change="+14.5%"
          isPositive={true}
          icon={Users}
          delay={0.1}
        />
        <StatCard
          title="Application Conversion"
          value="64.2%"
          change="+5.2%"
          isPositive={true}
          icon={Activity}
          delay={0.2}
        />
        <StatCard
          title="Revenue Collected"
          value="$450,230"
          change="+22.4%"
          isPositive={true}
          icon={CreditCard}
          delay={0.3}
        />
        <StatCard
          title="Pending Verifications"
          value="142"
          change="-2.5%"
          isPositive={false}
          icon={TrendingUp}
          delay={0.4}
        />
      </div>

      {/* Charts Row */}
      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}
      >
        {/* Main Area Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-panel"
          style={{ padding: "24px" }}
        >
          <h3 style={{ marginBottom: "24px", fontWeight: "500" }}>
            Enrollment Trends
          </h3>
          <div style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(20, 24, 34, 0.9)",
                    borderColor: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area
                  type="monotone"
                  dataKey="current"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCurrent)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Side Bar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-panel"
          style={{ padding: "24px" }}
        >
          <h3 style={{ marginBottom: "24px", fontWeight: "500" }}>
            Applications by Department
          </h3>
          <div style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.slice(0, 5)}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={{
                    backgroundColor: "rgba(20, 24, 34, 0.9)",
                    borderColor: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="previous" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
