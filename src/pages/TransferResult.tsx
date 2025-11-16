import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import QuoteDialog from "@/components/dialog/QuoteDialog.tsx";
import { AuthService } from "@/api";
import DataService, {ExchangePriceRespItem, TransferResultItem} from "@/api/services/data-service.ts";

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

const TransferResult: React.FC = () => {
  const navigate = useNavigate();
  // 原有业务状态（保留）
  const [activeNav, setActiveNav] = useState<'overview' | 'account' | 'trade' | 'payment' | 'finance' | 'tools'>('overview');

  // 转账结果页面专属状态
  const [isLoading, setIsLoading] = useState(false); // 控制Loading页面显示
  const [dialogTxt, setDialogTxt] = useState("");
  const [copySuccess, setCopySuccess] = useState(false); // 复制成功提示状态
  const [isCopyBtnHover, setIsCopyBtnHover] = useState(false); // 复制按钮hover状态
  const [isQueryBtnHover, setIsQueryBtnHover] = useState(false); // 查询按钮hover状态
  const [resultQueried, setResultQueried] = useState(false); // 交易结果查询成功状态
  const [transferResult, setTransferResult] = useState<TransferResultItem>();

  const location = useLocation();
  const { txHash } = location.state; // 直接拿对象

  // 复制hash值函数
  const copyHashToClipboard = () => {
    navigator.clipboard.writeText(txHash);
    setCopySuccess(true);
    // 3秒后隐藏复制成功提示
    setTimeout(() => setCopySuccess(false), 3000);
  };

  // 查询交易结果函数
  const queryTransactionResult = async () => {
    setIsLoading(true);
    setDialogTxt("正在查询交易结果，请稍候...");
    try {
      const response = await DataService.getTransferResult({
        txHash : txHash
      });

      console.log(response);
      setIsLoading(false);
      setTransferResult(response.data);
      setResultQueried(true);
    } catch (error) {
      setIsLoading(false);
      // 错误已由拦截器统一处理
    }
  };

  // 原有事件处理函数（保留）
  const handleUserIconClick = () => {
    navigate('/identity');
  };

  // ========== 转账结果页面核心渲染逻辑 ==========
  const renderTransferPage = () => (
    <div style={styles.transferContainer}>
      <h2 style={styles.pageTitle}>转账提交成功</h2>

      {/* 转账Hash展示区域 */}
      <div style={styles.hashContainer}>
        <span style={styles.hashLabel}>转账Hash：</span>
        <span
          style={styles.hashValue}
          onClick={copyHashToClipboard}
        >
          {txHash}
        </span>
        <button
          style={{ ...styles.copyButton, ...(isCopyBtnHover ? styles.copyButtonHover : {}) }}
          onClick={copyHashToClipboard}
          onMouseEnter={() => setIsCopyBtnHover(true)}
          onMouseLeave={() => setIsCopyBtnHover(false)}
        >
          复制
        </button>
        {copySuccess && <span style={styles.copySuccessTip}>复制成功！</span>}
      </div>

      {/* 提示语模块 */}
      <div style={styles.tipContainer}>
        <p style={styles.tipText}>
          转账已经提交，请稍后点击查询交易结果按钮，进行查询。
        </p>
      </div>

      {/* 查询按钮 */}
      <div style={styles.buttonContainer}>
        <button
          style={{ ...styles.queryButton, ...(isQueryBtnHover ? styles.queryButtonHover : {}) }}
          onClick={queryTransactionResult}
          onMouseEnter={() => setIsQueryBtnHover(true)}
          onMouseLeave={() => setIsQueryBtnHover(false)}
        >
          查询交易结果
        </button>
      </div>
    </div>
  );

  const resultQuerySuccess = (data:TransferResultItem) => {
    const formatTimestamp = (timestamp: string) => {
      const date = new Date(parseInt(timestamp) * 1000);
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    };

    return (
      <div style={styles.transferContainer}>
        <h2 style={styles.pageTitle}>转账结果</h2>

        {/* 转账状态 */}
        <div style={{ ...styles.hashContainer, justifyContent: 'center', marginBottom: '24px' }}>
          <span style={{ color: data.status === 'success' ? '#52c41a' : '#f5222d', fontSize: '18px', fontWeight: '600' }}>
            {data.status === 'success' ? '转账成功' : '转账失败'}
          </span>
        </div>

        {/* 转账金额和币种 */}
        <div style={{ ...styles.hashContainer, justifyContent: 'center', marginBottom: '24px' }}>
          <span style={styles.hashValue}>
            {data.tokenTransfers[0].amount} {data.tokenTransfers[0].tokenSymbol} → {data.tokenTransfers[1].amount} {data.tokenTransfers[1].tokenSymbol}
          </span>
        </div>

        {/* 交易哈希 */}

        <div style={styles.hashContainer}>
          <span style={styles.hashLabel}>转账Hash：</span>
          <span
            style={styles.hashValue}
            onClick={copyHashToClipboard}
          >
          {data.txHash}
        </span>
          <button
            style={{ ...styles.copyButton, ...(isCopyBtnHover ? styles.copyButtonHover : {}) }}
            onClick={copyHashToClipboard}
            onMouseEnter={() => setIsCopyBtnHover(true)}
            onMouseLeave={() => setIsCopyBtnHover(false)}
          >
            复制
          </button>
          {copySuccess && <span style={styles.copySuccessTip}>复制成功！</span>}
        </div>

        {/* 表单卡片 */}
        <div style={styles.tipContainer}>
          {/* 转出地址 */}
          <div style={{ ...styles.hashContainer, justifyContent: 'space-between' }}>
            <span style={styles.hashLabel}>转出地址</span>
            <span style={styles.hashValue}>{data.fromAddress}</span>
          </div>

          {/* 转入地址 */}
          <div style={{ ...styles.hashContainer, justifyContent: 'space-between' }}>
            <span style={styles.hashLabel}>转入地址</span>
            <span style={styles.hashValue}>{data.toAddress}</span>
          </div>

          {/* 区块数 */}
          <div style={{ ...styles.hashContainer, justifyContent: 'space-between' }}>
            <span style={styles.hashLabel}>区块数</span>
            <span style={styles.hashValue}>{data.blockNumber}</span>
          </div>

          {/* Gas 费用 */}
          <div style={{ ...styles.hashContainer, justifyContent: 'space-between' }}>
            <span style={styles.hashLabel}>Gas 费用</span>
            <span style={styles.hashValue}>{data.gasUsed}</span>
          </div>

          {/* 确认时间 */}
          <div style={{ ...styles.hashContainer, justifyContent: 'space-between' }}>
            <span style={styles.hashLabel}>确认时间</span>
            <span style={styles.hashValue}>{formatTimestamp(data.timestamp)}</span>
          </div>
        </div>

        {/* 底部按钮组 */}
        <div style={styles.buttonContainer}>
          <button
            style={{ ...styles.queryButton, ...(isQueryBtnHover ? styles.queryButtonHover : {}) }}
            onClick={() => navigate('/main')}
            onMouseEnter={() => setIsQueryBtnHover(true)}
            onMouseLeave={() => setIsQueryBtnHover(false)}
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  // ========== 渲染整体页面（保留导航栏，替换 main 内容） ==========
  return (
    <>
      {isLoading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingContent}>
            <p style={styles.loadingText}>{dialogTxt}</p>
          </div>
        </div>
      )}
      <div style={styles.container}>
        {/* 顶部导航栏（完全保留原有逻辑） */}
        <header style={styles.header}>
          <div style={styles.logo}>KUN</div>
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

        {/* 主要内容区域：替换为转账结果页面 */}
        <main style={styles.main}>
          {resultQueried ? resultQuerySuccess(transferResult) : renderTransferPage()}
        </main>
      </div>
    </>

  );
};

