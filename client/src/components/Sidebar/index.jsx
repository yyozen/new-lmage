import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useImageStore } from '@/store/imageStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import './Sidebar.css';

/**
 * 底部导航栏组件
 * 现代移动优先设计
 */
const Sidebar = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  const { images } = useImageStore();
  const { favorites } = useFavoriteStore();

  // 主导航菜单项
  const menuItems = [
    {
      path: '/',
      icon: 'ri-home-5-line',
      activeIcon: 'ri-home-5-fill',
      label: '首页',
      public: true,
    },
    {
      path: '/dashboard',
      icon: 'ri-image-2-line',
      activeIcon: 'ri-image-2-fill',
      label: '图片',
      badge: images.length,
      requireAuth: true,
    },
    {
      path: '/favorites',
      icon: 'ri-star-line',
      activeIcon: 'ri-star-fill',
      label: '收藏',
      badge: favorites.size,
      requireAuth: true,
    },
    {
      path: '/settings',
      icon: 'ri-settings-3-line',
      activeIcon: 'ri-settings-3-fill',
      label: '设置',
      requireAuth: true,
    },
    {
      path: '/help',
      icon: 'ri-question-line',
      activeIcon: 'ri-question-fill',
      label: '帮助',
      public: true,
    },
  ];

  // 检查菜单项是否激活
  const isActive = (path) => {
    return location.pathname === path;
  };

  // 过滤菜单项（根据认证状态）
  const filterMenuItems = (items) => {
    return items.filter(
      (item) => item.public || (item.requireAuth && isAuthenticated)
    );
  };

  return (
    <motion.nav
      className="sidebar"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="sidebar-nav">
        <div className="sidebar-menu">
          {filterMenuItems(menuItems).map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${active ? 'active' : ''}`}
              >
                <i className={active && item.activeIcon ? item.activeIcon : item.icon}></i>
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span className="sidebar-badge">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Sidebar;
