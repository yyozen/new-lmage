import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import './MainLayout.css';

/**
 * 主布局组件
 * 包含侧边栏、头部、内容区域和底部
 */
const MainLayout = () => {
  return (
    <div className="main-layout">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容区域 */}
      <div className="main-content">
        {/* 头部 */}
        <Header />

        {/* 页面内容 */}
        <motion.main
          className="page-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>

        {/* 底部 */}
        <Footer />
      </div>

      {/* 返回顶部按钮 */}
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
