/**
 * 表单验证工具函数
 */

/**
 * 验证邮箱格式
 * @param {string} email - 邮箱地址
 * @returns {boolean} 是否有效
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 验证手机号格式（中国大陆）
 * @param {string} phone - 手机号
 * @returns {boolean} 是否有效
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
};

/**
 * 验证密码强度
 * @param {string} password - 密码
 * @returns {object} 验证结果
 */
export const validatePassword = (password) => {
  const result = {
    isValid: false,
    strength: 'weak', // 'weak' | 'medium' | 'strong'
    errors: [],
  };

  if (!password) {
    result.errors.push('密码不能为空');
    return result;
  }

  // 最小长度
  if (password.length < 8) {
    result.errors.push('密码长度至少为8位');
  }

  // 包含大写字母
  if (!/[A-Z]/.test(password)) {
    result.errors.push('密码需包含至少一个大写字母');
  }

  // 包含小写字母
  if (!/[a-z]/.test(password)) {
    result.errors.push('密码需包含至少一个小写字母');
  }

  // 包含数字
  if (!/\d/.test(password)) {
    result.errors.push('密码需包含至少一个数字');
  }

  // 包含特殊字符
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    result.errors.push('密码需包含至少一个特殊字符');
  }

  // 计算强度
  let strengthScore = 0;
  if (password.length >= 8) strengthScore++;
  if (password.length >= 12) strengthScore++;
  if (/[A-Z]/.test(password)) strengthScore++;
  if (/[a-z]/.test(password)) strengthScore++;
  if (/\d/.test(password)) strengthScore++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strengthScore++;

  if (strengthScore <= 2) {
    result.strength = 'weak';
  } else if (strengthScore <= 4) {
    result.strength = 'medium';
  } else {
    result.strength = 'strong';
  }

  result.isValid = result.errors.length === 0;

  return result;
};

/**
 * 验证用户名
 * @param {string} username - 用户名
 * @returns {object} 验证结果
 */
export const validateUsername = (username) => {
  const result = {
    isValid: false,
    errors: [],
  };

  if (!username) {
    result.errors.push('用户名不能为空');
    return result;
  }

  // 长度限制
  if (username.length < 3) {
    result.errors.push('用户名长度至少为3位');
  }

  if (username.length > 20) {
    result.errors.push('用户名长度不能超过20位');
  }

  // 只能包含字母、数字、下划线
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    result.errors.push('用户名只能包含字母、数字和下划线');
  }

  // 不能以数字开头
  if (/^\d/.test(username)) {
    result.errors.push('用户名不能以数字开头');
  }

  result.isValid = result.errors.length === 0;

  return result;
};

/**
 * 验证邮箱
 * @param {string} email - 邮箱地址
 * @returns {object} 验证结果
 */
export const validateEmail = (email) => {
  const result = {
    isValid: false,
    errors: [],
  };

  if (!email) {
    result.errors.push('邮箱不能为空');
    return result;
  }

  if (!isValidEmail(email)) {
    result.errors.push('邮箱格式不正确');
  }

  result.isValid = result.errors.length === 0;

  return result;
};

/**
 * 验证 URL 格式
 * @param {string} url - URL
 * @returns {boolean} 是否有效
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * 验证文件类型
 * @param {File} file - 文件对象
 * @param {string[]} allowedTypes - 允许的类型
 * @returns {boolean} 是否有效
 */
export const isValidFileType = (file, allowedTypes) => {
  if (!file || !allowedTypes) return false;
  
  const fileType = file.type;
  const fileExtension = file.name.split('.').pop().toLowerCase();

  return allowedTypes.some((type) => {
    if (type.includes('*')) {
      // 通配符匹配，如 'image/*'
      const [mainType] = type.split('/');
      return fileType.startsWith(mainType);
    }
    // 精确匹配 MIME 类型或扩展名
    return fileType === type || fileExtension === type.replace('.', '');
  });
};

/**
 * 验证文件大小
 * @param {File} file - 文件对象
 * @param {number} maxSize - 最大大小（字节）
 * @returns {boolean} 是否有效
 */
export const isValidFileSize = (file, maxSize) => {
  if (!file || !maxSize) return false;
  return file.size <= maxSize;
};

/**
 * 验证图片尺寸
 * @param {File} file - 图片文件
 * @param {object} constraints - 尺寸约束
 * @returns {Promise<object>} 验证结果
 */
export const validateImageDimensions = (file, constraints = {}) => {
  return new Promise((resolve) => {
    const { minWidth, maxWidth, minHeight, maxHeight } = constraints;

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      const result = {
        isValid: true,
        width: img.width,
        height: img.height,
        errors: [],
      };

      if (minWidth && img.width < minWidth) {
        result.isValid = false;
        result.errors.push(`图片宽度不能小于 ${minWidth}px`);
      }

      if (maxWidth && img.width > maxWidth) {
        result.isValid = false;
        result.errors.push(`图片宽度不能大于 ${maxWidth}px`);
      }

      if (minHeight && img.height < minHeight) {
        result.isValid = false;
        result.errors.push(`图片高度不能小于 ${minHeight}px`);
      }

      if (maxHeight && img.height > maxHeight) {
        result.isValid = false;
        result.errors.push(`图片高度不能大于 ${maxHeight}px`);
      }

      resolve(result);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({
        isValid: false,
        errors: ['无法读取图片'],
      });
    };

    img.src = url;
  });
};

/**
 * 验证必填字段
 * @param {any} value - 值
 * @returns {boolean} 是否有效
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

/**
 * 验证最小长度
 * @param {string} value - 值
 * @param {number} minLength - 最小长度
 * @returns {boolean} 是否有效
 */
export const minLength = (value, minLength) => {
  if (!value) return false;
  return value.length >= minLength;
};

/**
 * 验证最大长度
 * @param {string} value - 值
 * @param {number} maxLength - 最大长度
 * @returns {boolean} 是否有效
 */
export const maxLength = (value, maxLength) => {
  if (!value) return true;
  return value.length <= maxLength;
};

/**
 * 验证数字范围
 * @param {number} value - 值
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {boolean} 是否有效
 */
export const isInRange = (value, min, max) => {
  const num = Number(value);
  if (isNaN(num)) return false;
  return num >= min && num <= max;
};

/**
 * 验证是否为整数
 * @param {any} value - 值
 * @returns {boolean} 是否有效
 */
export const isInteger = (value) => {
  return Number.isInteger(Number(value));
};

/**
 * 验证是否匹配正则表达式
 * @param {string} value - 值
 * @param {RegExp} pattern - 正则表达式
 * @returns {boolean} 是否有效
 */
export const matchesPattern = (value, pattern) => {
  if (!value) return false;
  return pattern.test(value);
};
