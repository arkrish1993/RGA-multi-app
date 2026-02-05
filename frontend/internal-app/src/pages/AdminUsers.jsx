import { useEffect, useState } from "react";
import api from "../api/api";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
   try{
      const res = await api.get("/admin/users");
      setUsers(res.data);
   
   } catch(err) {
      console.log(err.message);
   } finally {
       setLoading(false);
   }

  };

  useEffect(() => { load(); }, []);

  const toggle = async (id) => {
    await api.put(`/admin/users/${id}/toggle-status`);
    load();
  };

  return (
    <>
      <div>
        <AdminNavbar/>
        <h2 className="text-center">Customer Management</h2>
        {loading && (
          <div className="alert alert-secondary">
            Loading Customers...........
          </div>
        )}

        {!loading && users.length === 0 && (
          <div className="alert alert-info">
            No Customers Found
          </div>
        )}

        {!loading && users.length > 0 && (
          <table className="table table-striped table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.email}</td>
                  <td>
                    <span
                    className={`badge ${u.isActive ? "bg-success" : "bg-danger"}`}>
                      {u.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button className={`btn btn-sm ${u.isActive ? "btn-warning" : "btn-success"}`}
                    onClick={() => toggle(u._id)}>
                      {u.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      
      </div>
    </>
  );
}
