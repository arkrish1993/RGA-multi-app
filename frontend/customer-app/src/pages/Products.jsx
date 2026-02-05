import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addToCart = async (p) => {
    const temp = [...cart];
    const findIndex = temp.findIndex((i) => i._id === p._id);
    if (findIndex !== -1) {
      temp[findIndex].quantity = temp[findIndex].quantity + 1;
    } else {
      temp.push({
        ...p,
        quantity: 1,
      });
    }
    setCart(temp);
  };

  const removeFromCart = (p) => {
    const temp = [...cart];
    const findIndex = temp.findIndex((i) => i._id == p._id);
    temp.splice(findIndex, 1);
    setCart(temp);
  };

  const placeOrder = () => {
    console.log(cart);
  };

  return (
    <>
      <Navbar />
      <div>
        <h3 className="text-center">Product Catalog</h3>
        <div>
          <table className="table table-bordered table-striped table-hover w-100">
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
                        onClick={() => addToCart(p)}
                      >
                        Add To Cart
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {cart.length > 0 && (
          <div>
            <h4>Cart</h4>
            <ul className="list-group">
              {cart.map((p) => (
                <div className="d-flex" key={p._id}>
                  <li className="list-group-item w-25">{`${p.name} : ${p.quantity}`}</li>
                  <button
                    className="btn btn-danger w-10"
                    onClick={() => removeFromCart(p)}
                  >
                    X
                  </button>
                </div>
              ))}
            </ul>
            <button className="btn btn-primary" onClick={() => placeOrder()}>
              Place order
            </button>
          </div>
        )}
      </div>
    </>
  );
}
