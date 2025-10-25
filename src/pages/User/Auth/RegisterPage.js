import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.scss";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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
      const res = await fetch("http://localhost:9999/users");
      const users = await res.json();
      if (users.find((u) => u.email === formData.email)) {
        setIsSuccess(false);
        setMessage("⚠️ Email đã tồn tại!");
        return;
      }

      await fetch("http://localhost:9999/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setIsSuccess(true);
      setMessage("✅ Đăng ký thành công! Chuyển hướng sau 2s...");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setIsSuccess(false);
      setMessage("⚠️ Lỗi kết nối server!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Đăng ký</h2>

        {message && (
          <div className={`message ${isSuccess ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Họ tên:</label>
          <input type="text" name="name" placeholder="Nhập họ tên" value={formData.name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" placeholder="Nhập email" value={formData.email} onChange={handleChange} required />

          <label>Mật khẩu:</label>
          <input type="password" name="password" placeholder="Tạo mật khẩu" value={formData.password} onChange={handleChange} required />

          <button type="submit" className="btn-primary">Đăng ký</button>
        </form>

        <p>
          Đã có tài khoản?{" "}
          <span className="link" onClick={() => navigate("/login")}>Đăng nhập</span>
        </p>
      </div>
    </div>
  );
}
