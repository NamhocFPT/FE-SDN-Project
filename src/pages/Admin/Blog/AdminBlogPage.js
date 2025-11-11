import React, { useEffect, useState } from "react";
import { get, post } from "../../../ultils/request";
import { put, dele } from "../../../ultils/request";
import "./AdminBlogPage.scss";

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [editingId, setEditingId] = useState(null); // 👈 đang sửa blog nào
  const [form, setForm] = useState({
    title: "",
    content: "",
    coverImage: "",
    authorId: "",
    blogCategoryId: "",
    published: false,
  });

  const loadBlogs = async () => {
    try {
      const data = await get("blogs");
      setBlogs(data);
    } catch (err) {
      console.error(" Lỗi khi tải blog:", err);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await get("blog-categories");
      setCategories(data);
    } catch (err) {
      console.error(" Lỗi khi tải category:", err);
    }
  };

  const loadAuthors = async () => {
    try {
      const data = await get("users");
      const filtered = data.filter(
        (u) =>
          u.roleId?.name?.toLowerCase() === "admin" ||
          u.roleId?.name?.toLowerCase() === "staff"
      );
      setAuthors(filtered);
    } catch (err) {
      console.error("❌ Lỗi khi tải author:", err);
    }
  };

  useEffect(() => {
    loadBlogs();
    loadCategories();
    loadAuthors();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  //  Tạo mới hoặc cập nhật blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      slug: form.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-"),
    };

    const isEditing = !!editingId;
    try {
      if (isEditing) {
        await put(`blogs/${editingId}`, payload);
      } else {
        await post("blogs", payload);
      }
      alert(
        isEditing ? "✅ Cập nhật blog thành công" : "✅ Thêm blog thành công"
      );
      setForm({
        title: "",
        content: "",
        coverImage: "",
        authorId: "",
        blogCategoryId: "",
        published: false,
      });
      setEditingId(null);
      loadBlogs();
    } catch (err) {
      console.error(" Lỗi khi lưu blog:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa bài viết này?")) return;
    await dele("blogs", id);
    loadBlogs();
  };

  //  Khi bấm Sửa – nạp dữ liệu blog lên form
  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title || "",
      content: blog.content || "",
      coverImage: blog.coverImage || "",
      authorId: blog.authorId?._id || "",
      blogCategoryId: blog.blogCategoryId?._id || "",
      published: !!blog.published,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //  Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({
      title: "",
      content: "",
      coverImage: "",
      authorId: "",
      blogCategoryId: "",
      published: false,
    });
  };

  return (
    <div className="update-food-page">
      <div className="update-container">
        <h2>{editingId ? "Chỉnh sửa Blog" : "Quản lý Blog"}</h2>

        {/* FORM */}
        <form className="update-form" onSubmit={handleSubmit}>
          <label>Tiêu đề</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Nhập tiêu đề"
            required
          />

          <label>Ảnh bìa</label>
          <input
            name="coverImage"
            value={form.coverImage}
            onChange={handleChange}
            placeholder="URL ảnh bìa"
          />

          <label>Nội dung</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Nhập nội dung bài viết..."
            required
          />

          <label>Danh mục</label>
          <select
            name="blogCategoryId"
            value={form.blogCategoryId}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <label>Tác giả</label>
          <select
            name="authorId"
            value={form.authorId}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn tác giả --</option>
            {authors.map((a) => (
              <option key={a._id} value={a._id}>
                {a.fullName}
              </option>
            ))}
          </select>

          <div className="checkbox-label">
            <span>Xuất bản</span>
            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
            />
          </div>

          <div className="btn-group">
            <button type="submit" className="btn-update">
              {editingId ? "Cập nhật bài viết" : "Lưu bài viết"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancelEdit}
              >
                Hủy
              </button>
            )}
          </div>
        </form>

        {/* DANH SÁCH BLOG */}
        <hr />
        {blogs.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>
            Chưa có bài viết nào.
          </p>
        ) : (
          blogs.map((b) => (
            <div
              key={b._id}
              className="blog-item"
              style={{
                background: "#fff",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              {b.coverImage && (
                <img
                  src={b.coverImage}
                  alt={b.title}
                  style={{
                    width: "100%",
                    maxHeight: "250px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
              )}
              <h3>{b.title}</h3>
              <p>{b.content}</p>
              <small style={{ color: "#777" }}>
                🖋 {b.authorId?.fullName || "Ẩn danh"} • 📚{" "}
                {b.blogCategoryId?.name || "Chưa có danh mục"}
              </small>
              <div className="btn-group" style={{ marginTop: "10px" }}>
                <button
                  type="button"
                  className="btn-update"
                  onClick={() => handleEdit(b)}
                >
                  Sửa
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => handleDelete(b._id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