// ========== 样式定义（修复报错，移除不支持的伪类语法） ==========
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

  // 转账结果页面样式
  transferContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: '0 auto',
    marginTop: '24px',
    padding: '48px 24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    textAlign: 'center', // 整体内容居中
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '40px',
    color: '#333',
  },
  hashContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '32px',
  },
  hashLabel: {
    fontSize: '16px',
    color: '#666',
  },
  /*amountShow:{
    fontSize: '18px',
    color: '#ff4d4f', // 红色字体
    fontWeight: '500',
    cursor: 'pointer',
    textDecoration: 'underline',
  },*/
  hashValue: {
    fontSize: '18px',
    color: '#000', // 红色字体
    fontWeight: '500',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  copyButton: {
    padding: '6px 12px',
    fontSize: '14px',
    border: '1px solid #1890ff',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    color: '#1890ff',
    transition: 'all 0.3s ease', // 修复transition语法
  },
  // 单独定义hover状态样式（通过状态控制）
  copyButtonHover: {
    backgroundColor: '#f0f7ff',
  },
  copySuccessTip: {
    fontSize: '14px',
    color: '#52c41a', // 绿色提示
    marginLeft: '8px',
  },
  tipContainer: {
    marginBottom: '40px',
    padding: '0 24px',
  },
  tipText: {
    fontSize: '16px',
    color: '#333',
    lineHeight: '1.8',
    margin: 0,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  queryButton: {
    padding: '14px 48px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#1890ff', // 整体蓝色背景
    color: '#fff',
    fontWeight: '500',
    transition: 'all 0.3s ease', // 修复transition语法
  },
  // 单独定义查询按钮hover状态
  queryButtonHover: {
    backgroundColor: '#096dd9',
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

// 为动画添加全局样式（修复spin动画未定义问题）
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default TransferResult;
