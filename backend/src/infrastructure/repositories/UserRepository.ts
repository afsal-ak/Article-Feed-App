import { IRole, IUser } from '../../domain/entities/IUser';
import { UserModel } from '../../infrastructure/models/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { AppError } from '../../shared/utils/AppError';
import { IPaginatedResult } from '../../domain/entities/IPaginatedResult';
import { HttpStatus } from '../../constants/HttpStatus/HttpStatus';

export class UserRepository implements IUserRepository {

  async getAllAdmins(): Promise<IUser[]> {
    return await UserModel.find({ role: 'admin', isBlocked: false });
  }


  async findByEmail(email: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ email: email });
    return user ? user.toObject() : null;
  }

  async findByUsername(username: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ username: username });
    return user ? user.toObject() : null;
  }

  async createUser(user: IUser): Promise<IUser> {
    const newUser = new UserModel(user);
    const saved = await newUser.save();
    return saved.toObject();
  }

  async updateUserPassword(email: string, password: string): Promise<IUser | null> {
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { password: password } },
      { new: true }
    );
    console.log(UserModel, updatedUser, 'updated');
    return updatedUser;
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await UserModel.findById(id);
    return user ? user.toObject() : null;
  }


  async countAll(): Promise<number> {
    return UserModel.countDocuments();
  }


  async updateUserEmail(id: string, email: string): Promise<IUser | null> {
    const checkEmail = await UserModel.findOne({ email: email });
    if (checkEmail) {
      throw new AppError(400, 'Email Already taken');
    }
    const newEmail = await UserModel.findByIdAndUpdate(id, { email: email }, { new: true });
    return newEmail;
  }

  async changePassword(id: string, newPassword: string): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(id, { password: newPassword });
  }

  async getUserProfile(id: string): Promise<IUser | null> {
    const userProfile = await UserModel.findById(id).select('-password').lean();
    return userProfile || null;
  }
async updateUserProfile(id: string, profileData: Partial<IUser>): Promise<IUser | null> {
  // Find the current user
  const currentUser = await UserModel.findById(id);
  if (!currentUser) {
    throw new AppError(HttpStatus.NOT_FOUND, 'User not found');
  }

  // Check if email is being updated AND not same as existing email
  if (profileData.email && profileData.email !== currentUser.email) {
    const checkEmail = await UserModel.findOne({ email: profileData.email });

    if (checkEmail) {
      throw new AppError(400, 'Email already taken');
    }
  }

  // Update user
  const updated = await UserModel.findByIdAndUpdate(id, profileData, {
    new: true,
  }).lean();

  if (!updated) {
    throw new AppError(HttpStatus.NOT_FOUND, 'User not found');
  }

  return updated;
}


}
