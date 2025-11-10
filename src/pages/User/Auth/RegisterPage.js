import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.scss";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:9999/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setMessage(" Đăng ký thành công! Chuyển hướng sau 2s...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setIsSuccess(false);
        setMessage(` ${data.message || "Lỗi đăng ký!"}`);
      }
    } catch {
      setIsSuccess(false);
      setMessage(" Lỗi kết nối server!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Đăng ký tài khoản</h2>

        {message && (
          <div className={`message ${isSuccess ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Họ và tên:</label>
          <input
            type="text"
            name="fullName"
            placeholder="Nhập họ tên của bạn"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Nhập email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Mật khẩu:</label>
          <input
            type="password"
            name="password"
            placeholder="Tạo mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-primary">
            Đăng ký
          </button>
        </form>

        <p>
          Đã có tài khoản?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Đăng nhập
          </span>
        </p>
        <p onClick={() => navigate("/")} className="link">
          ⬅️ Về trang chủ
        </p>
      </div>
    </div>
  );
}
