import { useEffect, useState } from "react";
import api from "../api/api";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        name: "",
        price: 0,
        stock: 0
    });

    const [editingId, setEditingId] = useState(null);

    const loadProducts = async() => {
        const res = await api.get("/products");
        setProducts(res.data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const submit = async(e) => {
        e.preventDefault();

        if(editingId) {
            await api.put(`/products/${editingId}`, form);
        } else {
            await api.post("/products", form);
        }

        setForm({name: "", price: 0, stock: 0})
        setEditingId(null);
        loadProducts();
    }

    const editProduct = (p) => {
        setEditingId(p._id);
        setForm({
            name: p.name,
            price: p.price,
            stock: p.stock
        });
    }

    return(
        <>
            <AdminNavbar/>
            <div>
                <h3 className="text-center">Product Management</h3>

                <div>
                    <form className="card card-body" onSubmit={submit}>
                        <div className="row">
                            <div className="col">
                                <input 
                                    className="form-control"
                                    placeholder="Product Name"
                                    value={form.value}
                                    onChange={(e) => setForm({...form, name: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="col">
                                <input 
                                    className="form-control"
                                    placeholder="Price"
                                    type="number"
                                    value={form.value}
                                    onChange={(e) => setForm({...form, price: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="col">
                                <input 
                                    className="form-control"
                                    placeholder="Stock"
                                    type="number"
                                    value={form.value}
                                    onChange={(e) => setForm({...form, stock: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="col">
                                <button className="btn btn-primary w-100">
                                    {editingId ? "Update": "Add"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td className="text-center text-muted" colSpan="4">
                                        No Products Available. Please Add.
                                    </td>
                                </tr>
                            ): (
                                products.map((p) => (
                                    <tr key={p._id}>
                                        <td>{p.name}</td>
                                        <td>{p.price}</td>
                                        <td>{p.stock}</td>
                                        <td>
                                            <button className="btn btn-warning" onClick={() => editProduct(p)}>Edit</button>
                                            <button className="btn btn-danger" style={{marginLeft: "2%"}}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
