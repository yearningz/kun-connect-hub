import { httpClient, BaseResponse } from '../http-client';

// 用户列表查询参数
export interface UserQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: 'active' | 'inactive';
}

export interface CurrencyRateReq {
  tokens?: [];
}

interface CurrencyRateRespItem {
  token1: string;
  token2: string;
  rate: string;
}

export interface CurrencyRateResp {
  data: CurrencyRateRespItem[],
  code: string;
  message: string;
}

export interface BlockchainAccountReq{
  "userId": string,
  "chainType": string
}

interface BlockchainAccountRespItem {
  "userId": string,
  "chainType": string,
  "chainName": string,
  "chainId": string,
  "address": string
}

export interface BlockchainAccountResp {
  data: BlockchainAccountRespItem,
  code: string;
  message: string;
}

/**
 * 用户服务
 */
export class DataService {
  /**
   * 获取货币汇率
   * @param data
   */
  static async getCurrencyRates(data: CurrencyRateReq): Promise<BaseResponse<CurrencyRateResp>> {
    return httpClient.post<CurrencyRateResp>('/api/v1/chainlink/getPrice',data,  {
      showLoading: true,
      showError: true,
    });
  }
  /**
   * 获取区块链账户
   * @param data
   */
  static async getBlockChainAccount(data: BlockchainAccountReq): Promise<BaseResponse<BlockchainAccountResp>> {
    return httpClient.post<BlockchainAccountResp>('/api/v1/account/registerNetwork',data,  {
      showLoading: true,
      showError: true,
    });
  }
}

export default DataService;
