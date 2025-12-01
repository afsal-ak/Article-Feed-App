import { Route } from 'react-router-dom';
import Home from '@/pages/user/home/Home';

import { Fragment } from 'react/jsx-runtime';
import BlogsPage from '@/pages/user/blog/BlogPage';
import BlogDetail from '@/pages/user/blog/BlogDetail';
const CommonRoutes = (
  <Fragment>
    <Route path="/" element={<Home />} />
    <Route path="/blog" element={<BlogsPage />} />
    <Route path="/blog/:slug" element={<BlogDetail />} />
  </Fragment>
);

export default CommonRoutes;
