import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

// 定义类型
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

// 主要组件
const Main: React.FC = () => {
  // 模拟数据
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'recent' | 'ongoing' | 'completed'>('recent');

  const handleUserIconClick = () => {
    //console.log('用户图标被点击');
    navigate('/identity');
    // 这里可以添加点击后的逻辑，例如跳转到用户页面或显示用户菜单
  };

  const currencyRates: CurrencyRate[] = [
    { pair: 'USDT/USD', price: 0.99995, change: 0.04 },
    { pair: 'USDT/HKD', price: 7.777, change: -0.07 }
  ];

  const assetActivities: AssetActivity[] = [
    { id: 1, type: 'recharge', amount: 1000, currency: 'USDT', time: '2023-10-15 14:30', status: 'completed' },
    { id: 2, type: 'transfer', amount: 500, currency: 'USDT', time: '2023-10-14 09:15', status: 'completed' },
    { id: 3, type: 'withdraw', amount: 200, currency: 'USDT', time: '2023-10-13 16:45', status: 'pending' }
  ];

  // 过滤活动数据
  const filteredActivities = assetActivities.filter(activity => {
    if (activeTab === 'recent') return true;
    if (activeTab === 'ongoing') return activity.status === 'pending';
    if (activeTab === 'completed') return activity.status === 'completed';
    return true;
  });

  return (
    <div style={styles.container}>
      {/* 顶部导航栏 */}
      <header style={styles.header}>
        <div style={styles.logo}>KUN</div>
        <nav style={styles.nav}>
          <a href="#" style={{...styles.navLink, ...styles.activeNavLink}}>总览</a>
          <a href="#" style={styles.navLink}>账户</a>
          <a href="#" style={styles.navLink}>交易</a>
          <a href="#" style={styles.navLink}>支付</a>
          <a href="#" style={styles.navLink}>理财</a>
          <a href="#" style={styles.navLink}>工具箱</a>
          <div style={styles.userIcon} onClick={handleUserIconClick}>👤</div>
        </nav>
      </header>

      {/* 主要内容区域 */}
      <main style={styles.main}>
        {/* 余额和交易限额区域 */}
        <div style={styles.balanceSection}>
          <div style={styles.balanceCard}>
            <div style={styles.balanceHeader}>
              <span style={styles.balanceTitle}>总余额</span>
              <div style={styles.walletIcon}>💰</div>
            </div>
            <div style={styles.balanceAmount}>
              {balance !== null ? `$${balance.toFixed(2)}` : '当前账户没有可用资产'}
            </div>
            <p style={styles.balanceHint}>
              您可以通过法币或者数字货币进行充值
            </p>
            <button style={styles.rechargeButton}>充值</button>
          </div>

          <div style={styles.limitCard}>
            <div style={styles.limitHeader}>
              <span style={styles.limitTitle}>交易限额</span>
            </div>
            <button style={styles.increaseLimitButton}>去提额</button>
          </div>
        </div>

        {/* 资产动态和市场价格区域 */}
        <div style={styles.infoSection}>
          {/* 资产动态 */}
          <div style={styles.assetActivity}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>资产动态</h3>
              <div style={styles.activityTabs}>
                <button
                  style={activeTab === 'recent' ? {...styles.tabButton, ...styles.activeTab} : styles.tabButton}
                  onClick={() => setActiveTab('recent')}
                >
                  最近
                </button>
                <button
                  style={activeTab === 'ongoing' ? {...styles.tabButton, ...styles.activeTab} : styles.tabButton}
                  onClick={() => setActiveTab('ongoing')}
                >
                  进行中
                </button>
                <button
                  style={activeTab === 'completed' ? {...styles.tabButton, ...styles.activeTab} : styles.tabButton}
                  onClick={() => setActiveTab('completed')}
                >
                  已完成
                </button>
              </div>
              <button style={styles.viewAllButton}>查看全部</button>
            </div>

            <div style={styles.activityList}>
              {filteredActivities.length > 0 ? (
                filteredActivities.map(activity => (
                  <div key={activity.id} style={styles.activityItem}>
                    <div style={styles.activityInfo}>
                      <span style={styles.activityType}>
                        {activity.type === 'recharge' ? '充值' :
                          activity.type === 'withdraw' ? '提现' : '转账'}
                      </span>
                      <span style={styles.activityTime}>{activity.time}</span>
                    </div>
                    <div style={styles.activityAmount}>
                      {activity.amount} {activity.currency}
                    </div>
                  </div>
                ))
              ) : (
                <div style={styles.noActivity}>暂无活动记录</div>
              )}
            </div>
          </div>

          {/* 市场价格 */}
          <div style={styles.marketPrice}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>市场价格</h3>
              <div style={styles.timeFilter}>
                <span style={styles.timeLabel}>1D</span>
              </div>
            </div>

            <div style={styles.priceTable}>
              <div style={styles.tableHeader}>
                <span style={styles.tableCol}>交易币种</span>
                <span style={styles.tableCol}>当前价格</span>
                <span style={styles.tableCol}>涨跌幅(1日)</span>
              </div>

              {currencyRates.map((rate, index) => (
                <div key={index} style={styles.tableRow}>
                  <span style={styles.tableCol}>
                    <span style={styles.currencyIcon}>₮</span>
                    {rate.pair.split('/')[0]}
                  </span>
                  <span style={styles.tableCol}>{rate.price}</span>
                  <span style={{
                    ...styles.tableCol,
                    color: rate.change >= 0 ? '#f56c6c' : '#67c23a'
                  }}>
                    {rate.change >= 0 ? '+' : ''}{rate.change}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// 样式定义
const styles: { [key: string]: React.CSSProperties } = {
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
  userIcon: {
    cursor: 'pointer',
    fontSize: '20px',
    marginLeft: 'auto',
    padding: '8px 0',
  },
  activeNavLink: {
    color: '#1890ff',
    borderBottom: '2px solid #1890ff',
  },
  main: {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  balanceSection: {
    display: 'flex',
    gap: '24px',
    marginBottom: '24px',
  },
  balanceCard: {
    flex: 3,
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  limitCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  balanceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  balanceTitle: {
    fontSize: '18px',
    fontWeight: '600',
  },
  walletIcon: {
    fontSize: '24px',
  },
  balanceAmount: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  balanceHint: {
    color: '#999',
    fontSize: '14px',
    marginBottom: '24px',
  },
  rechargeButton: {
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  limitHeader: {
    marginBottom: '16px',
  },
  limitTitle: {
    fontSize: '18px',
    fontWeight: '600',
  },
  increaseLimitButton: {
    backgroundColor: 'transparent',
    color: '#1890ff',
    border: '1px solid #1890ff',
    borderRadius: '4px',
    padding: '10px 20px',
    fontSize: '14px',
    cursor: 'pointer',
    width: '100%',
  },
  infoSection: {
    display: 'flex',
    gap: '24px',
  },
  assetActivity: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  marketPrice: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
  },
  activityTabs: {
    display: 'flex',
    gap: '16px',
  },
  tabButton: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '6px 12px',
    fontSize: '14px',
    cursor: 'pointer',
    color: '#666',
  },
  activeTab: {
    color: '#1890ff',
    borderBottom: '2px solid #1890ff',
  },
  viewAllButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#1890ff',
    fontSize: '14px',
    cursor: 'pointer',
  },
  activityList: {
    minHeight: '200px',
  },
  activityItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  activityInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  activityType: {
    fontSize: '14px',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: '12px',
    color: '#999',
  },
  activityAmount: {
    fontSize: '16px',
    fontWeight: '500',
  },
  noActivity: {
    textAlign: 'center',
    color: '#999',
    padding: '40px 0',
  },
  timeFilter: {
    display: 'flex',
    gap: '8px',
  },
  timeLabel: {
    fontSize: '14px',
    color: '#1890ff',
  },
  priceTable: {
    width: '100%',
  },
  tableHeader: {
    display: 'flex',
    padding: '12px 0',
    borderBottom: '1px solid #f0f0f0',
    fontWeight: '600',
  },
  tableRow: {
    display: 'flex',
    padding: '12px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  tableCol: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  currencyIcon: {
    marginRight: '8px',
    fontSize: '18px',
  },
};

export default Main;
