import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

const Recharge: React.FC = () => {
  const navigate = useNavigate();
  // 原有业务状态（保留）
  const [balance, setBalance] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'recent' | 'ongoing' | 'completed'>('recent');
  const [activeNav, setActiveNav] = useState<'overview' | 'account' | 'trade' | 'payment' | 'finance' | 'tools'>('overview');
  const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>([]);
  const [assetActivities, setAssetActivities] = useState<AssetActivity[]>([]);

  // 充值页面专属状态
  const [activeStep, setActiveStep] = useState(0); // 0=选择币种&网络；1=充值详情
  const [selectedCurrency, setSelectedCurrency] = useState('USDT'); // 默认选中 USDT
  const [selectedNetwork, setSelectedNetwork] = useState(''); // 默认未选网络


  // 原有数据请求逻辑（保留）
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setBalance(5000); // 模拟余额数据
      } catch (error) {
        console.error('Failed to fetch balance:', error);
      }
    };
    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        setCurrencyRates([
          { pair: 'BTC/USDT', price: 0.99995, change: 0.04 },
          { pair: 'BTC/USDT', price: 7.777, change: -0.07 },
          { pair: 'USDT/USDC', price: 7.777, change: -0.07 },
        ]);
      } catch (error) {
        console.error('Failed to fetch currency rates:', error);
      }
    };
    fetchCurrencyRates();
  }, []);

  useEffect(() => {
    const fetchAssetActivities = async () => {
      try {
        setAssetActivities([
          { id: 1, type: 'recharge', amount: 1000, currency: 'USDT', time: '2023-10-15 14:30', status: 'completed' },
          { id: 2, type: 'transfer', amount: 500, currency: 'USDT', time: '2023-10-14 09:15', status: 'completed' },
          { id: 3, type: 'withdraw', amount: 200, currency: 'USDT', time: '2023-10-13 16:45', status: 'pending' },
        ]);
      } catch (error) {
        console.error('Failed to fetch asset activities:', error);
      }
    };
    fetchAssetActivities();
  }, []);

  // 原有事件处理函数（保留）
  const handleUserIconClick = () => {
    navigate('/identity');
  };



  // ========== 充值页面核心渲染逻辑（替换 main 内容） ==========
  const renderRechargePage = () => (
    <div style={styles.rechargeContainer}>
      {/* 步骤引导条 */}
      <div style={styles.stepsBar}>
        <div
          style={{
            ...styles.stepItem,
            ...(activeStep === 0 ? styles.activeStepItem : {}),
          }}
        >
          1 选择你要充值的数字货币
        </div>
        <div
          style={{
            ...styles.stepItem,
            ...(activeStep === 1 ? styles.activeStepItem : {}),
          }}
        >
          2 充值详情
        </div>
      </div>

      {/* 步骤内容区 */}
      <div style={styles.stepContent}>
        {activeStep === 0 ? (
          <>
            {/* 币种选择下拉框 */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>选择你要充值的数字货币</label>
              <select
                style={styles.formSelect}
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
              >
                <option value="USDT">USDT</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
              </select>
            </div>

            {/* 网络选择下拉框 */}
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>网络</label>
              <select
                style={styles.formSelect}
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
              >
                <option value="">请选择网络</option>
                <option value="ETH_ERC20">ETH_ERC20</option>
                <option value="TRX_ERC20">TRX_ERC20</option>
              </select>
              {/* 充值地址模块 */}
              {selectedNetwork && (
                <div style={styles.addressContainer}>
                  <div style={styles.addressLabel}>充值地址</div>
                  <div style={styles.addressValue}>xxxxxxxxxxxx</div>
                  <div style={styles.tip}>最小充值数: 200.00 USDT</div>
                  <div style={styles.tip}>预计到账: 12次网络确认</div>
                  <div style={styles.warning}>
                    此地址只可接收 {selectedCurrency}，请确认主网络是 {selectedNetwork}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <p>请选择币种和网络后，查看充值地址及详情</p>
        )}
      </div>

      {/* 步骤切换按钮 */}
      <div style={styles.stepButtons}>
        <button
          style={{
            ...styles.navButton,
            ...(activeStep === 0 ? styles.disabledButton : {}),
          }}
          disabled={activeStep === 0}
          onClick={() => setActiveStep(1)}
        >
          下一步
        </button>
        <button
          style={{
            ...styles.navButton,
            ...(activeStep === 1 ? styles.disabledButton : {}),
          }}
          disabled={activeStep === 1}
          onClick={() => setActiveStep(0)}
        >
          上一步
        </button>
      </div>
    </div>
  );


  // ========== 渲染整体页面（保留导航栏，替换 main 内容） ==========
  return (
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

      {/* 主要内容区域：替换为充值页面 */}
      <main style={styles.main}>
        {renderRechargePage()}
      </main>
    </div>
  );
};


// ========== 样式定义（合并原有与充值页面新样式） ==========
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
    justifyContent: 'flex-start',
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

  // 充值页面专属样式
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
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    appearance: 'none', // 隐藏默认下拉箭头
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
  addressContainer: {
    marginTop: '16px',
    padding: '16px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    border: '1px solid #e8e8e8',
  },
  addressLabel: {
    fontWeight: '500',
    marginBottom: '8px',
    color: '#333',
    fontSize: '16px',
  },
  addressValue: {
    fontFamily: 'monospace',
    marginBottom: '16px',
    color: '#1890ff',
    fontSize: '16px',
  },
  tip: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
  },
  warning: {
    fontSize: '14px',
    color: '#f00',
    marginBottom: '16px',
  },
};


export default Recharge;
