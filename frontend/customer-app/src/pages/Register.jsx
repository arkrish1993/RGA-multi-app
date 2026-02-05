import api from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const role = "CUSTOMER";

      await api.post("/auth/register", { email, password, role });
      alert("Registered Successfully. Please login.");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Registration Failed.");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Register</button>
    </form>
  );
}
