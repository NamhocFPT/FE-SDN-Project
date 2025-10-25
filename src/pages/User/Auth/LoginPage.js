import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.scss";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      const found = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (found) {
        localStorage.setItem("user", JSON.stringify(found));
        setIsSuccess(true);
        setMessage("✅ Đăng nhập thành công!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setIsSuccess(false);
        setMessage("❌ Sai email hoặc mật khẩu!");
      }
    } catch {
      setIsSuccess(false);
      setMessage("⚠️ Lỗi kết nối server!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Đăng nhập</h2>

        {message && (
          <div className={`message ${isSuccess ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
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
            placeholder="Nhập mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-primary">Đăng nhập</button>
        </form>

        <div className="auth-links">
          <p onClick={() => navigate("/forgot")} className="link">Quên mật khẩu?</p>
          <p>
            Chưa có tài khoản?{" "}
            <span className="link" onClick={() => navigate("/register")}>Đăng ký</span>
          </p>
        </div>
      </div>
    </div>
  );
}
