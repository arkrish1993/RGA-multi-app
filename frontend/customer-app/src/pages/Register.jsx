import { useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (confirm !== form.password) {
      alert("Password must match");
      return;
    }
    try {
      await api.post("/auth/register", { ...form, role: "CUSTOMER" });
      alert("Registered Successfully. Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration Failed.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow">
        <div className="card-header bg-primary bg-gradient text-light p-3 text-center">
          <h2>Sign up</h2>
        </div>
        <div className="card-body mt-3">
          <form onSubmit={submit}>
            <div>
              <input
                className="form-control mb-2"
                placeholder="Email"
                type="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <input
                className="form-control mb-2"
                placeholder="Password"
                type="password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div>
              <input
                className="form-control mb-2"
                placeholder="Confirm Password"
                type="password"
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
            <div>
              <button
                className="btn btn btn-outline-success w-100 mt-3"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-5 text-center">
            Already a user? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
