import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuoteDialog from "@/components/dialog/QuoteDialog.tsx";
import {AuthService} from "@/api";
import DataService, {ExchangePriceRespItem} from "@/api/services/data-service.ts";

// 类型定义（保留原有业务类型）
interface CurrencyRate {
  pair: string;
  price: number;
  change: number;
}
interface AssetActivity {
  id: number;
  type: 'recharge' | 'withdraw' | 'transfer';
  amount: number;
  currency: string;
  time: string;
  status: 'pending' | 'completed' | 'failed';
}

const Transfer: React.FC = () => {
  const navigate = useNavigate();
  // 原有业务状态（保留）
  const [activeNav, setActiveNav] = useState<'overview' | 'account' | 'trade' | 'payment' | 'finance' | 'tools'>('overview');


  // 转账页面专属状态
  const [currentStep, setCurrentStep] = useState(2); // 1=选择账户；2=输入金额；3=确认信息
  const [transferAmount, setTransferAmount] = useState('100.00');
  const [fee, setFee] = useState('2.00');
  const [actualAmount, setActualAmount] = useState('98.00');
  const [fromStablecoin, setFromStablecoin] = useState('USDT'); // 转出稳定币币种
  const [showQuoteDialog, setShowQuoteDialog] = useState(false); // 控制报价弹窗显示
  const [isLoading, setIsLoading] = useState(false); // 控制Loading页面显示
  const [dialogTxt, setDialogTxt] = useState("");

  const handleTransferAmountChange = (value: string) => {
    setTransferAmount(value);
    const amount = parseFloat(value) || 0;
    const calculatedFee = (amount * 0.02).toFixed(2);
    const calculatedActualAmount = (amount * 0.98).toFixed(2);
    setFee(calculatedFee);
    setActualAmount(calculatedActualAmount);
  };
  const [accountName, setAccountName] = useState('**** ****');
  const [transferAccount, setTransferAccount] = useState('**** **** 1234');
  const [remittanceName, setRemittanceName] = useState('XTransfer及合作机构');
  const [arrivalTime, setArrivalTime] = useState('1~3个工作日');
  const [transactionPassword, setTransactionPassword] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [selectedStablecoin, setSelectedStablecoin] = useState('USDT');
  const [quoteData, setQuoteData] = useState<ExchangePriceRespItem[]>([]);

  // 原有事件处理函数（保留）
  const handleUserIconClick = () => {
    navigate('/identity');
  };

  const handleShowPriceQuote = async () => {
    setIsLoading(true);
    setDialogTxt("正在查询报价，请稍候...");
    try{
      const response = await DataService.getPriceQuote({
        "tokenSymbol": selectedStablecoin,
        "amount": transferAmount
      });
      console.log(response);

      setIsLoading(false);
      setShowQuoteDialog(true);
      setQuoteData(response.data);

    }catch (error) {
      setIsLoading(false);
      // 错误已由拦截器统一处理
    }
  };

  const triggerTransfer = async () => {
    setIsLoading(true);
    setDialogTxt("正在提交转账请求，请稍候...");
    try{
      const response = await DataService.triggerTransfer({
        "fromUserId": localStorage.getItem('userId') || '',
        "toUserId": "9822fc98d32744ab9e97b6a1e6810426",
        "toAddress": recipientAddress,
        "chainType": "ETHEREUM",
        "tokenSymbol": fromStablecoin,
        "amount": transferAmount
      });
      console.log(response);
      setIsLoading(false);
      navigate('/transferResult',{
        state:{
          txHash: response.data.txHash
        }
      });

    }catch (error) {
      setIsLoading(false);
      // 错误已由拦截器统一处理
    }
  };

  // ========== 转账页面核心渲染逻辑 ==========
  const renderTransferPage = () => (
    <div style={styles.transferContainer}>
      <h2 style={styles.pageTitle}>转账给他人</h2>

      {/* 步骤引导条 */}
      <div style={styles.stepsBar}>
        <div style={styles.stepItem}>（1）选择账户</div>
        <div style={{ ...styles.stepItem, ...styles.activeStepItem }}>（2）输入金额</div>
        <div style={styles.stepItem}>（3）确认信息</div>
      </div>

      {/* 表单卡片 */}
      <div style={styles.formCard}>
        {/* 收款方链上地址 */}
        <div style={styles.infoRow}>
          <span style={styles.label}>收款方链上地址</span>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            style={styles.amountInput}
          />
        </div>

        {/* 转出稳定币币种 */}
        <div style={styles.infoRow}>
          <span style={styles.label}>转出稳定币币种</span>
          <select
            value={fromStablecoin}
            onChange={(e) => setFromStablecoin(e.target.value)}
            style={styles.formSelect}
          >
            <option value="USDT">USDT</option>
            <option value="USDC">USDC</option>
            <option value="EURC">EURC</option>
          </select>
        </div>

        {/* 转入稳定币币种 */}
        <div style={styles.infoRow}>
          <span style={styles.label}>转入稳定币币种</span>
          <select
            value={selectedStablecoin}
            onChange={(e) => setSelectedStablecoin(e.target.value)}
            style={styles.formSelect}
          >
            <option value="USDT">USDT</option>
            <option value="USDC">USDC</option>
            <option value="EURC">EURC</option>
          </select>
        </div>

        {/* 转账金额信息 */}
        <div style={styles.infoRow}>
          <span style={styles.label}>转账金额</span>
          <input
            type="text"
            value={transferAmount}
            onChange={(e) => handleTransferAmountChange(e.target.value)}
            style={{ ...styles.amountInput, textAlign: 'right' }}
          />
        </div>
        <div style={styles.infoRow}>
          <span style={styles.label}>手续费</span>
          <span style={styles.feeValue}>
            {fee} USD <span style={styles.feeNote}>(转账金额中扣除)</span>
          </span>
        </div>
        <div style={styles.actualAmountRow}>
          <span style={styles.actualLabel}>实际转出金额</span>
          <span style={styles.actualValue}>{actualAmount} USD</span>
        </div>

        {/* 账户信息区域 */}
        <div style={styles.accountInfoSection}>
          <div style={styles.infoRow}>
            <span style={styles.label}>账户名称</span>
            <span style={styles.value}>{accountName}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>转账账户</span>
            <span style={styles.value}>{transferAccount}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>汇款人名称</span>
            <span style={styles.value}>{remittanceName}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>预计到账时间</span>
            <span style={styles.value}>{arrivalTime}</span>
          </div>
        </div>

        {/* 交易密码区域 */}
        <div style={styles.passwordSection}>
          <span style={styles.label}>交易密码</span>
          <a href="#" style={styles.forgotLink} onClick={() => {}}>
            忘记交易密码？
          </a>
          <input
            type="password"
            value={transactionPassword}
            onChange={(e) => setTransactionPassword(e.target.value)}
            placeholder="请输入交易密码"
            style={styles.passwordInput}
          />
        </div>
      </div>

      {/* 底部按钮组 */}
      <div style={styles.buttonGroup}>
        <button
          style={{ ...styles.navButton, ...styles.prevButton, flex: 1 }}
          onClick={handleShowPriceQuote}
        >
          报价
        </button>
        <button
          style={{ ...styles.navButton, ...styles.nextButton, flex: 1 }}
          onClick={triggerTransfer}
        >
          发起转账
        </button>
      </div>
      <QuoteDialog
        isOpen={showQuoteDialog}
        onClose={() => setShowQuoteDialog(false)}
        title="报价详情"
      >
        {renderExchangeDetail()}
      </QuoteDialog>
    </div>
  );

  const renderExchangeDetail = () => {
    return (
      <div style={styles.exchangeDetail}>
        {quoteData.map((quote, index) => (
          <div key={index} style={styles.quoteCard}>
            <p><strong>渠道:</strong> {quote.interfaceType}</p>
            <p><strong>转入币种:</strong> {quote.tokenASymbol}</p>
            <p><strong>转出币种:</strong> {quote.tokenBSymbol}</p>
            <p><strong>输入金额:</strong> {quote.inputAmount} {quote.tokenASymbol}</p>
            <p><strong>输出金额:</strong> {quote.estimatedOutput} {quote.tokenBSymbol}</p>
            <p><strong>转换比率:</strong> {quote.exchangeRate}</p>
            <p><strong>兑换路径:</strong> {quote.path}</p>
          </div>
        ))}
        <button
          style={styles.confirmButton}
          onClick={() => setShowQuoteDialog(false)}
        >
          确定
        </button>
      </div>
    );
  };

  // ========== 渲染整体页面（保留导航栏，替换 main 内容） ==========
  return (
    <>
      {isLoading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingContent}>
            {/*<div style={styles.spinner}></div>*/}
            <p style={styles.loadingText}>{dialogTxt}</p>
          </div>
        </div>
      )}
      <div style={styles.container}>
        {/* 顶部导航栏（完全保留原有逻辑） */}
        <header style={styles.header}>
          <div style={styles.logo}>X DEMO</div>
          <nav style={styles.nav}>
            <a
              href="#"
              style={activeNav === 'overview' ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink}
              onClick={() => setActiveNav('overview')}
            >
              总览
            </a>
            <a
              href="#"
              style={activeNav === 'account' ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink}
              onClick={() => setActiveNav('account')}
            >
              账户
            </a>
            <a
              href="#"
              style={activeNav === 'trade' ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink}
              onClick={() => setActiveNav('trade')}
            >
              交易
            </a>
            <a
              href="#"
              style={activeNav === 'payment' ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink}
              onClick={() => setActiveNav('payment')}
            >
              支付
            </a>
            <a
              href="#"
              style={activeNav === 'finance' ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink}
              onClick={() => setActiveNav('finance')}
            >
              理财
            </a>
            <a
              href="#"
              style={activeNav === 'tools' ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink}
              onClick={() => setActiveNav('tools')}
            >
              工具箱
            </a>
            <div style={styles.userIcon} onClick={handleUserIconClick}>
              👤
            </div>
          </nav>
        </header>

        {/* 主要内容区域：替换为转账页面 */}
        <main style={styles.main}>
          {renderTransferPage()}
        </main>
      </div>
    </>

  );
};

