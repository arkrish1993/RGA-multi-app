import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminUsers from "./pages/AdminUsers";
import AdminNavbar from "./components/AdminNavbar";
import AdminProducts from "./pages/AdminProducts";

export default function App() {
  const loggedIn = !!localStorage.getItem("token");

  if(!loggedIn) return <Login/>

  return (
    <>
    
      {/* <AdminNavbar/> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/products" element={<AdminProducts />} />
        </Routes>
      </div>
      
    </>
    
  );
}
