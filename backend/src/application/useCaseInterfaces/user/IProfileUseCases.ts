import { UserDetailsDTO } from '@application/dtos/UserDTO';
import { IUser } from '@domain/entities/IUser';

export interface IProfileUseCases {
  getUserProfile(userId: string): Promise<IUser | null>;
   updateUserProfile(userId: string, profileData: UserDetailsDTO): Promise<UserDetailsDTO | null>;

}
