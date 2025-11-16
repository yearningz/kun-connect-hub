import { httpClient, BaseResponse } from '../http-client';
import {CancelToken} from "axios";


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


export interface ExchangePriceReq {
  "tokenASymbol": string,
  "tokenBSymbol": string,
  "amount": string
}

export interface  ExchangePriceRespItem {
  interface: string,
  "tokenAAddress": string,
  "tokenBAddress": string,
  "tokenASymbol": string,
  "tokenBSymbol": string,
  "inputAmount": string,
  "estimatedOutput": string,
  "exchangeRate": string,
  "path": string
}
export interface ExchangePriceResp {
  "data": ExchangePriceRespItem[]
  "statusCode": string,
  "msg": string
}

export interface TransferReq {
  "fromUserId": string,
  "toUserId": string,
  "toAddress": string,
  "chainType": string,
  "tokenBSymbol": string,
  "amount": string
}

export interface TransferRespItem {
  "txHash": string,
  "status": string,
  "fromAddress": string,
  "toAddress": string,
  "inputToken": string,
  "outputToken": string,
  "inputTokenSymbol": string,
  "outputTokenSymbol": string,
  "inputAmount": string,
  "outputAmount": string,
  "actualRate": string,
  "gasCost": string,
  "blockNumber": string
}

export interface TransferResp {
  "data": TransferRespItem,
  "statusCode": string,
  "msg": string
}

export interface TransferQueryReq {
  "txHash": string,
}
interface TokenTransferItem {
  "tokenAddress": string,
  "tokenSymbol": string,
  "fromAddress": string,
  "toAddress": string,
  "amount": string
}

export interface TransferResultItem {
  "txHash": string,
  "status": string,
  "blockNumber": string,
  "timestamp": string,
  "fromAddress": string,
  "toAddress": string,
  "gasUsed": string,
  "gasPrice": string,
  "gasCost": string,
  "inputData": string,
  "tokenTransfers": TokenTransferItem[]
}

export interface TransferQueryResp {
  "data": TransferResultItem
  "statusCode": string,
  "msg": string
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

  static async getPriceQuote(data: ExchangePriceReq): Promise<BaseResponse<ExchangePriceResp>> {
    return httpClient.post<ExchangePriceResp>('/api/v1/payment/getSwapQuote',data,  {
      showLoading: true,
      showError: true,
    });
  }

  static async triggerTransfer(data: TransferReq): Promise<BaseResponse<TransferResp>> {
    return httpClient.post<TransferResp>('/api/v1/payment/transferToken',data,  {
      showLoading: true,
      showError: true,
    });
  }

  static async getTransferResult(data: TransferQueryReq): Promise<BaseResponse<TransferQueryResp>> {
    return httpClient.post<TransferQueryResp>('/api/v1/payment/getTransactionDetail',data,  {
      showLoading: true,
      showError: true,
    });
  }
}

export default DataService;
