import { IUser } from "@domain/entities/IUser";

export interface UserDetailsDTO {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: Date;
  role: "user" | "admin";
  isBlocked: boolean;
  preferences: string[];
}

export const mapToUserDetailsDTO = (user: IUser): UserDetailsDTO => ({
  _id: user._id!.toString(),
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phone: user.phone!,
  dob: user.dob,
  role: user.role || "user",
  isBlocked: !!user.isBlocked,
  preferences: user.preferences || [],
});
