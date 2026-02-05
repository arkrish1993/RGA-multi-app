import api from "../api/api";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async e => {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    window.location.href = "/users";
  };

  return (
    <div className="container" style={{width:"60%"}}>
      <div className="card w-100">
        <div className="card-header">
          <h2 className="text-center">Admin Login</h2>
        </div>
        <div className="card-body">
          <form onSubmit={submit}>
            <input 
             placeholder="Email"
             className="form-control"
             type="email" 
             onChange={e => setEmail(e.target.value)} />
            <input 
            placeholder="Password" 
            type="password" 
            className="form-control"
            onChange={e => setPassword(e.target.value)}
            style={{marginTop: "1%"}} />
            <button className="btn btn-outline-success w-100" style={{marginTop: "1%"}}>Login</button>
          </form>
        </div>
      </div>

    </div>
    
  );
}
