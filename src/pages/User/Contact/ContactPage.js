import React from 'react';
import './ContactPage.scss';

const ContactPage = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic gửi form (ví dụ: gọi API,...)
        alert('Cảm ơn bạn đã gửi liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!');
    };

    return (
        <div className="contact-page">
            <header className="contact-page__header">
                <h1>Liên Hệ Với Chúng Tôi</h1>
                <p>Chúng tôi luôn sẵn lòng lắng nghe bạn. Vui lòng điền vào biểu mẫu dưới đây.</p>
            </header>

            <div className="contact-page__container">
                {/* Phần Form Liên Hệ */}
                <main className="contact-page__form-section">
                    <h3>Gửi Tin Nhắn</h3>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Họ và Tên</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Chủ đề</label>
                            <input type="text" id="subject" name="subject" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Nội dung</label>
                            <textarea id="message" name="message" rows="6" required></textarea>
                        </div>
                        <button type="submit" className="form-button">Gửi đi</button>
                    </form>
                </main>

                {/* Phần Thông Tin Liên Hệ */}
                <aside className="contact-page__info-section">
                    <h3>Thông Tin Liên Hệ</h3>
                    <p>Bạn cũng có thể liên hệ trực tiếp với chúng tôi qua các thông tin dưới đây:</p>
                    <ul className="info-list">
                        <li className="info-item">
                            <span className="info-icon">📍</span>
                            <div className="info-text">
                                <strong>Địa chỉ:</strong>
                                <p>Sơn Tây, Hà Nội, Việt Nam</p>
                            </div>
                        </li>
                        <li className="info-item">
                            <span className="info-icon">📞</span>
                            <div className="info-text">
                                <strong>Điện thoại:</strong>
                                <p>(+84) 123 456 789</p>
                            </div>
                        </li>
                        <li className="info-item">
                            <span className="info-icon">📧</span>
                            <div className="info-text">
                                <strong>Email:</strong>
                                <p>support@myeshop.com</p>
                            </div>
                        </li>
                        <li className="info-item">
                            <span className="info-icon">🕒</span>
                            <div className="info-text">
                                <strong>Giờ làm việc:</strong>
                                <p>Thứ 2 - Chủ Nhật: 8:00 - 22:00</p>
                            </div>
                        </li>
                    </ul>
                </aside>
            </div>

            {/* Phần Bản Đồ */}
            <section className="contact-page__map-section">
                <h3>Tìm Chúng Tôi Trên Bản Đồ</h3>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119098.85960417641!2d105.31686121434257!3d21.13968393539825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134593416b23363%3A0x628004f7b203c9b7!2zU8ahbiBUw6J5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1729501300731!5m2!1svi!2s" 
                    width="100%" 
                    height="450" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps Location"
                ></iframe>
            </section>
        </div>
    );
};

export default ContactPage;