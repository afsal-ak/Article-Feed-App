import { Route } from 'react-router-dom';
import UserProtectedRoutes from './UserProtectedRoute';
import Home from '@/pages/user/home/Home';

import EditProfile from '@/pages/user/profile/EditProfile';
import UserBlogsPage from '@/pages/user/blog/UserBlogsPage';
import AddBlogForm from '@/pages/user/blog/AddBlogForm';
import EditBlogForm from '@/pages/user/blog/EditBlogForm';
import UserBlogDetail from '@/pages/user/blog/UserBlogDetails';
 const ProtectedRoutes = (

  <Route element={<UserProtectedRoutes />}>
    <Route path="/home" element={<Home />} />


     <Route path="/profile" element={<EditProfile />} />

  <Route path="/account/my-blogs" element={<UserBlogsPage />} />
      <Route path="/account/my-blogs/add" element={<AddBlogForm />} />
      <Route path="/account/my-blogs/:slug" element={<UserBlogDetail />} />
      <Route path="/account/my-blogs/edit/:blogId" element={<EditBlogForm />} />

  




  </Route>
);
export default ProtectedRoutes