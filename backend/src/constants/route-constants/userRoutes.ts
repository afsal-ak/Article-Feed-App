export const AUTH_ROUTES = {
  REFRESH_TOKEN: '/refresh-token',
   REGISTER: '/register',
   LOGIN: '/login',
  
  LOGOUT: '/logout',
   
  PASSWORD_CHANGE: '/password/change',
};

export const HOME_ROUTES = {
  HOME: '/home',
  PACKAGES: '/packages',
  PACKAGE_BY_ID: '/packages/:id',
};
//router.get('/packages/:id', homeController.getPackagesById);

export const PROFILE_ROUTES = {
  GET_PROFILE: '/profile',
  UPDATE_PROFILE: '/profile/update',

};

export const BLOCK_ROUTE={
  BLOCK:'/block',
  UNBLOCK:'/unblock',
  IS_BLOCKED:'/blocked/:blockedId',
  GELL_ALL:'blocked'
}


export const BLOG_ROUTES = {
  CREATE: '/blog/create',
  EDIT: '/blog/edit/:blogId',
  GET_ALL: '/blogs',
  GET_USER_BLOGS: '/blogs/user',
  GET_PUBLIC_USER_BLOGS: '/blogs/public/:userId',
  GET_BY_ID: '/blog/:blogId',
  GET_BY_SLUG: '/blog/slug/:slug',
  DELETE: '/blog/delete/:blogId',
  LIKE: '/blog/like/:blogId',
  UNLIKE: '/blog/unlike/:blogId',
  BLOCK:"/blog/block/:articleId",
  UNBLOCK:"/blog/unblock/:articleId",
 };
