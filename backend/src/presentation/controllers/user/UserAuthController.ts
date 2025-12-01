import { NextFunction, Request, Response } from 'express';
import { getUserIdFromRequest } from '../../../shared/utils/getUserIdFromRequest';
import { HttpStatus } from '../../../constants/HttpStatus/HttpStatus';
import { IUserAuthUseCases } from '../../../application/useCaseInterfaces/user/IUserAuthUseCases';
import {  mapToLoginResponseDTO ,RegisterUserDTO} from '../../../application/dtos/UserAuthDTO';
export class UserAuthController {
  constructor(private _userAuthUseCases: IUserAuthUseCases) { }


  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
            console.log(req.body,'user body')

      const data:RegisterUserDTO = req.body;
      console.log(data,'user data')
      await this._userAuthUseCases.register(data);

      res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'User registered successfully',
      });
    } catch (error: any) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await this._userAuthUseCases.login(
        email,
        password
      );
       res.cookie('userRefreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      });
       res.status(HttpStatus.OK).json({
        success: true,
        message: 'Login successful',
        accessToken,
        user:user
      });
    } catch (error: any) {
      next(error);
    }
  };

  userLogout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.clearCookie('userRefreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
      });

      res.status(HttpStatus.OK).json({ message: 'user logout successful' });
    } catch (error: any) {
      next(error);
    }
  };


  changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = getUserIdFromRequest(req);

      await this._userAuthUseCases.changePassword(userId, currentPassword, newPassword);
      res.status(HttpStatus.OK).json({ message: 'Password updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  
}
