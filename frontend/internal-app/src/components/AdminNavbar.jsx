import { Link, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    }

    return(
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="container-fluid">
                <span className="navbar-brand">Admin Portal</span>

                <div className="navbar-nav">
                    <Link to="/users" className="nav-link">Users</Link>
                    <Link to="/products" className="nav-link">Products</Link>
                    <button className="btn btn-sm btn-outline-light"
                    onClick={logout}>Logout</button>
                </div>
            </div>

        </nav>
    )
}