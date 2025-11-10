import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

// Admin
import AdminLayout from "../pages/Admin/AdminLayout/AdminLayout";
import DashboardPage from "../pages/Admin/Dashboard/DashboardPage";
import OrderListPage from "../pages/Admin/OrderList/OrderListPage";
import UserListPage from "../pages/Admin/UserList/UserListPage";

// User
import LayoutDefaults from "../Layout/LayoutDefaults";
import Home from "../pages/User/Home/Home";
import BlogPage from "../pages/User/Blog/BlogPage";
import ContactPage from "../pages/User/Contact/ContactPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

export const Router = [
  {
    path: "/",
    element: <LayoutDefaults />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "blog",
        element: <BlogPage />
      },
      {
        path: "contact",
        element: <ContactPage />
      },
      {
        path: "*",
        element: <NotFoundPage />
      }
    ]
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute roles={["admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />
      },
      {
        path: "dashboard",
        element: <DashboardPage />
      },
      {
        path: "orders",
        element: <OrderListPage />
      },
      {
        path: "users",
        element: <UserListPage />
      }
    ]
  }
];
