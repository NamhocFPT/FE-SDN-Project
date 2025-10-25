
import LayoutDefaults from "../Layout/LayoutDefaults";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import BlogPage from "../pages/User/Blog/BlogPage";
import ContactPage from "../pages/User/Contact/ContactPage";
import Home from "../pages/User/Home/Home";

// Admin imports
import AdminLayout from "../pages/Admin/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import FoodManagement from "../pages/Admin/FoodManagement";

export const Router = [
    {
        path: '/',
        element: <LayoutDefaults />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'blog',
                element: <BlogPage />
            },
            {
                path: 'contact',
                element: <ContactPage />
            },
            {
                path: '*',
                element: <NotFoundPage />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: '/admin',
                element: <AdminDashboard />
            },
            {
                path: '/admin/foods',
                element: <FoodManagement />
            }
        ]
    }
]
