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
      <div className="card p-4 shadow">
        <div className="card-header bg-primary text-light">
          <h2>Register</h2>
        </div>
        <div className="card-body">
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
              <button className="btn btn-success" type="submit">
                Register
              </button>
            </div>
          </form>

          <p className="mt-3 text-center">
            Already Registered? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
