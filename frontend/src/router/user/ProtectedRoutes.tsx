import { Route } from 'react-router-dom';
import UserProtectedRoutes from './UserProtectedRoute';
import Home from '@/pages/user/home/Home';

import EditProfile from '@/pages/user/profile/EditProfile';
 const ProtectedRoutes = (

  <Route element={<UserProtectedRoutes />}>
    <Route path="/home" element={<Home />} />


     <Route path="/profile" element={<EditProfile />} />



  




  </Route>
);
export default ProtectedRoutes