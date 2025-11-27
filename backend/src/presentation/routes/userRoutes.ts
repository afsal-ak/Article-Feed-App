import { Router } from 'express';
import { upload } from '@presentation/middlewares/upload';
 import { userAuthMiddleware } from '@presentation/middlewares/userAuthMiddleware';
 import {
  AUTH_ROUTES,
   PROFILE_ROUTES,
  
   
 } from 'constants/route-constants/userRoutes';

import { UserAuthUsecases } from '@application/usecases/user/userAuthUseCases';
import { UserRepository } from '@infrastructure/repositories/UserRepository';
 import { userRefreshToken } from '@presentation/controllers/token/userRefreshToken';
 import { UserAuthController } from '@presentation/controllers/user/UserAuthController';

import { ProfileUseCases } from '@application/usecases/user/profileUseCases';
import { ProfileController } from '@presentation/controllers/user/profileController';
 
  

const userRepository = new UserRepository();
 const userAuthUseCases = new UserAuthUsecases(
  userRepository,
 );
const userAuthController = new UserAuthController(userAuthUseCases);

 
const profileRepository = new UserRepository();
const profileUseCases = new ProfileUseCases(profileRepository);
const profileController = new ProfileController(profileUseCases);

 
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
 


export default router;
