import { Link } from "react-router-dom";
import api from "../api/api";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    window.location.href = "/products";
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow">
        <div className="card-header bg-primary bg-gradient text-light p-3 text-center">
          <h2>Sign in</h2>
        </div>
        <div className="card-body mt-3">
          <form onSubmit={submit}>
            <input
              placeholder="Email"
              type="text"
              className="form-control"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <br />
            <input
              placeholder="Password"
              type="password"
              className="form-control"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <br />
            <button
              type="submit"
              className="btn btn btn-outline-success w-100 mt-3"
            >
              Login
            </button>
            <br />
            <div className="mt-5 text-center">
              New User? <Link to="/register">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
