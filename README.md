# 🎨 TG-Image - 基于 Telegram 的现代化图床服务

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare)
![Telegram](https://img.shields.io/badge/Telegram-Bot-26A5E4?style=for-the-badge&logo=telegram)
![License](https://img.shields.io/badge/License-AGPL--3.0-blue?style=for-the-badge)

**完全免费 · 无限存储 · 全球加速 · 现代化界面**

[在线演示](#) · [快速开始](#-快速开始) · [功能特性](#-功能特性) · [部署指南](./README-DEPLOY.md)

</div>

---

## ✨ 功能特性

### 🎯 核心功能

- **📤 智能上传** - 拖拽、粘贴、批量上传，实时进度显示
- **🖼️ 图片管理** - 网格/列表/时间线视图，搜索筛选，批量操作
- **🎨 图片编辑** - 8种滤镜，亮度/对比度/饱和度调整，旋转缩放
- **⭐ 收藏功能** - 快速收藏常用图片
- **🏷️ 标签管理** - 自定义标签，颜色分类
- **👤 用户系统** - JWT 认证，个人资料，使用统计
- **🌓 深色模式** - 自动切换，护眼舒适
- **📱 响应式设计** - 完美适配桌面、平板、手机

### 🚀 技术亮点

- **⚡ 极速加载** - 代码分割、懒加载、CDN 加速
- **🎭 精美动画** - Framer Motion 流畅动画
- **🔒 安全可靠** - JWT 认证、密码哈希、CORS 保护
- **💰 完全免费** - 基于 Cloudflare Workers 和 Telegram
- **🌍 全球加速** - Cloudflare 全球 CDN
- **📦 无限存储** - 利用 Telegram 作为图片存储

## 📸 预览

<div align="center">
  <img src="./screenshots/home.png" alt="首页" width="45%">
  <img src="./screenshots/dashboard.png" alt="仪表板" width="45%">
  <img src="./screenshots/editor.png" alt="编辑器" width="45%">
  <img src="./screenshots/dark-mode.png" alt="深色模式" width="45%">
</div>

## 🚀 快速开始

### 前置要求

- Node.js 18+
- Cloudflare 账户（免费）
- Telegram Bot Token（免费）

### 5 分钟部署

```bash
# 1. 克隆仓库
git clone https://github.com/your-username/tg-image.git
cd tg-image

# 2. 安装依赖
npm install
cd client && npm install && cd ..

# 3. 配置环境变量（编辑 wrangler.toml）
# TG_Bot_Token = "your-bot-token"
# TG_Chat_ID = "your-chat-id"
# JWT_SECRET = "your-secret-key"

# 4. 创建 KV 存储
npm run create-kv

# 5. 登录 Cloudflare
npx wrangler login

# 6. 一键部署
npm run build:deploy
```

完成！你的图床现在已经在线了！🎉

详细教程请查看 [快速开始指南](./QUICKSTART.md)

## 📦 项目结构

```
tg-image/
├── src/                      # 🔥 后端代码（Cloudflare Workers）
│   ├── functions/            # API 函数
│   │   ├── user/            # 用户相关 API
│   │   ├── file/            # 文件访问
│   │   └── utils/           # 工具函数
│   └── index.js             # 后端主入口
│
├── client/                  # 🎨 前端代码（React 应用）
│   ├── src/
│   │   ├── components/      # UI 组件（18个）
│   │   ├── pages/           # 页面组件（10个）
│   │   ├── layouts/         # 布局组件
│   │   ├── store/           # Zustand 状态管理
│   │   ├── utils/           # 工具函数
│   │   └── services/        # API 服务
│   └── vite.config.js       # Vite 配置
│
├── public/                  # 📦 构建输出目录
│   └── images/              # 静态图片资源
│
├── wrangler.toml            # Cloudflare 配置
├── package.json             # 后端依赖
└── README-DEPLOY.md         # 详细部署文档
```

## 🛠️ 技术栈

### 前端

- **React 18.3** - UI 框架
- **Vite 5** - 构建工具
- **Zustand** - 状态管理
- **React Router 6** - 路由管理
- **Framer Motion** - 动画库
- **Axios** - HTTP 客户端

### 后端

- **Cloudflare Workers** - 无服务器平台
- **Hono** - Web 框架
- **KV Storage** - 数据存储
- **Telegram Bot API** - 图片存储

## 📝 开发命令

```bash
# 开发
npm run dev              # 启动后端（localhost:8787）
npm run dev:client       # 启动前端（localhost:3000）

# 构建
npm run build            # 构建 React 应用

# 部署
npm run deploy           # 部署到 Cloudflare
npm run build:deploy     # 构建并部署（推荐）

# 设置
npm run create-kv        # 创建 KV 命名空间
npm run setup            # 完整设置（KV + 部署）
```

## 🌟 核心组件

### UI 组件（18个）

- **布局组件**: Header, Sidebar, Footer, ScrollToTop
- **功能组件**: ImageEditor, ImageViewer, ImageCard, SearchBar, ShareMenu
- **通用组件**: Modal, Loading, Pagination, EmptyState, Tooltip, UploadProgress

### 页面组件（10个）

- Home, Dashboard, Favorites, Tags, Profile, Settings
- Login, Register, Help, NotFound

### 状态管理（5个 Stores）

- authStore, imageStore, favoriteStore, tagStore, themeStore

## 🔌 API 端点

### 认证相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/user` - 获取当前用户
- `PUT /api/auth/profile` - 更新资料
- `PUT /api/auth/password` - 修改密码

### 图片管理
- `POST /upload` - 上传图片
- `GET /api/images` - 获取图片列表
- `DELETE /api/images/:id` - 删除图片
- `PUT /api/images/:id` - 更新图片信息

### 收藏管理
- `GET /api/favorites` - 获取收藏列表
- `POST /api/favorites/:id` - 添加收藏
- `DELETE /api/favorites/:id` - 取消收藏

### 标签管理
- `GET /api/tags` - 获取标签列表
- `POST /api/tags` - 创建标签
- `PUT /api/tags/:id` - 更新标签
- `DELETE /api/tags/:id` - 删除标签

完整 API 文档请查看 [部署指南](./README-DEPLOY.md)

## 🎨 自定义主题

编辑 `client/src/styles/variables.css`：

```css
:root {
  --primary-color: #4f46e5;
  --primary-light: #6366f1;
  --primary-dark: #4338ca;
  /* 自定义你的颜色 */
}
```

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](./CONTRIBUTING.md)

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 AGPL-3.0-with-Commons-Clause 许可证

## 🙏 致谢

- [React](https://react.dev/) - UI 框架
- [Cloudflare Workers](https://workers.cloudflare.com/) - 无服务器平台
- [Telegram](https://telegram.org/) - 图片存储
- [Hono](https://hono.dev/) - Web 框架
- [Vite](https://vitejs.dev/) - 构建工具

## 📧 联系方式

- 提交 Issue: [GitHub Issues](https://github.com/your-username/tg-image/issues)
- 邮箱: your-email@example.com

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐️ Star 支持一下！**

Made with ❤️ by [Your Name](https://github.com/your-username)

</div>
