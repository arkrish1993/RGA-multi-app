import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const load = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };

  useEffect(() => { load(); }, []);

  const toggle = async id => {
    await api.put(`/admin/users/${id}/toggle-status`);
    load();
  };

  return (
    <div>
      <h2>Users</h2>
      {users.map(u => (
        <div key={u._id}>
          {u.email} - {u.isActive ? "Active" : "Inactive"}
          <button onClick={() => toggle(u._id)}>Toggle</button>
        </div>
      ))}
    </div>
  );
}
