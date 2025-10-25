import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./UpdateFoodPage.scss";

export default function UpdateFoodPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    categoryId: "",
    price: "",
    salePrice: "",
    currency: "VND",
    images: [""],
    tags: "",
    inStock: true,
    description: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await fetch("http://localhost:9999/foods");
        if (!res.ok) throw new Error("Không thể tải dữ liệu");

        const data = await res.json();
        const foundFood = data.find((f) => f._id === id);

        if (foundFood) {
          setFormData({
            name: foundFood.name || "",
            slug: foundFood.slug || "",
            categoryId: foundFood.categoryId || "",
            price: foundFood.price || "",
            salePrice: foundFood.salePrice || "",
            currency: foundFood.currency || "VND",
            images: foundFood.images?.length ? [foundFood.images[0]] : [""],
            tags: foundFood.tags?.join(", ") || "",
            inStock: foundFood.inStock ?? true,
            description: foundFood.description || "",
          });
        } else {
          setMessage("Không tìm thấy món ăn với ID này");
        }
      } catch (err) {
        console.error("Lỗi khi load dữ liệu:", err);
        setMessage("Không thể tải dữ liệu món ăn");
      }
    };

    fetchFood();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e, index) => {
    const newImages = [...formData.images];
    newImages[index] = e.target.value;
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Updated food data:", formData);

    alert("Cập nhật thành công");
    // Sau này bạn có thể thay bằng:
    // await fetch(`http://localhost:9999/foods/${id}`, { method: "PATCH", ... })
  };

  if (message)
    return (
      <p style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        {message}
      </p>
    );

  return (
    <div className="update-food-page">
      <div className="update-container">
        <h2>Update Food</h2>

        {formData.images[0] && (
          <div className="image-header">
            <img src={formData.images[0]} alt="Food" />
          </div>
        )}

        <form className="update-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên món ăn:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập tên món ăn"
            />
          </div>

          <div className="form-group">
            <label>Slug:</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="Đường dẫn (slug)"
            />
          </div>

          <div className="form-group">
            <label>Danh mục (categoryId):</label>
            <input
              type="text"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              placeholder="Nhập ID danh mục"
            />
          </div>

        <div className="form-group price-group">
        <div>
            <label>Giá gốc:</label>
            <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Nhập giá món ăn"
            />
        </div>

        <div>
            <label>Giá khuyến mãi:</label>
            <input
            type="number"
            name="salePrice"
            value={formData.salePrice}
            onChange={handleChange}
            placeholder="Nhập giá sale (nếu có)"
            />
        </div>

        <div>
            <label>Loại tiền:</label>
            <select
            className="currency-select"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            >
            <option value="VND">VND</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            </select>
        </div>
        </div>

          <div className="form-group">
            <label>Ảnh:</label>
            <input
              type="text"
              value={formData.images[0]}
              onChange={(e) => handleImageChange(e, 0)}
              placeholder="URL ảnh món ăn"
            />
          </div>

          <div className="form-group">
            <label>Tags:</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="tag1, tag2, ..."
            />
          </div>

          <div className="form-group checkbox-label">
            <span>Còn hàng</span>
            <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
            />
            </div>


          <div className="form-group">
            <label>Mô tả:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Nhập mô tả món ăn"
            />
          </div>

          <div className="btn-group">
            <button type="submit" className="btn-update">
              Cập nhật
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => window.history.back()}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
