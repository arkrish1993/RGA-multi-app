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
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card p-4 shadow">
        <div className="card-header">
          <h2>Customer Login</h2>
        </div>
        <div className="card-body">
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
            <button type="submit" className="btn btn-primary mb-3">
              Login
            </button>
            <br />
            New User? <Link to="/register">Sign Up</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
