import { Router } from 'express';
import { upload } from '@presentation/middlewares/upload';
 import { userAuthMiddleware } from '@presentation/middlewares/userAuthMiddleware';
 import {
  AUTH_ROUTES,
   BLOG_ROUTES,
   PROFILE_ROUTES,
  
   
 } from 'constants/route-constants/userRoutes';

import { UserAuthUsecases } from '@application/usecases/user/userAuthUseCases';
import { UserRepository } from '@infrastructure/repositories/UserRepository';
 import { userRefreshToken } from '@presentation/controllers/token/userRefreshToken';
 import { UserAuthController } from '@presentation/controllers/user/UserAuthController';

import { ProfileUseCases } from '@application/usecases/user/profileUseCases';
import { ProfileController } from '@presentation/controllers/user/profileController';
 
  
import { BlogRepository } from '@infrastructure/repositories/BlogRepository';
import { BlogController } from '@presentation/controllers/user/blogController';
import { BlogUseCases } from '@application/usecases/user/BlogUseCases';
import { checkBlockedMiddleware } from '@presentation/middlewares/checkBlockedMiddleware';
import { optionalAuthMiddleware } from '@presentation/middlewares/optionalAuthMiddleware';
 

const userRepository = new UserRepository();
 const userAuthUseCases = new UserAuthUsecases(
  userRepository,
 );
const userAuthController = new UserAuthController(userAuthUseCases);

 
const profileRepository = new UserRepository();
const profileUseCases = new ProfileUseCases(profileRepository);
const profileController = new ProfileController(profileUseCases);

 
const blogRepository = new BlogRepository();
const blogUseCases = new BlogUseCases(blogRepository);
const blogController = new BlogController(blogUseCases);
const router = Router();

// AUTH ROUTES
router.post(AUTH_ROUTES.REFRESH_TOKEN, userRefreshToken);
 router.post(AUTH_ROUTES.REGISTER, userAuthController.register);
 router.post(AUTH_ROUTES.LOGIN, userAuthController.login);
 router.post(AUTH_ROUTES.LOGOUT, userAuthController.userLogout);
router.post(AUTH_ROUTES.PASSWORD_CHANGE, userAuthMiddleware, userAuthController.changePassword);

 
// PROFILE ROUTES
router.get(PROFILE_ROUTES.GET_PROFILE, userAuthMiddleware, profileController.getUserProfile);
router.put(PROFILE_ROUTES.UPDATE_PROFILE, userAuthMiddleware, profileController.updateUserProfile);
 
// BLOG ROUTES
router.post(
  BLOG_ROUTES.CREATE,
  userAuthMiddleware,
  upload.array('images'),
  blogController.createBlog
);
router.put(BLOG_ROUTES.EDIT, userAuthMiddleware, upload.array('images'), blogController.editBlog);
router.get(BLOG_ROUTES.GET_ALL, blogController.getAllPublishedBlogs);
router.get(BLOG_ROUTES.GET_USER_BLOGS, userAuthMiddleware, blogController.getBlogByUser);
router.get(
  BLOG_ROUTES.GET_PUBLIC_USER_BLOGS,
  userAuthMiddleware,checkBlockedMiddleware,
  blogController.getPublicBlogsByUser
);
router.get(BLOG_ROUTES.GET_BY_ID, userAuthMiddleware, blogController.getBlogById);
router.get(BLOG_ROUTES.GET_BY_SLUG, optionalAuthMiddleware,checkBlockedMiddleware, blogController.getBySlug);
router.delete(BLOG_ROUTES.DELETE, userAuthMiddleware, blogController.deleteBlog);
router.patch(BLOG_ROUTES.LIKE, userAuthMiddleware, blogController.likeBlog);
router.patch(BLOG_ROUTES.UNLIKE, userAuthMiddleware, blogController.unLikeBlog);
router.get(BLOG_ROUTES.BLOG_LIKE_LIST, userAuthMiddleware, blogController.getBlogLikeList);


export default router;
