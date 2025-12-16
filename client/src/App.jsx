import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';

// Pages
import HomePage from '@/pages/Home';
import DashboardPage from '@/pages/Dashboard';
import FavoritesPage from '@/pages/Favorites';
import TagsPage from '@/pages/Tags';
import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';
import ProfilePage from '@/pages/Profile';
import SettingsPage from '@/pages/Settings';
import HelpPage from '@/pages/Help';
import NotFoundPage from '@/pages/NotFound';

// Hooks
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';

// Components
import ProtectedRoute from '@/components/ProtectedRoute';
import ScrollToTop from '@/components/ScrollToTop';

function App() {
  const { theme, initTheme } = useThemeStore();
  const { initAuth } = useAuthStore();

  // 初始化主题和认证状态
  useEffect(() => {
    initTheme();
    initAuth();
  }, [initTheme, initAuth]);

  // 应用主题类到 body
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  return (
    <>
      {/* 滚动到顶部组件 */}
      <ScrollToTop />
      
      {/* 路由配置 */}
      <AnimatePresence mode="wait">
        <Routes>
          {/* 主布局路由 */}
          <Route element={<MainLayout />}>
            {/* 公开路由 */}
            <Route path="/" element={<HomePage />} />
            <Route path="/help" element={<HelpPage />} />
            
            {/* 受保护的路由 */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tags"
              element={
                <ProtectedRoute>
                  <TagsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* 认证布局路由 */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* 404 页面 */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
