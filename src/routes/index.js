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

export const Router = [
  {
    path: "/",
    element: <LayoutDefaults />,
    children: [
      { path: "/", element: <Home /> },
      { path: "blog", element: <BlogPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "admin/foods/update/:id", element: <UpdateFoodPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },

  // 🔐 Auth routes — nằm ngoài layout chính
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot", element: <ForgotPasswordPage /> },
];
