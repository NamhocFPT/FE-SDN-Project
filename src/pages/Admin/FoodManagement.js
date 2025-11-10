import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFoodList, createFood, updateFood, deleteFood } from '../../services/FoodService';
import { getCategoryList } from '../../services/ProductService';
import AddFoodForm from './AddFoodForm';
import EditFoodModal from './EditFoodModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import './FoodManagement.scss';

const FoodManagement = () => {
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editingFood, setEditingFood] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [deletingFood, setDeletingFood] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [foodsData, categoriesData] = await Promise.all([
                getFoodList(),
                getCategoryList()
            ]);
            setFoods(foodsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddFood = (newFood) => {
        setFoods([...foods, newFood]);
        setShowAddForm(false);
    };

    const handleEditFood = (food) => {
        setEditingFood(food);
        setShowEditModal(true);
    };

    const handleUpdateFood = (updatedFood) => {
        setFoods(foods.map(food => 
            food._id === editingFood._id ? { ...food, ...updatedFood } : food
        ));
        setShowEditModal(false);
        setEditingFood(null);
    };

    const handleDeleteClick = (food) => {
        setDeletingFood(food);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (deletingFood) {
            try {
                await deleteFood(deletingFood._id);
                setFoods(foods.filter(food => food._id !== deletingFood._id));
                setShowDeleteModal(false);
                setDeletingFood(null);
            } catch (error) {
                console.error('Error deleting food:', error);
                alert('Có lỗi xảy ra khi xóa món ăn');
            }
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setDeletingFood(null);
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.name : 'Unknown';
    };

    if (loading) {
        return <div className="loading">Đang tải...</div>;
    }

    return (
        <div className="food-management">
            <div className="page-header">
                <h2>Quản lý Food</h2>
                <button 
                    className="btn btn-primary"
                    onClick={() => setShowAddForm(true)}
                >
                    <i className="fas fa-plus"></i> Thêm món ăn mới
                </button>
            </div>

            {showAddForm && (
                <AddFoodForm 
                    categories={categories}
                    onAdd={handleAddFood}
                    onCancel={() => setShowAddForm(false)}
                />
            )}

            <div className="food-list">
                <div className="table-container">
                    <table className="food-table">
                        <thead>
                            <tr>
                                <th>Hình ảnh</th>
                                <th>Tên món</th>
                                <th>Danh mục</th>
                                <th>Giá</th>
                                <th>Giá sale</th>
                                <th>Tình trạng</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foods.map(food => (
                                <tr key={food._id}>
                                    <td>
                                        <img 
                                            src={food.images[0]} 
                                            alt={food.name}
                                            className="food-image"
                                        />
                                    </td>
                                    <td>
                                        <div className="food-name">
                                            <strong>{food.name}</strong>
                                            <p className="food-description">{food.description}</p>
                                        </div>
                                    </td>
                                    <td>{getCategoryName(food.categoryId)}</td>
                                    <td>
                                        <span className="price">
                                            {food.price.toLocaleString()} {food.currency}
                                        </span>
                                    </td>
                                    <td>
                                        {food.salePrice ? (
                                            <span className="sale-price">
                                                {food.salePrice.toLocaleString()} {food.currency}
                                            </span>
                                        ) : (
                                            <span className="no-sale">Không có</span>
                                        )}
                                    </td>
                                    <td>
                                        <span className={`status ${food.inStock ? 'in-stock' : 'out-of-stock'}`}>
                                            {food.inStock ? 'Còn hàng' : 'Hết hàng'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="actions">
                                            <button 
                                                className="btn btn-sm btn-edit"
                                                onClick={() => handleEditFood(food)}
                                            >
                                                Cập nhật
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-delete"
                                                onClick={() => handleDeleteClick(food)}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showEditModal && (
                <EditFoodModal
                    food={editingFood}
                    categories={categories}
                    onSave={handleUpdateFood}
                    onCancel={() => {
                        setShowEditModal(false);
                        setEditingFood(null);
                    }}
                    isOpen={showEditModal}
                />
            )}

            <DeleteConfirmModal
                isOpen={showDeleteModal}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                title="Xác nhận xóa món ăn"
                message="Bạn có chắc chắn muốn xóa món ăn này không?"
                itemName={deletingFood?.name}
            />
        </div>
    );
};

export default FoodManagement;
