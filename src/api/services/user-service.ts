import { httpClient, BaseResponse } from '../http-client';

// 用户信息
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

// 更新用户信息请求
export interface UpdateUserRequest {
  name?: string;
  avatar?: string;
}

// 用户列表响应
export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
}

// 用户列表查询参数
export interface UserQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: 'active' | 'inactive';
}

/**
 * 用户服务
 */
export class UserService {
  /**
   * 获取用户列表
   */
  static async getUsers(params?: UserQueryParams): Promise<BaseResponse<UserListResponse>> {
    return httpClient.get<UserListResponse>('/users', {
      params,
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 获取用户详情
   */
  static async getUserById(id: string): Promise<BaseResponse<User>> {
    return httpClient.get<User>(`/users/${id}`, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 更新用户信息
   */
  static async updateUser(id: string, data: UpdateUserRequest): Promise<BaseResponse<User>> {
    return httpClient.put<User>(`/users/${id}`, data, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 删除用户
   */
  static async deleteUser(id: string): Promise<BaseResponse<void>> {
    return httpClient.delete<void>(`/users/${id}`, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 更新用户头像
   */
  static async updateAvatar(id: string, avatarFile: File): Promise<BaseResponse<{ avatarUrl: string }>> {
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    return httpClient.post<{ avatarUrl: string }>(`/users/${id}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 修改密码
   */
  static async changePassword(
    id: string,
    currentPassword: string,
    newPassword: string
  ): Promise<BaseResponse<void>> {
    return httpClient.post<void>(`/users/${id}/change-password`, {
      currentPassword,
      newPassword,
    }, {
      showLoading: true,
      showError: true,
    });
  }
}

export default UserService;