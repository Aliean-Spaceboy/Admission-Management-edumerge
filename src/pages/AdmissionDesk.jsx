// src/pages/AdmissionDesk.jsx
import { useState, useEffect } from "react";
import { api } from "../api";

export default function AdmissionDesk() {
  const [applicants, setApplicants] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [quotas, setQuotas] = useState([]);

  // Application Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    marks: "",
    category: "GM",
    entryType: "Regular",
    programId: "",
    quotaId: "",
  });

  useEffect(() => {
    loadData();
    api.get("/programs").then(setPrograms);
  }, []);

  const loadData = async () => {
    setApplicants(await api.get("/applicants"));
  };

  const handleProgramChange = async (progId) => {
    setForm({ ...form, programId: progId, quotaId: "" });
    if (progId) {
      const qs = await api.get(`/programs/${progId}/quotas`);
      setQuotas(qs);
    } else {
      setQuotas([]);
    }
  };

  const registerApplicant = async (e) => {
    e.preventDefault();
    const newApp = await api.post("/applicants", {
      ...form,
      program: { id: form.programId },
    });

    // Automatically attempt allocation based on the selected quota
    try {
      if (form.quotaId) {
        await api.post(
          `/applicants/${newApp.id}/allocate?programId=${form.programId}&quotaId=${form.quotaId}`
        );
        alert("Applicant Registered & Seat Successfully Allocated!");
      }
    } catch (err) {
      alert("Registered, but seat allocation failed: " + err.message);
    }
    loadData();
  };

  const updateStatus = async (id, field, value) => {
    await api.put(`/applicants/${id}/status`, { [field]: value });
    loadData();
  };

  const confirmAdmission = async (id) => {
    try {
      await api.post(`/applicants/${id}/confirm`);
      alert("Admission Officially Confirmed! ID Generated.");
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Admission Officer Desk</h1>

      {/* New Application Form */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>New Application Intake</h2>
        <form className="form-layout" onSubmit={registerApplicant}>
          <div className="grid-3">
            <div className="input-group">
              <label>Applicant Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label>Email ID</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label>Marks (%)</label>
              <input
                required
                type="number"
                step="0.1"
                value={form.marks}
                onChange={(e) => setForm({ ...form, marks: e.target.value })}
              />
            </div>
          </div>
          <div className="grid-3">
            <div className="input-group">
              <label>Target Program</label>
              <select
                required
                value={form.programId}
                onChange={(e) => handleProgramChange(e.target.value)}
              >
                <option value="">-- Select --</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.code}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label>Requested Quota</label>
              <select
                required
                value={form.quotaId}
                onChange={(e) => setForm({ ...form, quotaId: e.target.value })}
              >
                <option value="">-- Select --</option>
                {quotas.map((q) => (
                  <option key={q.id} value={q.id}>
                    {q.name} (Available: {q.allocatedSeats - q.filledSeats})
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="btn"
              style={{ alignSelf: "flex-end", height: "42px" }}
            >
              Register & Allocate
            </button>
          </div>
        </form>
      </div>

      {/* Applicant Workflow Tracker */}
      <div className="card">
        <h2 style={{ marginBottom: "1rem" }}>Active Admissions Workflow</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Program</th>
              <th>Docs Status</th>
              <th>Fee Status</th>
              <th>Admission State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((app) => (
              <tr key={app.id}>
                <td>
                  <strong>{app.name}</strong>
                  <br />
                  <small>{app.admissionNumber || "No ID Yet"}</small>
                </td>
                <td>
                  {app.program?.code} - {app.quota?.name}
                </td>
                <td>
                  <select
                    value={app.documentStatus}
                    onChange={(e) =>
                      updateStatus(app.id, "documentStatus", e.target.value)
                    }
                    className={`status-badge ${app.documentStatus}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Verified">Verified</option>
                  </select>
                </td>
                <td>
                  <select
                    value={app.feeStatus}
                    onChange={(e) =>
                      updateStatus(app.id, "feeStatus", e.target.value)
                    }
                    className={`status-badge ${app.feeStatus}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </td>
                <td>
                  <span className={`status-badge ${app.admissionStatus}`}>
                    {app.admissionStatus}
                  </span>
                </td>
                <td>
                  {app.admissionStatus === "Allocated" &&
                    app.feeStatus === "Paid" &&
                    app.documentStatus === "Verified" && (
                      <button
                        className="btn btn-sm"
                        style={{ background: "#4F46E5" }}
                        onClick={() => confirmAdmission(app.id)}
                      >
                        Confirm Admission
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
