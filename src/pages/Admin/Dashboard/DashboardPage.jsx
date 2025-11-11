import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import './DashboardPage.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    // 1. Lấy orders
    axios.get("http://localhost:9999/api/admin/orders")
      .then(async res => {
        const orders = res.data.data;

        // 2. Lấy tất cả orderDetails
        const orderIds = orders.map(o => o._id);
        const detailsRes = await axios.get("http://localhost:9999/api/admin/orders/orderdetails"); // backend trả tất cả orderDetails
        const allDetails = detailsRes.data.data;

        // Filter details theo orders
        const orderDetails = allDetails.filter(od => orderIds.includes(od.orderId));

        // 3. Revenue by day
        const revenueByDay = {};
        orders.forEach(o => {
          const date = new Date(o.createdAt).toISOString().slice(0, 10);
          if (!revenueByDay[date]) revenueByDay[date] = { totalRevenue: 0, totalOrders: 0 };
          revenueByDay[date].totalRevenue += o.amounts?.grandTotal || 0;
          revenueByDay[date].totalOrders += 1;
        });

        // 4. Top products
        const productMap = {};
        orderDetails.forEach(od => {
          if (!productMap[od.name]) productMap[od.name] = { totalQuantity: 0, totalRevenue: 0 };
          productMap[od.name].totalQuantity += od.quantity;
          productMap[od.name].totalRevenue += od.lineTotal;
        });

        // 5. Order status count
        const statusCount = { paid: 0, pending: 0, canceled: 0 };
        orders.forEach(o => {
          statusCount[o.status] = (statusCount[o.status] || 0) + 1;
        });

        setSummary({
          revenueByDay: Object.entries(revenueByDay).map(([date, val]) => ({ date, ...val })),
          topProducts: Object.entries(productMap).map(([name, val]) => ({ name, ...val })),
          totalProductsSold: Object.values(productMap).reduce((a, b) => a + b.totalQuantity, 0),
          totalPaidOrders: statusCount.paid,
          totalPendingOrders: statusCount.pending,
          totalCanceledOrders: statusCount.canceled,
        });
      })
      .catch(err => console.error(err));
  }, []);

  if (!summary) return <div className="loading">Loading...</div>;

  // Line chart: Revenue
  const revenueData = {
    labels: summary.revenueByDay.map(r => r.date),
    datasets: [{
      label: "Revenue (VND)",
      data: summary.revenueByDay.map(r => r.totalRevenue),
      borderColor: "#111",
      backgroundColor: "#444",
      tension: 0.3,
    }],
  };

  // Bar chart: Top products
  const productData = {
    labels: summary.topProducts.map(p => p.name),
    datasets: [{
      label: "Quantity Sold",
      data: summary.topProducts.map(p => p.totalQuantity),
      backgroundColor: "#111",
    }],
  };

  // Pie chart: Order status
  const orderStatusData = {
    labels: ["Paid", "Pending", "Canceled"],
    datasets: [{
      label: "Orders",
      data: [
        summary.totalPaidOrders || 0,
        summary.totalPendingOrders || 0,
        summary.totalCanceledOrders || 0,
      ],
      backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
    }],
  };

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h2>Total Products Sold</h2>
          <p>{summary.totalProductsSold}</p>
        </div>
        <div className="card">
          <h2>Total Revenue</h2>
          <p>{summary.revenueByDay.reduce((a,b)=>a+b.totalRevenue,0).toLocaleString()} VND</p>
        </div>
        <div className="card">
          <h2>Total Orders</h2>
          <p>{summary.revenueByDay.reduce((a,b)=>a+b.totalOrders,0)}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h2>Revenue by Day</h2>
          <Line data={revenueData} />
        </div>
        <div className="chart-card">
          <h2>Top Products Sold</h2>
          <Bar data={productData} />
        </div>
        <div className="chart-card">
          <h2>Orders Status</h2>
          <Pie data={orderStatusData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
