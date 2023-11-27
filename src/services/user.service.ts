import { HttpResponse } from '../common/HttpResponse';
import httpRequest from '../libs/http';

export interface LoginPayload {
  username: string;
  password: string;
}
function login(data: LoginPayload) {
  return httpRequest.post<any, HttpResponse>('/auth/login', data);
}

export interface RegisterPayload {
  username: string;
  password: string;
  fullname: string;
}
function register(data: RegisterPayload) {
  return httpRequest.post<any, HttpResponse>('/auth/register', data);
}

const userService = {
  login,
  register,
};

export default userService;
