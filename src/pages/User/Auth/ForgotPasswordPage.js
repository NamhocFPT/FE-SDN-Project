import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.scss";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: email, 2: mã, 3: mật khẩu
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let t;
    if (timer > 0) t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  // Bước 1: Gửi mã
  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setMessage("Email không hợp lệ!");
      setIsSuccess(false);
      return;
    }
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(randomCode);
    setStep(2);
    setTimer(60);
    setIsSuccess(true);
    setMessage(`Mã xác nhận đã được gửi tới email (code demo: ${randomCode})`);
  };

  // Bước 2: Xác nhận mã
  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (code === generatedCode) {
      setStep(3);
      setMessage("Mã hợp lệ! Hãy nhập mật khẩu mới.");
      setIsSuccess(true);
    } else {
      setMessage("Mã xác nhận không đúng!");
      setIsSuccess(false);
    }
  };

  // Bước 3: Đặt lại mật khẩu
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setMessage("Mật khẩu phải từ 6 ký tự trở lên!");
      setIsSuccess(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp!");
      setIsSuccess(false);
      return;
    }
    setIsSuccess(true);
    setMessage("Đặt lại mật khẩu thành công! Chuyển hướng sau 2s...");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Quên mật khẩu</h2>

        {message && (
          <div className={`message ${isSuccess ? "success" : "error"}`}>
            {message}
          </div>
        )}

        {/* Bước 1: Nhập email */}
        {step === 1 && (
          <form onSubmit={handleSendCode} className="auth-form">
            <label>Nhập email đăng ký:</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">
              Gửi mã xác nhận
            </button>
          </form>
        )}

        {/* Bước 2: Nhập mã xác nhận */}
        {step === 2 && (
          <form onSubmit={handleVerifyCode} className="auth-form">
            <label>Nhập mã xác nhận:</label>
            <input
              type="text"
              placeholder="Nhập mã 6 chữ số"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />

            <div className="btn-row">
              <button type="submit" className="btn-primary">Xác nhận mã</button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setStep(1)}
              >
                Nhập lại email
              </button>
            </div>

            <button
              type="button"
              className="resend-btn"
              disabled={timer > 0}
              onClick={handleSendCode}
            >
              {timer > 0 ? `Gửi lại mã (${timer}s)` : "Gửi lại mã"}
            </button>
          </form>
        )}

        {/* Bước 3: Đặt lại mật khẩu */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="auth-form">
            <label>Mật khẩu mới:</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <label>Xác nhận mật khẩu:</label>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit" className="btn-primary">
              Cập nhật mật khẩu
            </button>
          </form>
        )}

        <p style={{ marginTop: 15 }}>
          <span className="link" onClick={() => navigate("/login")}>
            Quay lại đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
}
