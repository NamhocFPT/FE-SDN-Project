
import LayoutDefaults from "../Layout/LayoutDefaults";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import BlogPage from "../pages/User/Blog/BlogPage";
import ContactPage from "../pages/User/Contact/ContactPage";

import Home from "../pages/User/Home/Home";

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
            }
            ,
            {
                 path: '*',
                element: <NotFoundPage />
            }
        ]
    }
]
