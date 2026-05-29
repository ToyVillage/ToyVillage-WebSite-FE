export interface LoginResponse {
  access_token: string;
}

export interface SignUpResponse {
  massage: string;
}

export interface ApiErrorResponse {
  message: string;
  status: number;
  timestamp: string;
  description: string;
}
