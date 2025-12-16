/**
 * LocalStorage 封装工具
 * 提供类型安全的存储操作
 */

/**
 * 存储数据
 * @param {string} key - 键名
 * @param {any} value - 值
 */
export const setItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('存储数据失败:', error);
  }
};

/**
 * 获取数据
 * @param {string} key - 键名
 * @param {any} defaultValue - 默认值
 * @returns {any} 存储的值
 */
export const getItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('获取数据失败:', error);
    return defaultValue;
  }
};

/**
 * 移除数据
 * @param {string} key - 键名
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('移除数据失败:', error);
  }
};

/**
 * 清空所有数据
 */
export const clear = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('清空数据失败:', error);
  }
};

/**
 * 检查键是否存在
 * @param {string} key - 键名
 * @returns {boolean} 是否存在
 */
export const hasItem = (key) => {
  return localStorage.getItem(key) !== null;
};

/**
 * 获取所有键名
 * @returns {string[]} 键名数组
 */
export const getAllKeys = () => {
  return Object.keys(localStorage);
};