// ========== 样式定义（合并原有与转账页面新样式） ==========
const styles: { [key: string]: React.CSSProperties } = {
  // 原有全局样式（保留基础布局）
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
    color: '#333',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1890ff',
  },
  nav: {
    display: 'flex',
    gap: '32px',
    flex: 1,
    marginLeft: '200px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#666',
    fontSize: '16px',
    padding: '8px 0',
  },
  activeNavLink: {
    color: '#1890ff',
    borderBottom: '2px solid #1890ff',
  },
  userIcon: {
    cursor: 'pointer',
    fontSize: '20px',
    marginLeft: 'auto',
    padding: '8px 0',
  },

  // 充值页面专属样式（保留但不影响当前渲染）
  rechargeContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    maxWidth: '1200px',
    margin: '0 auto',
    marginTop: '24px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  stepsBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '24px',
    color: '#666',
    fontSize: '16px',
  },
  stepItem: {
    position: 'relative',
    padding: '0 16px',
    cursor: 'pointer',
  },
  activeStepItem: {
    color: '#1890ff',
    fontWeight: '600',
  },
  stepContent: {
    marginBottom: '24px',
  },
  formGroup: {
    marginBottom: '24px',
  },
  formLabel: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    fontSize: '14px',
    color: '#333',
  },
  formSelect: {
    width: '300px',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' strokeWidth=\'2\' strokeLinecap=\'round\' strokeLinejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    backgroundSize: '1em',
  },
  stepButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  navButton: {
    padding: '10px 20px',
    fontSize: '14px',
    border: '1px solid #1890ff',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    color: '#1890ff',
  },
  disabledButton: {
    color: '#999',
    borderColor: '#999',
    cursor: 'not-allowed',
  },

  // 转账页面新增样式
  transferContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: '0 auto',
    marginTop: '24px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  pageTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '24px',
    color: '#333',
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    marginBottom: '24px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
    fontSize: '14px',
    color: '#333',
  },
  label: {
    color: '#666',
  },
  value: {
    fontWeight: '500',
  },
  amountInput: {
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    padding: '8px',
    fontSize: '14px',
    width: '300px',
    outline: 'none',
  },
  currency: {
    marginLeft: '8px',
    fontWeight: '500',
  },
  feeValue: {
    display: 'flex',
    alignItems: 'center',
  },
  feeNote: {
    fontSize: '12px',
    color: '#999',
    marginLeft: '4px',
  },
  actualAmountRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '24px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
  },
  actualLabel: {
    color: '#666',
  },
  accountInfoSection: {
    marginBottom: '24px',
  },
  passwordSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  forgotLink: {
    alignSelf: 'flex-end',
    color: '#1890ff',
    textDecoration: 'none',
    fontSize: '14px',
  },
  passwordInput: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    outline: 'none',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  prevButton: {
    padding: '10px 20px',
    fontSize: '14px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    color: '#333',
  },
  nextButton: {
    padding: '10px 20px',
    fontSize: '14px',
    border: '1px solid #1890ff',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#1890ff',
    color: '#fff',
  },
  loadingOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  loadingContent: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #1890ff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px',
  },
  loadingText: {
    fontSize: '16px',
    color: '#333',
    margin: 0,
  },
  exchangeDetail: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '16px',
    width: '100%',
  },
  quoteCard: {
    backgroundColor: 'rgba(255, 153, 102, 0.5)',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    marginBottom: '16px',
  },
  confirmButton: {
    padding: '10px 20px',
    fontSize: '14px',
    border: '1px solid #1890ff',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#1890ff',
    color: '#fff',
    marginTop: '16px',
    alignSelf: 'center',
    width: '200px',
  },
};

export default Transfer;
