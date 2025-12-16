import { upload } from '@/utils/request';
import toast from 'react-hot-toast';

/**
 * 上传服务
 * 处理文件上传相关的业务逻辑
 */

/**
 * 上传单个文件
 * @param {File} file - 文件对象
 * @param {Function} onProgress - 进度回调
 * @returns {Promise} 上传结果
 */
export const uploadFile = async (file, onProgress) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await upload('/upload', formData, onProgress);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || '上传失败',
    };
  }
};

/**
 * 批量上传文件
 * @param {File[]} files - 文件数组
 * @param {Function} onProgress - 进度回调
 * @returns {Promise} 上传结果
 */
export const uploadFiles = async (files, onProgress) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });

    const response = await upload('/upload', formData, onProgress);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || '批量上传失败',
    };
  }
};

/**
 * 验证文件
 * @param {File} file - 文件对象
 * @param {object} options - 验证选项
 * @returns {object} 验证结果
 */
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 10 * 1024 * 1024, // 默认 10MB
    allowedTypes = ['image/*'],
  } = options;

  const errors = [];

  // 检查文件大小
  if (file.size > maxSize) {
    errors.push(`文件大小不能超过 ${(maxSize / 1024 / 1024).toFixed(0)}MB`);
  }

  // 检查文件类型
  const isValidType = allowedTypes.some((type) => {
    if (type.includes('*')) {
      const [mainType] = type.split('/');
      return file.type.startsWith(mainType);
    }
    return file.type === type;
  });

  if (!isValidType) {
    errors.push('不支持的文件类型');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export default {
  uploadFile,
  uploadFiles,
  validateFile,
};
