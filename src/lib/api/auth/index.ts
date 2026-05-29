import { userApi } from "@/lib/axios";
import { LoginRequest, ReissueRequest, SignUpRequest } from "./request";
import { LoginResponse, ReissueResponse, SignUpResponse } from "./response";

const router = "/auth";

export const login = async (body: LoginRequest) => {
  const { data } = await userApi.post<LoginResponse>(`${router}/login`, body);
return data;
};

export const signup = async (body: SignUpRequest) => {
  const { data } = await userApi.post<SignUpResponse>(`${router}/signup`, body);
  return data;
};

export const reissue = async (body: ReissueRequest) => {
  const { data } = await userApi.post<ReissueResponse>(`${router}/reissue`, body);
  return data;
};
