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