import React, { useState, useEffect } from 'react';
import './EditFoodModal.scss';

const EditFoodModal = ({ food, categories, onSave, onCancel, isOpen }) => {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        categoryId: '',
        price: '',
        salePrice: '',
        currency: 'VND',
        images: [],
        tags: [],
        inStock: true,
        description: ''
    });

    const [newTag, setNewTag] = useState('');
    const [newImage, setNewImage] = useState('');

    useEffect(() => {
        if (food && isOpen) {
            setFormData({
                name: food.name || '',
                slug: food.slug || '',
                categoryId: food.categoryId || '',
                price: food.price || '',
                salePrice: food.salePrice || '',
                currency: food.currency || 'VND',
                images: food.images || [],
                tags: food.tags || [],
                inStock: food.inStock !== undefined ? food.inStock : true,
                description: food.description || ''
            });
        }
    }, [food, isOpen]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleNameChange = (e) => {
        const name = e.target.value;
        setFormData(prev => ({
            ...prev,
            name,
            slug: generateSlug(name)
        }));
    };

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    };

    const handleAddTag = (e) => {
        e.preventDefault();
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleAddImage = (e) => {
        e.preventDefault();
        if (newImage.trim() && !formData.images.includes(newImage.trim())) {
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, newImage.trim()]
            }));
            setNewImage('');
        }
    };

    const handleRemoveImage = (imageToRemove) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter(img => img !== imageToRemove)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.categoryId || !formData.price) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        const updatedFood = {
            ...formData,
            price: parseInt(formData.price),
            salePrice: formData.salePrice ? parseInt(formData.salePrice) : null,
            images: formData.images.filter(img => img.trim() !== ''),
            updatedAt: new Date().toISOString()
        };

        onSave(updatedFood);
    };

    if (!isOpen) return null;

    return (
        <div className="edit-food-modal-overlay">
            <div className="edit-food-modal">
                <div className="modal-header">
                    <h3>Chỉnh sửa món ăn</h3>
                    <button 
                        type="button" 
                        className="close-btn"
                        onClick={onCancel}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="edit-food-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Tên món ăn *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleNameChange}
                                required
                                placeholder="Nhập tên món ăn"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="slug">Slug</label>
                            <input
                                type="text"
                                id="slug"
                                name="slug"
                                value={formData.slug}
                                onChange={handleInputChange}
                                placeholder="Tự động tạo từ tên món"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="categoryId">Danh mục *</label>
                            <select
                                id="categoryId"
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Chọn danh mục</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="currency">Tiền tệ</label>
                            <select
                                id="currency"
                                name="currency"
                                value={formData.currency}
                                onChange={handleInputChange}
                            >
                                <option value="VND">VND</option>
                                <option value="USD">USD</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="price">Giá *</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                                placeholder="Nhập giá"
                                min="0"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="salePrice">Giá sale</label>
                            <input
                                type="number"
                                id="salePrice"
                                name="salePrice"
                                value={formData.salePrice}
                                onChange={handleInputChange}
                                placeholder="Nhập giá sale (tùy chọn)"
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Hình ảnh</label>
                        <div className="image-input">
                            <div className="add-image">
                                <input
                                    type="url"
                                    value={newImage}
                                    onChange={(e) => setNewImage(e.target.value)}
                                    placeholder="Nhập URL hình ảnh"
                                />
                                <button type="button" onClick={handleAddImage}>
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                            <div className="image-list">
                                {formData.images.filter(img => img.trim() !== '').map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image} alt={`Image ${index + 1}`} />
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveImage(image)}
                                            className="remove-image"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Tags</label>
                        <div className="tag-input">
                            <div className="add-tag">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="Nhập tag"
                                />
                                <button type="button" onClick={handleAddTag}>
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                            <div className="tag-list">
                                {formData.tags.map((tag, index) => (
                                    <span key={index} className="tag">
                                        {tag}
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveTag(tag)}
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Mô tả</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Nhập mô tả món ăn"
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="inStock"
                                checked={formData.inStock}
                                onChange={handleInputChange}
                            />
                            <span>Còn hàng</span>
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="btn btn-secondary">
                            Hủy
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Cập nhật món ăn
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditFoodModal;
