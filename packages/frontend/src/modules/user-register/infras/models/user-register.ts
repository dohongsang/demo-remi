export interface IUserRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface IUserRegisterResponse {
  accessToken: string;
}
