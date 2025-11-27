import { Request, Response, NextFunction } from 'express';
import { getUserIdFromRequest } from '@shared/utils/getUserIdFromRequest';
 import { HttpStatus } from 'constants/HttpStatus/HttpStatus';
 import { IProfileUseCases } from '@application/useCaseInterfaces/user/IProfileUseCases';
import { UserDetailsDTO } from '@application/dtos/UserDTO';

export class ProfileController {
  constructor(private _profileUseCases: IProfileUseCases) {}

  getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserIdFromRequest(req);
      const userProfile = await this._profileUseCases.getUserProfile(userId);

      res.status(HttpStatus.OK).json({
        userProfile,
        message: 'user profile fetched successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  updateUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserIdFromRequest(req);
      const profileData: UserDetailsDTO = req.body.profileData;
      const updatedProfile = await this._profileUseCases.updateUserProfile(userId, profileData);
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'User profile updated successfully',
        userProfile: updatedProfile,
      });
    } catch (error) {
      next(error);
    }
  };

  
 

}
