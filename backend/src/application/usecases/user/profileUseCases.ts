import { HttpStatus } from '@constants/HttpStatus/HttpStatus';
import { IUser } from '@domain/entities/IUser';
 import { AppError } from '@shared/utils/AppError';
import { IProfileUseCases } from '@application/useCaseInterfaces/user/IProfileUseCases';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { mapToUserDetailsDTO, UserDetailsDTO } from '@application/dtos/UserDTO';


export class ProfileUseCases implements IProfileUseCases {

  constructor(
    private _userRepo: IUserRepository,
   ) { }

  async getUserProfile(userId: string): Promise<IUser | null> {
    return await this._userRepo.getUserProfile(userId);
  }

  
 async updateUserProfile(
    userId: string,
    profileData: UserDetailsDTO
  ): Promise<UserDetailsDTO | null> {
    const profile = await this._userRepo.updateUserProfile(userId, profileData);
    return profile ? mapToUserDetailsDTO(profile) : null;
  }
}
