// src/pages/MasterSetup.jsx
import { useState, useEffect } from "react";
import { api } from "../api";

export default function MasterSetup() {
  const [programs, setPrograms] = useState([]);
  const [form, setForm] = useState({ name: "", code: "", totalIntake: "" });
  const [quotaForm, setQuotaForm] = useState({
    programId: "",
    name: "",
    allocatedSeats: "",
  });

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    const data = await api.get("/programs");
    setPrograms(data);
  };

  const submitProgram = async (e) => {
    e.preventDefault();
    await api.post("/programs", form);
    loadPrograms();
    setForm({ name: "", code: "", totalIntake: "" });
    alert("Program Created Successfully");
  };

  const submitQuota = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/programs/${quotaForm.programId}/quotas`, {
        name: quotaForm.name,
        allocatedSeats: parseInt(quotaForm.allocatedSeats),
      });
      alert("Quota Created!");
      setQuotaForm({ programId: "", name: "", allocatedSeats: "" });
    } catch (err) {
      alert(err.message); // This will catch the backend Over-capacity exception!
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Master Setup Configurator</h1>

      <div className="grid-2">
        {/* Create Program */}
        <div className="card">
          <h2>Create New Program</h2>
          <form className="form-layout" onSubmit={submitProgram}>
            <div className="input-group">
              <label>Program Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Computer Science"
              />
            </div>
            <div className="grid-2">
              <div className="input-group">
                <label>Code</label>
                <input
                  required
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  placeholder="CSE"
                />
              </div>
              <div className="input-group">
                <label>Total Intake</label>
                <input
                  required
                  type="number"
                  value={form.totalIntake}
                  onChange={(e) =>
                    setForm({ ...form, totalIntake: e.target.value })
                  }
                  placeholder="100"
                />
              </div>
            </div>
            <button type="submit" className="btn">
              Save Program
            </button>
          </form>
        </div>

        {/* Create Quota */}
        <div className="card">
          <h2>Allocate Quotas</h2>
          <form className="form-layout" onSubmit={submitQuota}>
            <div className="input-group">
              <label>Select Program</label>
              <select
                required
                value={quotaForm.programId}
                onChange={(e) =>
                  setQuotaForm({ ...quotaForm, programId: e.target.value })
                }
              >
                <option value="">-- Select Program --</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Max: {p.totalIntake})
                  </option>
                ))}
              </select>
            </div>
            <div className="grid-2">
              <div className="input-group">
                <label>Quota Name</label>
                <select
                  required
                  value={quotaForm.name}
                  onChange={(e) =>
                    setQuotaForm({ ...quotaForm, name: e.target.value })
                  }
                >
                  <option value="">-- Type --</option>
                  <option value="KCET">KCET (Govt)</option>
                  <option value="COMEDK">COMEDK</option>
                  <option value="Management">Management</option>
                </select>
              </div>
              <div className="input-group">
                <label>Allocated Seats</label>
                <input
                  required
                  type="number"
                  value={quotaForm.allocatedSeats}
                  onChange={(e) =>
                    setQuotaForm({
                      ...quotaForm,
                      allocatedSeats: e.target.value,
                    })
                  }
                  placeholder="45"
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn"
              style={{ background: "#10B981" }}
            >
              Lock Quota
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
