import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container-fluid">
        <span className="navbar-brand">Customer Portal</span>

        <div className="navbar-nav">
          <Link to="/products" className="nav-link">
            Products
          </Link>
          <Link to="/orders" className="nav-link">
            Orders
          </Link>
          <button className="btn btn-sm btn-outline-light" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
