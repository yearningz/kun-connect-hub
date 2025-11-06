import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// 基础响应类型
export interface BaseResponse<T = never> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

// 请求配置接口
export interface RequestConfig extends AxiosRequestConfig {
  // 是否显示加载提示
  showLoading?: boolean;
  // 是否显示错误提示
  showError?: boolean;
  // 重试次数
  retryCount?: number;
}

// 创建 axios 实例
class HttpClient {
  private instance: AxiosInstance;
  private baseURL: string;

  constructor(baseURL?: string) {
    //this.baseURL = "http://dev-cn.your-api-server.com/api";
    this.baseURL = "http://127.0.0.1:4523/m1/7353622-7084427-default/"

    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  // 设置拦截器
  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 添加认证 token
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // 显示加载提示
        if ((config as RequestConfig).showLoading) {
          // 这里可以集成项目的 toast 或 loading 组件
          console.log('请求开始，显示加载提示');
        }

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 隐藏加载提示
        if ((response.config as RequestConfig).showLoading) {
          console.log('请求完成，隐藏加载提示');
        }

        return response;
      },
      (error: AxiosError) => {
        // 隐藏加载提示
        if (error.config && (error.config as RequestConfig).showLoading) {
          console.log('请求失败，隐藏加载提示');
        }

        // 错误处理
        this.handleError(error);

        return Promise.reject(error);
      }
    );
  }

  // 错误处理
  private handleError(error: AxiosError) {
    if (error.response) {
      // 服务器返回错误状态码
      const status = error.response.status;
      const config = error.config as RequestConfig;

      if (config.showError !== false) {
        // 根据状态码显示不同的错误提示
        switch (status) {
          case 401:
            console.error('未授权，请重新登录');
            // 清除 token 并跳转到登录页
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
            break;
          case 403:
            console.error('禁止访问');
            break;
          case 404:
            console.error('请求的资源不存在');
            break;
          case 500:
            console.error('服务器内部错误');
            break;
          default:
            console.error('请求失败，请稍后重试');
        }
      }
    } else if (error.request) {
      // 请求未收到响应
      console.error('网络错误，请检查网络连接');
    } else {
      // 请求配置错误
      console.error('请求配置错误');
    }
  }

  // 通用请求方法
  public async request<T = never>(config: RequestConfig): Promise<BaseResponse<T>> {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await this.instance.request<BaseResponse<T>>(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // GET 请求
  public async get<T = never>(url: string, config?: RequestConfig): Promise<BaseResponse<T>> {
    return this.request<T>({
      ...config,
      method: 'GET',
      url,
    });
  }

  // POST 请求
  public async post<T = never>(url: string, data?: never, config?: RequestConfig): Promise<BaseResponse<T>> {
    return this.request<T>({
      ...config,
      method: 'POST',
      url,
      data,
    });
  }

  // PUT 请求
  public async put<T = never>(url: string, data?: never, config?: RequestConfig): Promise<BaseResponse<T>> {
    return this.request<T>({
      ...config,
      method: 'PUT',
      url,
      data,
    });
  }

  // DELETE 请求
  public async delete<T = never>(url: string, config?: RequestConfig): Promise<BaseResponse<T>> {
    return this.request<T>({
      ...config,
      method: 'DELETE',
      url,
    });
  }

  // PATCH 请求
  public async patch<T = never>(url: string, data?: never, config?: RequestConfig): Promise<BaseResponse<T>> {
    return this.request<T>({
      ...config,
      method: 'PATCH',
      url,
      data,
    });
  }

  // 设置认证 token
  public setAuthToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // 清除认证 token
  public clearAuthToken(): void {
    localStorage.removeItem('auth_token');
  }

  // 获取 axios 实例（用于特殊配置）
  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

// 创建默认的 http 客户端实例
export const httpClient = new HttpClient();

export default httpClient;
