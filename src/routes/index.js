import LayoutDefaults from "../Layout/LayoutDefaults";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import BlogPage from "../pages/User/Blog/BlogPage";
import ContactPage from "../pages/User/Contact/ContactPage";
import Home from "../pages/User/Home/Home";
import UpdateFoodPage from "../pages/Admin/Food/UpdateFoodPage";

// 🧩 Thêm Auth pages
import LoginPage from "../pages/User/Auth/LoginPage";
import RegisterPage from "../pages/User/Auth/RegisterPage";
import ForgotPasswordPage from "../pages/User/Auth/ForgotPasswordPage";

// 🧩 Thêm 3 trang mới
import FeedbackPage from "../pages/User/Feedback/FeedbackPage";
import AdminFeedbackPage from "../pages/Admin/Feedback/AdminFeedbackPage";
import AdminBlogPage from "../pages/Admin/Blog/AdminBlogPage";

export const Router = [
  {
    path: "/",
    element: <LayoutDefaults />,
    children: [
      { path: "/", element: <Home /> },
      { path: "blog", element: <BlogPage /> },
      { path: "contact", element: <ContactPage /> },

      // ✅ Feedback cho user
      { path: "feedback", element: <FeedbackPage /> },

      // ✅ Admin pages
      { path: "admin/foods/:id/update", element: <UpdateFoodPage /> },
      { path: "admin/feedbacks", element: <AdminFeedbackPage /> },
      { path: "admin/blogs", element: <AdminBlogPage /> },

      // 404
      { path: "*", element: <NotFoundPage /> },
    ],
  },

  // ✅ Auth routes (nằm ngoài layout)
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot", element: <ForgotPasswordPage /> },
];

