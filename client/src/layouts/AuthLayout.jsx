import { Outlet, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import './AuthLayout.css';

/**
 * 认证布局组件
 * 用于登录和注册页面
 */
const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore();

  // 如果已登录，重定向到首页
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-layout">
      {/* 背景装饰 */}
      <div className="auth-background">
        <div className="auth-bg-gradient"></div>
        <div className="auth-bg-pattern"></div>
      </div>

      {/* 认证内容 */}
      <motion.div
        className="auth-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <div className="auth-logo">
          <img src="/images/logo.svg" alt="TG-Image" />
          <h1>TG-Image</h1>
        </div>

        {/* 页面内容 */}
        <Outlet />

        {/* 底部链接 */}
        <div className="auth-footer">
          <p>
            © 2025 TG-Image. 基于{' '}
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>{' '}
            提供技术支持
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
