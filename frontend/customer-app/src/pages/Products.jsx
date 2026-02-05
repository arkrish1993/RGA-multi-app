import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function Products() {
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

  const placeOrder = async () => {
    const totalAmount = cart.reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.quantity * currentItem.price,
      0,
    );
    try {
      await api.post(`/orders`, {
        items: cart,
        totalAmount,
      });
      alert("Order placed successfully.");
      setCart([]);
      loadProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-3">
        <h3 className="text-center my-3">Product Catalog</h3>
        <div style={{ maxHeight: "50vh" }}>
          <table className="table table-primary table-striped table-hover w-100">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th className="text-center">Price</th>
                <th className="text-center">Stock</th>
                <th className="text-center">Actions</th>
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
                  <tr className="inline" key={p._id}>
                    <td className="align-middle">{p.name}</td>
                    <td className="text-center align-middle">{`Rs.${p.price}`}</td>
                    <td className="text-center align-middle">{p.stock}</td>
                    <td className="text-center align-middle">
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
            <h4 className="mt-5">Cart</h4>
            <ul className="list-group">
              {cart.map((p) => (
                <ul className="d-flex p-0" key={p._id}>
                  <li className="list-group-item w-50">{`${p.name} (Rs.${p.price} per item) : ${p.quantity}`}</li>
                  <button
                    className="btn btn-outline-danger w-10"
                    onClick={() => removeFromCart(p)}
                  >
                    X
                  </button>
                </ul>
              ))}
            </ul>
            <button
              className="btn btn-primary mt-3"
              onClick={() => placeOrder()}
            >
              Place order
            </button>
          </div>
        )}
      </div>
    </>
  );
}
