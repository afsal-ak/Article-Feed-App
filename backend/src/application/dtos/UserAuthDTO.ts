import { IUser } from "../../domain/entities/IUser";

export interface RegisterUserDTO {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: Date; 
  password: string;
  confirmPassword: string;
  preferences?: string[];
}


export interface LoginResponseDTO {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  preferences: string[];
}

export const mapToLoginResponseDTO = (user: IUser): LoginResponseDTO => ({
  _id: user._id!.toString(),
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phone: user.phone!,
  role: user.role || "user",
  preferences: user.preferences || [],
});
