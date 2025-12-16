import { create } from 'zustand';
import axios from 'axios';

/**
 * 收藏状态管理
 * 管理用户收藏的图片
 */
const useFavoriteStore = create((set, get) => ({
  // ========== 状态 ==========
  favorites: new Set(), // 收藏的图片ID集合
  favoriteImages: [], // 收藏的图片详细信息
  isLoading: false,
  error: null,

  // ========== 初始化收藏列表 ==========
  initFavorites: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get('/api/favorites');
      const { images } = response.data;

      // 提取ID集合
      const favoriteIds = new Set(images.map((img) => img.id));

      set({
        favorites: favoriteIds,
        favoriteImages: images,
        isLoading: false,
        error: null,
      });

      return { success: true, favorites: favoriteIds };
    } catch (error) {
      const errorMessage = error.response?.data?.error || '加载收藏列表失败';
      set({
        error: errorMessage,
        isLoading: false,
      });

      return { success: false, error: errorMessage };
    }
  },

  // ========== 获取收藏列表 ==========
  fetchFavorites: async () => {
    return get().initFavorites();
  },

  // ========== 添加收藏 ==========
  addFavorite: async (imageId) => {
    // 乐观更新
    set((state) => ({
      favorites: new Set([...state.favorites, imageId]),
    }));

    try {
      await axios.post(`/api/favorites/${imageId}`);
      
      // 重新获取收藏列表以更新详细信息
      await get().fetchFavorites();

      return { success: true };
    } catch (error) {
      // 回滚乐观更新
      set((state) => {
        const newFavorites = new Set(state.favorites);
        newFavorites.delete(imageId);
        return { favorites: newFavorites };
      });

      const errorMessage = error.response?.data?.error || '添加收藏失败';
      set({ error: errorMessage });

      return { success: false, error: errorMessage };
    }
  },

  // ========== 取消收藏 ==========
  removeFavorite: async (imageId) => {
    // 乐观更新
    set((state) => {
      const newFavorites = new Set(state.favorites);
      newFavorites.delete(imageId);
      return {
        favorites: newFavorites,
        favoriteImages: state.favoriteImages.filter((img) => img.id !== imageId),
      };
    });

    try {
      await axios.delete(`/api/favorites/${imageId}`);

      return { success: true };
    } catch (error) {
      // 回滚乐观更新
      set((state) => ({
        favorites: new Set([...state.favorites, imageId]),
      }));

      // 重新获取收藏列表
      await get().fetchFavorites();

      const errorMessage = error.response?.data?.error || '取消收藏失败';
      set({ error: errorMessage });

      return { success: false, error: errorMessage };
    }
  },

  // ========== 切换收藏状态 ==========
  toggleFavorite: async (imageId) => {
    const isFavorite = get().favorites.has(imageId);

    if (isFavorite) {
      return get().removeFavorite(imageId);
    } else {
      return get().addFavorite(imageId);
    }
  },

  // ========== 批量添加收藏 ==========
  addFavorites: async (imageIds) => {
    set({ isLoading: true, error: null });

    try {
      await axios.post('/api/favorites/batch', {
        action: 'add',
        imageIds,
      });

      // 重新获取收藏列表
      await get().fetchFavorites();

      set({ isLoading: false });

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || '批量添加收藏失败';
      set({
        error: errorMessage,
        isLoading: false,
      });

      return { success: false, error: errorMessage };
    }
  },

  // ========== 批量取消收藏 ==========
  removeFavorites: async (imageIds) => {
    set({ isLoading: true, error: null });

    try {
      await axios.post('/api/favorites/batch', {
        action: 'remove',
        imageIds,
      });

      // 重新获取收藏列表
      await get().fetchFavorites();

      set({ isLoading: false });

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || '批量取消收藏失败';
      set({
        error: errorMessage,
        isLoading: false,
      });

      return { success: false, error: errorMessage };
    }
  },

  // ========== 检查是否收藏 ==========
  isFavorite: (imageId) => {
    return get().favorites.has(imageId);
  },

  // ========== 获取收藏数量 ==========
  getFavoriteCount: () => {
    return get().favorites.size;
  },

  // ========== 清除错误 ==========
  clearError: () => {
    set({ error: null });
  },

  // ========== 重置状态 ==========
  reset: () => {
    set({
      favorites: new Set(),
      favoriteImages: [],
      error: null,
    });
  },
}));

export { useFavoriteStore };
