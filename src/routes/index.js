// import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

// 🧩 Layouts
import LayoutDefaults from "../Layout/LayoutDefaults";
import AdminLayout from "../pages/Admin/AdminLayout/AdminLayout";

// 🧩 User Pages
import Home from "../pages/User/Home/Home";
import BlogPage from "../pages/User/Blog/BlogPage";
import ContactPage from "../pages/User/Contact/ContactPage";
import ProductList from "../pages/User/ProductList/ProductList";
import ProductDetail from "../pages/User/ProductDetail/ProductDetail";
import FeedbackPage from "../pages/User/Feedback/FeedbackPage";
import CartPage from "../pages/User/Cart/CartPage";
import CheckoutPage from "../pages/User/Checkout/CheckoutPage";
import OrderHistoryPage from "../pages/User/Orders/OrderHistoryPage";

// 🧩 Auth Pages
import LoginPage from "../pages/User/Auth/LoginPage";
import RegisterPage from "../pages/User/Auth/RegisterPage";
import ForgotPasswordPage from "../pages/User/Auth/ForgotPasswordPage";

// 🧩 Admin Pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
import FoodManagement from "../pages/Admin/FoodManagement";
import UpdateFoodPage from "../pages/Admin/Food/UpdateFoodPage";
import AdminFeedbackPage from "../pages/Admin/Feedback/AdminFeedbackPage";
import AdminBlogPage from "../pages/Admin/Blog/AdminBlogPage";

// 🧩 Others
import NotFoundPage from "../pages/NotFound/NotFoundPage";

export const Router = [
  // 🌐 USER ROUTES
  {
    path: "/",
    element: <LayoutDefaults />,
    children: [
      { path: "/", element: <Home /> },
      { path: "blog", element: <BlogPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "products", element: <ProductList /> },
      { path: "products/:idOrSlug", element: <ProductDetail /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "orders", element: <OrderHistoryPage /> },
      { path: "feedback", element: <FeedbackPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },

  // 🔒 ADMIN ROUTES
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <AdminDashboard /> },
      { path: "foods", element: <FoodManagement /> },
      { path: "foods/:id/update", element: <UpdateFoodPage /> },
      { path: "feedbacks", element: <AdminFeedbackPage /> },
      { path: "blogs", element: <AdminBlogPage /> },
    ],
  },

  // 🔐 AUTH ROUTES (ngoài layout)
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot", element: <ForgotPasswordPage /> },
];
