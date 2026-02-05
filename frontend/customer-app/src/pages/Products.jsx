import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    stock: 0,
  });

  const [editingId, setEditingId] = useState(null);

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // const submit = async (e) => {
  //   e.preventDefault();

  //   if (editingId) {
  //     await api.put(`/products/${editingId}`, form);
  //   } else {
  //     await api.post("/products", form);
  //   }

  //   setForm({ name: "", price: 0, stock: 0 });
  //   setEditingId(null);
  //   loadProducts();
  // };

  const placeOrder = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name,
      price: p.price,
      stock: p.stock,
    });
  };

  return (
    <>
      <Navbar />
      <div>
        <h3 className="text-center">Product Catalog</h3>
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
                    No Products Available.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.stock}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => buyProduct(p)}
                      >
                        Place order
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
