import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateFoodPage.scss";

export default function UpdateFoodPage() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const [categories, setCategories] = useState([]); // danh sách danh mục
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // 🌐 URL API cố định
  const FOOD_API = "http://localhost:9999/api/admin/foods";
  const CATEGORY_API = "http://localhost:9999/api/admin/categories";

  // 🧩 Lấy thông tin món ăn theo ID
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await fetch(`${FOOD_API}/${id}`);
        if (!res.ok) throw new Error("Không thể tải dữ liệu món ăn");
        const food = await res.json();

        setFormData({
          name: food.name || "",
          slug: food.slug || "",
          categoryId: food.categoryId?._id || food.categoryId || "",
          price: food.price || "",
          salePrice: food.salePrice || "",
          currency: food.currency || "VND",
          images: food.images?.length ? [food.images[0]] : [""],
          tags: food.tags?.join(", ") || "",
          inStock: food.inStock ?? true,
          description: food.description || "",
        });
      } catch (err) {
        console.error("❌ Lỗi khi tải dữ liệu món ăn:", err);
        setMessage("⚠️ Không thể tải dữ liệu món ăn.");
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  // 🧩 Lấy danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(CATEGORY_API);
        if (!res.ok) throw new Error("Không thể tải danh mục");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("❌ Lỗi tải danh mục:", err);
      }
    };
    fetchCategories();
  }, []);

  // 🧠 Xử lý thay đổi input
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

  // 🚀 Cập nhật món ăn
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Đang cập nhật...");

    try {
      const payload = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      };

      const res = await fetch(`${FOOD_API}/${id}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Cập nhật thất bại");
      const data = await res.json();
      console.log("✅ Updated:", data);

      setMessage("✅ Cập nhật thành công!");
      setTimeout(() => navigate("/admin/foods"), 1200);

    } catch (err) {
      console.error("❌ Lỗi cập nhật:", err);
      setMessage("⚠️ Cập nhật thất bại, vui lòng thử lại!");
    }
  };

  // 🌀 Loading
  if (loading)
    return <p style={{ textAlign: "center", marginTop: 50 }}>Đang tải...</p>;

  // ⚠️ Lỗi tải dữ liệu
  if (message.startsWith("⚠️"))
    return (
      <p style={{ color: "red", textAlign: "center", marginTop: 50 }}>
        {message}
      </p>
    );

  // 🎨 Giao diện form
  return (
    <div className="update-food-page">
      <div className="update-container">
        <h2>Cập nhật món ăn</h2>

        {formData.images[0] && (
          <div className="image-header">
            <img src={formData.images[0]} alt="Food Preview" />
          </div>
        )}

        <form className="update-form" onSubmit={handleSubmit}>
          {/* Tên món */}
          <div>
            <label>Tên món ăn:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label>Slug:</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
            />
          </div>

          {/* Danh mục */}
          <div>
            <label>Danh mục:</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((cate) => (
                <option key={cate._id} value={cate._id}>
                  {cate.name}
                </option>
              ))}
            </select>
          </div>

          {/* Giá */}
          <div className="price-group">
            <div>
              <label>Giá gốc:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Giá khuyến mãi:</label>
              <input
                type="number"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Loại tiền:</label>
              <select
                name="currency"
                className="currency-select"
                value={formData.currency}
                onChange={handleChange}
              >
                <option value="VND">VND</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>

          {/* Ảnh */}
          <div>
            <label>Ảnh:</label>
            <input
              type="text"
              value={formData.images[0]}
              onChange={(e) => handleImageChange(e, 0)}
              placeholder="URL ảnh món ăn"
            />
          </div>

          {/* Tags */}
          <div>
            <label>Tags:</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="drink, fruit..."
            />
          </div>

          {/* Còn hàng */}
          <div className="checkbox-label">
            <span>Còn hàng</span>
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
            />
          </div>

          {/* Mô tả */}
          <div>
            <label>Mô tả:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Nhập mô tả món ăn"
            />
          </div>

          {/* Nút */}
          <div className="btn-group">
            <button type="submit" className="btn-update">
              Cập nhật
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate(-1)}
            >
              Hủy
            </button>
          </div>
        </form>

        {/* Thông báo */}
        {message && (
          <p
            style={{
              color: message.startsWith("✅") ? "#2ecc71" : "#e74c3c",
              marginTop: 15,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
