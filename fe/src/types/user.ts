export type UserRole = "admin" | "kitchen" | "user";

export interface UserType {
  id: string;
  phone_number: string;
  role: UserRole;
}