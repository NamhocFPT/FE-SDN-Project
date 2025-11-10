import React, { useState, useEffect } from "react";
import "./FeedbackPage.scss";

export default function FeedbackPage() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userId = user?.id;

  //  Load đơn hàng của user
  useEffect(() => {
    if (!userId || !token) return;

    fetch(`http://localhost:9999/api/order/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch(() => setMessage("⚠️ Không thể tải danh sách đơn hàng."));
  }, [userId, token]);

  //  Gửi feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected) return alert("Hãy chọn món ăn để đánh giá!");

    setLoading(true);
    setMessage("");

    const res = await fetch("http://localhost:9999/api/feedbacks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderId: selected.orderId,
        foodId: selected.foodId,
        rating,
        comment,
      }),
    });

    if (res.ok) {
      setMessage("🎉 Cảm ơn bạn! Đánh giá của bạn đã được ghi nhận.");
      setSelected(null);
      setRating(5);
      setComment("");
    } else {
      const err = await res.json().catch(() => ({}));
      setMessage(
        `❌ Gửi phản hồi thất bại: ${err.message || "Vui lòng thử lại."}`
      );
    }
    setLoading(false);
  };

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        <h2>Đánh giá món ăn đã mua</h2>

        {message && (
          <p
            style={{
              textAlign: "center",
              color: message.startsWith("❌") ? "red" : "#007bff",
            }}
          >
            {message}
          </p>
        )}

        {!token ? (
          <p style={{ textAlign: "center", color: "red" }}>
            ⚠️ Vui lòng đăng nhập để gửi phản hồi.
          </p>
        ) : (
          <form className="feedback-form" onSubmit={handleSubmit}>
            <label>Chọn món ăn</label>
            <select
              value={selected ? JSON.stringify(selected) : ""}
              onChange={(e) =>
                setSelected(e.target.value ? JSON.parse(e.target.value) : null)
              }
            >
              <option value="">-- Chọn món trong đơn hàng --</option>
              {orders.flatMap((order) =>
                order.items?.map((item) => (
                  <option
                    key={`${order._id}-${item.foodId._id}`}
                    value={JSON.stringify({
                      orderId: order._id,
                      foodId: item.foodId._id,
                    })}
                  >
                    {item.foodId.name} — ({order.code})
                  </option>
                ))
              )}
            </select>

            <label>Đánh giá (sao)</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} sao
                </option>
              ))}
            </select>

            <label>Nhận xét</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Chia sẻ cảm nhận của bạn..."
              required
            />

            <div className="btn-group">
              <button type="submit" className="btn-update" disabled={loading}>
                {loading ? "Đang gửi..." : "Gửi phản hồi"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
