import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const res = await api.get("/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mx-3">
        <h3 className="text-center my-3">Order History</h3>
        <div>
          <table className="table table-primary table-striped table-hover w-100">
            <thead className="table-dark">
              <tr>
                <th>Items</th>
                <th className="text-center">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td className="text-center text-muted" colSpan="4">
                    No Orders Placed.
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr className="inline" key={o._id}>
                    <td className="align-middle">
                      <ul>
                        {o.items.map((item) => (
                          <li
                            key={item._id}
                            className="list-group-item align-middle"
                          >{`${item.name} (Rs.${item.price} per item) : ${item.quantity}`}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="text-center align-middle">
                      {o.totalAmount}
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
