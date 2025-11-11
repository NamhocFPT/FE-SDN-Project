import React, { useEffect, useState } from "react";
import { get, dele, put } from "../../../ultils/request";
import './OrderListPage.scss';

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await get("admin/orders");
        setOrders(res?.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await dele(`admin/orders`, id);
      setOrders(prev => prev.filter(order => order._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed!");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await put(`admin/orders/${id}/status`, { status });
      setOrders(prev => prev.map(order => order._id === id ? { ...order, status } : order));
    } catch (err) {
      console.error(err);
      alert("Update status failed!");
    }
  };

  return (
    <div className="order-list-page">
      <h1 className="page-title">Orders</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.code}</td>
              <td>{order.userId?.fullName || "N/A"}</td>
              <td>{order.userId?.phone || "N/A"}</td>
              <td>{order.amounts.grandTotal.toLocaleString()} VND</td>
              <td>{order.status}</td>
              <td className="actions">
                <button onClick={() => handleStatusChange(order._id, "paid")}>Paid</button>
                <button onClick={() => handleStatusChange(order._id, "pending")}>Pending</button>
                <button onClick={() => handleDelete(order._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderListPage;
