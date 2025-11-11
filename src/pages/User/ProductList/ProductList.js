import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Import các hàm service cần thiết
import { getProductList, getCategoryList } from '../../../services/ProductService.js';

import ProductCard from '../../../components/ProductCard/ProductCard.js';
import './ProductList.scss';

// Component Phân trang đơn giản (giữ nguyên)
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pages = [...Array(totalPages).keys()].map(i => i + 1);

    return (
        <div className="pagination-controls">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &laquo; Trước
            </button>

            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={page === currentPage ? 'active' : ''}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Sau &raquo;
            </button>
        </div>
    );
};


const ProductList = () => {
    const [searchParams] = useSearchParams();
    const urlSearchTerm = searchParams.get('search') || '';

    // --- State Mới cho Lọc Category ---
    const [categories, setCategories] = useState([]);
    // State quản lý ID danh mục đang được chọn (null: Tất cả)
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    // --- State cũ cho Phân trang & Dữ liệu ---
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});

    // Xử lý chuyển trang
    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.totalPages) {
            setCurrentPage(page);
        }
    };

    // Xử lý khi nhấn nút lọc Category
    const handleCategoryClick = (categoryId) => {
        // Nếu nhấn vào category đang chọn, hủy chọn (trở về Tất cả)
        if (selectedCategoryId === categoryId) {
            setSelectedCategoryId(null);
        } else {
            setSelectedCategoryId(categoryId);
        }
        // Khi thay đổi bộ lọc, luôn quay về trang 1
        setCurrentPage(1);
    };

    // --- useEffect 1: Tải danh sách Categories (Chỉ chạy 1 lần) ---
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getCategoryList();
                setCategories(categoriesData);
            } catch (err) {
                console.error("Lỗi khi tải danh mục:", err);
            }
        };

        fetchCategories();
    }, []);


    // --- useEffect 2: Tải danh sách Sản phẩm (Chạy khi lọc/phân trang/tìm kiếm thay đổi) ---
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            const params = {
                page: currentPage,
                limit: limit,
            };

            // 🎯 Thêm tham số Tìm kiếm nếu có
            if (urlSearchTerm) {
                params.search = urlSearchTerm;
            }

            // 🎯 Thêm tham số Lọc Category nếu có
            if (selectedCategoryId) {
                params.categoryId = selectedCategoryId;
            }

            try {
                const result = await getProductList(params);

                setProducts(result.data);
                setPagination(result.pagination);

            } catch (err) {
                setError(err.message);
                console.error("Lỗi khi tải danh sách sản phẩm:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();

    }, [urlSearchTerm, currentPage, selectedCategoryId]); // ⬅️ Thêm selectedCategoryId vào dependency array


    // Thay đổi tiêu đề dựa trên lọc và tìm kiếm
    const categoryName = selectedCategoryId
        ? categories.find(c => c._id === selectedCategoryId)?.name
        : 'Tất Cả Món Ăn';

    const pageTitle = urlSearchTerm
        ? `Kết quả tìm kiếm cho: "${urlSearchTerm}"`
        : `Thực đơn: ${categoryName}`;


    // --- Render Giao diện ---
    if (error) {
        return <div className="product-list-page container"><div className="status-message error">Không thể tải dữ liệu: {error}</div></div>;
    }

    return (
        <div className="product-list-page container">
            <header className="page-header">
                <h1>{pageTitle}</h1>
                <p>
                    Đang hiển thị {products.length} trên {pagination.total || 0} món.
                </p>
            </header>

            {/* 🎯 KHỐI LỌC THEO CATEGORY */}
            <section className="category-filter-list">
                {/* Nút "Tất cả" */}
                <div
                    className={`category-filter-item ${selectedCategoryId === null ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(null)}
                >
                    Tất cả
                </div>

                {/* Danh sách các danh mục */}
                {Array.isArray(categories) && categories.map(category => (
                    <div
                        key={category._id}
                        onClick={() => handleCategoryClick(category._id)}
                        className={`category-filter-item ${selectedCategoryId === category._id ? 'active' : ''}`}
                    >
                        {category.name}
                    </div>
                ))}
            </section>

            {/* --- Danh sách Sản phẩm và Loading --- */}
            {loading ? (
                <div className="status-message">Đang tải danh sách sản phẩm...</div>
            ) : (
                <>
                    <div className="product-grid">
                        {Array.isArray(products) && products.map(product => (
                            <ProductCard key={product._id} food={product} />
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div className="status-message">Không tìm thấy sản phẩm nào.</div>
                    )}

                    {/* Render Pagination Controls */}
                    {pagination.totalPages > 1 && (
                        <Pagination
                            totalPages={pagination.totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default ProductList;