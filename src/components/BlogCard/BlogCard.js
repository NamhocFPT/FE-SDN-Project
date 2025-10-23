import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.scss';

const BlogCard = ({ blog }) => {
    // Định dạng lại ngày tháng cho dễ đọc
    const formattedDate = new Date(blog.publishedAt).toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <article className="blog-card">
            <Link to={`/blog/${blog.slug}`} className="blog-card__image-link">
                <img src={blog.coverImage} alt={blog.title} />
            </Link>
            <div className="blog-card__content">
                <p className="blog-card__meta">
                    <span>{formattedDate}</span>
                </p>
                <h3 className="blog-card__title">
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h3>
                <p className="blog-card__excerpt">
                    {blog.content.substring(0, 120)}...
                </p>
                <Link to={`/blog/${blog.slug}`} className="blog-card__read-more">
                    Đọc thêm →
                </Link>
            </div>
        </article>
    );
};

export default BlogCard;