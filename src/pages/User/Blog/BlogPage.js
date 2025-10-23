import React, { useState, useEffect } from 'react';
import { getBlogList, getBlogCategoryList } from '../../../services/BlogService';
import BlogCard from '../../../components/BlogCard/BlogCard';
import './BlogPage.scss';

const BlogPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [allBlogs, setAllBlogs] = useState([]); // Lưu trữ tất cả blog gốc
    const [filteredBlogs, setFilteredBlogs] = useState([]); // Blog để hiển thị (sau khi lọc)
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all'); // Lưu ID của category đang được chọn

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const [blogsRes, categoriesRes] = await Promise.all([
                    getBlogList(),
                    getBlogCategoryList()
                ]);

                setAllBlogs(blogsRes);
                setFilteredBlogs(blogsRes); // Ban đầu hiển thị tất cả
                setCategories(categoriesRes);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogData();
    }, []);

    const handleFilterCategory = (categoryId) => {
        setSelectedCategory(categoryId);
        if (categoryId === 'all') {
            setFilteredBlogs(allBlogs);
        } else {
            const filtered = allBlogs.filter(blog => blog.blogCategoryId === categoryId);
            setFilteredBlogs(filtered);
        }
    };

    if (loading) return <div className="status-message">Đang tải trang Blog...</div>;
    if (error) return <div className="status-message error">Lỗi: {error}</div>;

    return (
        <div className="blog-page">
            <header className="blog-page__header">
                <h1>Tin Tức & Khuyến Mãi</h1>
                <p>Cập nhật những thông tin và ưu đãi mới nhất từ chúng tôi.</p>
            </header>
            <div className="blog-page__container">
                {/* Sidebar */}
                <aside className="blog-page__sidebar">
                    <h4>Danh Mục</h4>
                    <ul>
                        <li 
                            className={selectedCategory === 'all' ? 'active' : ''}
                            onClick={() => handleFilterCategory('all')}
                        >
                            Tất cả bài viết
                        </li>
                        {categories.map(cat => (
                            <li 
                                key={cat._id}
                                className={selectedCategory === cat._id ? 'active' : ''}
                                onClick={() => handleFilterCategory(cat._id)}
                            >
                                {cat.name}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="blog-page__main-content">
                    {filteredBlogs.length > 0 ? (
                        <div className="blog-grid">
                            {filteredBlogs.map(blog => (
                                <BlogCard key={blog._id} blog={blog} />
                            ))}
                        </div>
                    ) : (
                        <p>Không có bài viết nào trong danh mục này.</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default BlogPage;