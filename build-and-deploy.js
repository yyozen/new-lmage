/**
 * 构建和部署脚本
 * 用于构建 React 应用并部署到 Cloudflare Workers
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const REACT_DIR = 'client';
const PUBLIC_DIR = 'public';

console.log('🚀 开始构建和部署流程...\n');

// 步骤 1: 构建 React 应用
console.log('📦 步骤 1: 构建 React 应用...');
try {
  process.chdir(REACT_DIR);
  execSync('npm run build', { stdio: 'inherit' });
  process.chdir('..');
  console.log('✅ React 应用构建成功\n');
} catch (error) {
  console.error('❌ React 应用构建失败:', error.message);
  process.exit(1);
}

// 步骤 2: 确保 public 目录存在必要的文件
console.log('📁 步骤 2: 检查 public 目录...');
const publicPath = path.join(process.cwd(), PUBLIC_DIR);
if (!fs.existsSync(publicPath)) {
  console.error('❌ public 目录不存在');
  process.exit(1);
}

// 检查是否有 index.html
const indexPath = path.join(publicPath, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ 找不到 index.html');
  process.exit(1);
}

console.log('✅ public 目录检查通过\n');

// 步骤 3: 部署到 Cloudflare Workers
console.log('🌐 步骤 3: 部署到 Cloudflare Workers...');
try {
  execSync('npx wrangler deploy', { stdio: 'inherit' });
  console.log('\n✅ 部署成功！');
  console.log('\n🎉 构建和部署流程完成！');
} catch (error) {
  console.error('❌ 部署失败:', error.message);
  process.exit(1);
}
