import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

/**
 * 认证状态管理
 * 使用 Zustand + persist 中间件实现持久化
 */
const useAuthStore = create(
  persist(
    (set, get) => ({
      // ========== 状态 ==========
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // ========== 初始化 ==========
      initAuth: () => {
        const token = get().token;
        const user = get().user;

        if (token && user) {
          // 验证 token 是否过期
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const now = Math.floor(Date.now() / 1000);

            if (payload.exp && payload.exp < now) {
              // Token 已过期，清除状态
              get().logout();
              return false;
            }

            // Token 有效，设置认证状态
            set({ isAuthenticated: true });
            
            // 设置 axios 默认请求头
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            return true;
          } catch (error) {
            console.error('Token 解析失败:', error);
            get().logout();
            return false;
          }
        }

        return false;
      },

      // ========== 登录 ==========
      login: async (credentials) => {
        set({ isLoading: true, error: null });

        try {
          const response = await axios.post('/api/auth/login', credentials);
          const { user, token } = response.data;

          // 保存用户信息和 token
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          // 设置 axios 默认请求头
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          return { success: true, user };
        } catch (error) {
          const errorMessage = error.response?.data?.error || '登录失败';
          set({
            error: errorMessage,
            isLoading: false,
          });

          return { success: false, error: errorMessage };
        }
      },

      // ========== 注册 ==========
      register: async (userData) => {
        set({ isLoading: true, error: null });

        try {
          const response = await axios.post('/api/auth/register', userData);
          const { user, token } = response.data;

          // 保存用户信息和 token
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          // 设置 axios 默认请求头
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          return { success: true, user };
        } catch (error) {
          const errorMessage = error.response?.data?.error || '注册失败';
          set({
            error: errorMessage,
            isLoading: false,
          });

          return { success: false, error: errorMessage };
        }
      },

      // ========== 退出登录 ==========
      logout: () => {
        // 清除 axios 默认请求头
        delete axios.defaults.headers.common['Authorization'];

        // 清除状态
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // ========== 更新用户信息 ==========
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      // ========== 更新个人资料 ==========
      updateProfile: async (profileData) => {
        set({ isLoading: true, error: null });

        try {
          const response = await axios.put('/api/auth/profile', profileData);
          const { user } = response.data;

          set({
            user,
            isLoading: false,
            error: null,
          });

          return { success: true, user };
        } catch (error) {
          const errorMessage = error.response?.data?.error || '更新资料失败';
          set({
            error: errorMessage,
            isLoading: false,
          });

          return { success: false, error: errorMessage };
        }
      },

      // ========== 修改密码 ==========
      changePassword: async (currentPassword, newPassword) => {
        set({ isLoading: true, error: null });

        try {
          await axios.put('/api/auth/password', {
            currentPassword,
            newPassword,
          });

          set({
            isLoading: false,
            error: null,
          });

          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.error || '修改密码失败';
          set({
            error: errorMessage,
            isLoading: false,
          });

          return { success: false, error: errorMessage };
        }
      },

      // ========== 更新用户头像 ==========
      updateAvatar: async (avatarUrl) => {
        set({ isLoading: true, error: null });

        try {
          const response = await axios.put('/api/auth/avatar', { avatarUrl });
          const { user } = response.data;

          set({
            user,
            isLoading: false,
            error: null,
          });

          return { success: true, user };
        } catch (error) {
          const errorMessage = error.response?.data?.error || '更新头像失败';
          set({
            error: errorMessage,
            isLoading: false,
          });

          return { success: false, error: errorMessage };
        }
      },

      // ========== 获取当前用户信息 ==========
      fetchCurrentUser: async () => {
        set({ isLoading: true, error: null });

        try {
          const response = await axios.get('/api/auth/user');
          const { user } = response.data;

          set({
            user,
            isLoading: false,
            error: null,
          });

          return { success: true, user };
        } catch (error) {
          const errorMessage = error.response?.data?.error || '获取用户信息失败';
          set({
            error: errorMessage,
            isLoading: false,
          });

          // 如果是 401 错误，清除认证状态
          if (error.response?.status === 401) {
            get().logout();
          }

          return { success: false, error: errorMessage };
        }
      },

      // ========== 清除错误 ==========
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        // 只持久化这些字段
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export { useAuthStore };
