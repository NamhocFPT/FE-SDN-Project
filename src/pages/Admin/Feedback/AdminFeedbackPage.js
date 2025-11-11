import React, { useEffect, useState } from "react";
import "./AdminFeedbackPage.scss";

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState("");
  const [avgRating, setAvgRating] = useState(0);

  //  Load danh sách feedbacks
  const loadFeedbacks = async () => {
    try {
      const res = await fetch("http://localhost:9999/api/feedbacks");
      if (!res.ok) throw new Error("Không thể tải dữ liệu");
      const data = await res.json();
      setFeedbacks(Array.isArray(data) ? data : []);

      //  Tính rating trung bình
      if (Array.isArray(data) && data.length > 0) {
        const avg =
          data.reduce((sum, f) => sum + (f.rating || 0), 0) / data.length;
        setAvgRating(avg.toFixed(1));
      } else {
        setAvgRating(0);
      }
    } catch (err) {
      console.error("❌ Lỗi khi tải feedback:", err);
      setMessage("⚠️ Không thể tải danh sách phản hồi!");
    }
  };

  //  Xóa feedback
  const handleDelete = async (id) => {
  if (!window.confirm("Xóa phản hồi này?")) return;

  const token = localStorage.getItem("token"); // ✅ lấy token admin từ localStorage

  const res = await fetch(`http://localhost:9999/api/feedbacks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ gửi token xác thực
    },
  });

  if (res.ok) {
    alert("🗑️ Đã xóa feedback thành công!");
    loadFeedbacks();
  } else {
    const err = await res.json().catch(() => ({}));
    alert(` Xóa thất bại: ${err.message || "Không có quyền hoặc token hết hạn"}`);
  }
};


  useEffect(() => {
    loadFeedbacks();
  }, []);

  return (
    <div className="admin-feedback-page">
      <div className="admin-feedback-container">
        <h2>📋 Quản lý Feedback</h2>

        {/* Thông báo */}
        {message && (
          <p
            className={`message ${message.startsWith("❌") ? "error" : "success"}`}
          >
            {message}
          </p>
        )}

        {/* Thống kê */}
        <div className="stats-bar">
          <div className="stat-item">
            <h3>{feedbacks.length}</h3>
            <p>Tổng phản hồi</p>
          </div>
          <div className="stat-item">
            <h3>{avgRating}★</h3>
            <p>Điểm trung bình</p>
          </div>
        </div>

        {/* Bảng Feedback */}
        {feedbacks.length === 0 ? (
          <p className="no-data">Chưa có phản hồi nào.</p>
        ) : (
          <table className="feedback-table">
            <thead>
              <tr>
                <th>Người dùng</th>
                <th>Món ăn</th>
                <th>Đơn hàng</th>
                <th>Đánh giá</th>
                <th>Nhận xét</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((f) => (
                <tr key={f._id}>
                  <td>{f.userId?.email || "Ẩn danh"}</td>
                  <td>{f.foodId?.name || "Không rõ"}</td>
                  <td>{f.orderId?.code || "N/A"}</td>
                  <td>{f.rating}★</td>
                  <td>{f.comment}</td>
                  <td>{new Date(f.createdAt).toLocaleString("vi-VN")}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(f._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
