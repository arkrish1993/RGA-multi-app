import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminUsers from "./pages/AdminUsers";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<AdminUsers />} />
    </Routes>
  );
}
