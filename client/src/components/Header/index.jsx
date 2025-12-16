import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import './Header.css';

/**
 * 头部组件
 * 包含 Logo、搜索、主题切换、用户菜单等
 */
const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // 处理退出登录
  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* 左侧 - 标题 */}
        <div className="header-left">
          <h1 className="header-title">TG-Image</h1>
        </div>

        {/* 右侧 - 操作按钮 */}
        <div className="header-right">
          {/* 上传按钮 */}
          <button
            className="header-btn upload-btn"
            onClick={() => navigate('/')}
            title="上传图片"
          >
            <i className="ri-upload-cloud-2-line"></i>
            <span className="hide-mobile">上传</span>
          </button>

          {/* 主题切换 */}
          <button
            className="header-btn theme-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
          >
            {theme === 'dark' ? (
              <i className="ri-sun-line"></i>
            ) : (
              <i className="ri-moon-line"></i>
            )}
          </button>

          {/* 用户菜单 */}
          {isAuthenticated ? (
            <div className="user-menu">
              <button
                className="user-menu-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="user-avatar">
                  {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.username} />
                  ) : (
                    <i className="ri-user-3-line"></i>
                  )}
                </div>
                <span className="hide-mobile">{user?.username}</span>
                <i className="ri-arrow-down-s-line"></i>
              </button>

              {/* 下拉菜单 */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    className="user-menu-dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to="/dashboard"
                      className="menu-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <i className="ri-image-2-line"></i>
                      <span>我的图片</span>
                    </Link>
                    <Link
                      to="/favorites"
                      className="menu-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <i className="ri-star-line"></i>
                      <span>收藏</span>
                    </Link>
                    <Link
                      to="/profile"
                      className="menu-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <i className="ri-user-settings-line"></i>
                      <span>个人资料</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="menu-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <i className="ri-settings-3-line"></i>
                      <span>设置</span>
                    </Link>
                    <div className="menu-divider"></div>
                    <button className="menu-item" onClick={handleLogout}>
                      <i className="ri-logout-box-line"></i>
                      <span>退出登录</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="header-btn login-btn">
              <i className="ri-login-box-line"></i>
              <span>登录</span>
            </Link>
          )}
        </div>
      </div>

      {/* 点击外部关闭菜单 */}
      {showUserMenu && (
        <div
          className="user-menu-overlay"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;
