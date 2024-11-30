export interface User {
  id: string;
  email: string;
  isSeller: boolean;
  displayName: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface RegisterUserReqDTO {
  email: string;
  password: string;
  name: string;
  isSeller: boolean;
}
export interface LoginRequestDto {
  email: string;
  password: string;
}
export interface LoginResponseDto {
  uid: string;
  email: string;
  displayName: string;
  accessToken: string;
  isSeller: boolean;
}
