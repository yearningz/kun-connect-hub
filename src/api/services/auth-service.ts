import { httpClient, BaseResponse } from '../http-client';

// 登录请求参数
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginRequest1 {
  phoneNumber: string,
  areaCode: string
}

// 登录响应数据
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
}

// 注册请求参数
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// 注册响应数据
export interface RegisterResponse {
  id: string;
  email: string;
  name: string;
}

// 用户信息
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 认证服务
 */
export class AuthService {
  /**
   * 用户登录
   */
  static async login(data: LoginRequest1): Promise<BaseResponse<LoginResponse>> {
    return httpClient.post<LoginResponse>('v1/auth/sendSmsCode', data, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 用户注册
   */
  static async register(data: RegisterRequest): Promise<BaseResponse<RegisterResponse>> {
    return httpClient.post<RegisterResponse>('/auth/register', data, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 获取当前用户信息
   */
  static async getCurrentUser(): Promise<BaseResponse<UserProfile>> {
    return httpClient.get<UserProfile>('/auth/me', {
      showLoading: false,
      showError: true,
    });
  }

  /**
   * 刷新 token
   */
  static async refreshToken(): Promise<BaseResponse<{ token: string }>> {
    return httpClient.post<{ token: string }>('/auth/refresh', {}, {
      showLoading: false,
      showError: false,
    });
  }

  /**
   * 用户登出
   */
  static async logout(): Promise<BaseResponse<void>> {
    return httpClient.post<void>('/auth/logout', {}, {
      showLoading: false,
      showError: false,
    });
  }

  /**
   * 忘记密码
   */
  static async forgotPassword(email: string): Promise<BaseResponse<void>> {
    return httpClient.post<void>('/auth/forgot-password', { email }, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 重置密码
   */
  static async resetPassword(token: string, newPassword: string): Promise<BaseResponse<void>> {
    return httpClient.post<void>('/auth/reset-password', { token, newPassword }, {
      showLoading: true,
      showError: true,
    });
  }
}

export default AuthService;
