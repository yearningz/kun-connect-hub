// API 入口文件
export * from './http-client';
export * from './services/auth-service';
export * from './services/user-service';

// 导出所有服务
export { default as httpClient } from './http-client';
export { default as AuthService } from './services/auth-service';
export { default as UserService } from './services/user-service';


/*
import { AuthService } from '@/api';

// 登录示例
const login = async () => {
  try {
    const response = await AuthService.login({
      email: 'user@example.com',
      password: 'password'
    });

    if (response.success) {
      // 登录成功，保存 token
      localStorage.setItem('auth_token', response.data.token);
    }
  } catch (error) {
    // 错误已由拦截器统一处理
  }
};
*/
