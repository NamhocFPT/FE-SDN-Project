import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <div className="not-found-page__container">
                <h1 className="not-found-page__title">404</h1>
                <h2 className="not-found-page__subtitle">Oops! Trang không tồn tại.</h2>
                <p className="not-found-page__description">
                    Có vẻ như bạn đã đi lạc. Đường dẫn bạn đang tìm kiếm không có ở đây.
                </p>
                <Link to="/" className="not-found-page__button">
                    Quay Về Trang Chủ
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;