export type IRole = 'user' | 'admin';

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: Date;
  password: string;
  preferences: string[]; // sports, politics, space, etc.
  role?: IRole;
  isBlocked?: boolean;
}
