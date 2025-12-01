import { Route } from 'react-router-dom';
import UserProtectedRoutes from './UserProtectedRoute';
import Home from '@/pages/user/home/Home';

import EditProfile from '@/pages/user/profile/EditProfile';
import UserBlogsPage from '@/pages/user/blog/UserBlogsPage';
import AddBlogForm from '@/pages/user/blog/AddBlogForm';
import EditBlogForm from '@/pages/user/blog/EditBlogForm';
import UserBlogDetail from '@/pages/user/blog/UserBlogDetail';
import BlogDetail from '@/pages/user/blog/BlogDetail';
import BlogsPage from '@/pages/user/blog/BlogPage';
const ProtectedRoutes = (
  <Route element={<UserProtectedRoutes />}>
    <Route path="/home" element={<Home />} />
    <Route path="/blog" element={<BlogsPage />} />
    <Route path="/blog/:slug" element={<BlogDetail />} />

    <Route path="/profile" element={<EditProfile />} />

    <Route path="/account/my-blogs" element={<UserBlogsPage />} />
    <Route path="/account/my-blogs/add" element={<AddBlogForm />} />
    <Route path="/account/my-blogs/:slug" element={<UserBlogDetail />} />
    <Route path="/account/my-blogs/edit/:blogId" element={<EditBlogForm />} />
  </Route>
);
export default ProtectedRoutes;
