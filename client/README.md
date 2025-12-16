# 🎨 TG-Image React - 现代化图床服务

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare)
![License](https://img.shields.io/badge/License-AGPL--3.0-blue?style=for-the-badge)

**基于 Telegram 和 Cloudflare Workers 的现代化图床服务**

[在线演示](https://your-demo.com) · [快速开始](#快速开始) · [功能特性](#功能特性) · [部署指南](../README-DEPLOY.md)

</div>

---

## ✨ 功能特性

### 🎯 核心功能

- **📤 智能上传**
  - 拖拽上传
  - 粘贴上传（Ctrl+V）
  - 批量上传
  - 实时进度显示
  - 上传历史记录

- **🖼️ 图片管理**
  - 网格/列表/时间线视图
  - 搜索和筛选
  - 批量操作
  - 标签管理
  - 收藏功能

- **🎨 图片编辑**
  - 8种滤镜效果
  - 亮度/对比度/饱和度调整
  - 旋转和缩放
  - 实时预览
  - 高质量导出

- **👤 用户系统**
  - JWT 认证
  - 个人资料管理
  - 密码修改
  - 头像上传
  - 使用统计

### 🚀 技术亮点

- **⚡ 极速加载**
  - 代码分割
  - 懒加载路由
  - 图片懒加载
  - CDN 加速

- **🎭 精美 UI**
  - 深色/浅色主题
  - 流畅动画（Framer Motion）
  - 响应式设计
  - 现代化界面

- **🔒 安全可靠**
  - JWT 认证
  - 密码哈希
  - CORS 保护
  - XSS 防护

- **📱 完美适配**
  - 桌面端
  - 平板端
  - 移动端
  - PWA 支持

## 🎬 预览

### 首页上传
![首页](./screenshots/home.png)

### 图片管理
![仪表板](./screenshots/dashboard.png)

### 图片编辑器
![编辑器](./screenshots/editor.png)

### 深色模式
![深色模式](./screenshots/dark-mode.png)

## 🚀 快速开始

### 前置要求

- Node.js 18+
- npm 或 yarn
- Cloudflare 账户
- Telegram Bot Token

### 安装

```bash
# 克隆仓库
git clone https://github.com/your-username/tg-image.git
cd tg-image

# 安装后端依赖
npm install

# 安装前端依赖
cd client
npm install
cd ..
```

### 配置

1. 创建 Telegram Bot 并获取 Token
2. 编辑 `wrangler.toml`：

```toml
[vars]
TG_Bot_Token = "your-bot-token"
TG_Chat_ID = "your-chat-id"
JWT_SECRET = "your-secret-key"
```

3. 创建 KV 命名空间：

```bash
npm run create-kv
```

### 开发

```bash
# 终端 1: 启动后端
npm run dev

# 终端 2: 启动前端
npm run dev:react
```

访问 `http://localhost:3000` 🎉

### 部署

```bash
# 登录 Cloudflare
npx wrangler login

# 一键构建和部署
npm run build:deploy
```

## 📦 技术栈

### 前端

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.3 | UI 框架 |
| Vite | 5.0 | 构建工具 |
| Zustand | 4.5 | 状态管理 |
| React Router | 6.22 | 路由管理 |
| Framer Motion | 11.0 | 动画库 |
| Axios | 1.6 | HTTP 客户端 |
| React Hot Toast | 2.4 | 通知提示 |
| React Dropzone | 14.2 | 文件上传 |

### 后端

| 技术 | 版本 | 用途 |
|------|------|------|
| Cloudflare Workers | - | 无服务器平台 |
| Hono | 3.1 | Web 框架 |
| KV Storage | - | 数据存储 |
| Telegram Bot API | - | 图片存储 |

## 📂 项目结构

```
client/
├── src/
│   ├── components/          # UI 组件
│   │   ├── Header/          # 头部组件
│   │   ├── Sidebar/         # 侧边栏
│   │   ├── Modal/           # 模态框
│   │   ├── ImageEditor/     # 图片编辑器
│   │   ├── ImageViewer/     # 图片查看器
│   │   ├── ImageCard/       # 图片卡片
│   │   ├── Loading/         # 加载组件
│   │   ├── Pagination/      # 分页组件
│   │   ├── SearchBar/       # 搜索栏
│   │   ├── ShareMenu/       # 分享菜单
│   │   ├── Tooltip/         # 工具提示
│   │   └── UploadProgress/  # 上传进度
│   ├── pages/               # 页面组件
│   │   ├── Home/            # 首页
│   │   ├── Dashboard/       # 仪表板
│   │   ├── Favorites/       # 收藏
│   │   ├── Tags/            # 标签
│   │   ├── Profile/         # 个人资料
│   │   ├── Settings/        # 设置
│   │   ├── Login/           # 登录
│   │   ├── Register/        # 注册
│   │   ├── Help/            # 帮助
│   │   └── NotFound/        # 404
│   ├── layouts/             # 布局组件
│   │   ├── MainLayout/      # 主布局
│   │   └── AuthLayout/      # 认证布局
│   ├── store/               # 状态管理
│   │   ├── authStore.js     # 认证状态
│   │   ├── imageStore.js    # 图片状态
│   │   ├── favoriteStore.js # 收藏状态
│   │   ├── tagStore.js      # 标签状态
│   │   └── themeStore.js    # 主题状态
│   ├── utils/               # 工具函数
│   │   ├── validation.js    # 验证工具
│   │   ├── format.js        # 格式化工具
│   │   ├── request.js       # 请求工具
│   │   └── storage.js       # 存储工具
│   ├── services/            # API 服务
│   │   └── uploadService.js # 上传服务
│   ├── styles/              # 全局样式
│   │   ├── index.css        # 主样式
│   │   └── variables.css    # CSS 变量
│   ├── App.jsx              # 根组件
│   └── main.jsx             # 入口文件
├── public/                  # 静态资源
├── vite.config.js           # Vite 配置
└── package.json             # 依赖配置
```

## 🎨 自定义主题

编辑 `src/styles/variables.css` 自定义颜色：

```css
:root {
  --primary-color: #4f46e5;
  --primary-light: #6366f1;
  --primary-dark: #4338ca;
  /* ... 更多颜色 */
}
```

## 📝 API 文档

### 认证

- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/user` - 获取当前用户
- `PUT /api/auth/profile` - 更新资料
- `PUT /api/auth/password` - 修改密码

### 图片

- `POST /upload` - 上传图片
- `GET /api/images` - 获取图片列表
- `DELETE /api/images/:id` - 删除图片
- `PUT /api/images/:id` - 更新图片信息

### 收藏

- `GET /api/favorites` - 获取收藏列表
- `POST /api/favorites/:id` - 添加收藏
- `DELETE /api/favorites/:id` - 取消收藏

### 标签

- `GET /api/tags` - 获取标签列表
- `POST /api/tags` - 创建标签
- `PUT /api/tags/:id` - 更新标签
- `DELETE /api/tags/:id` - 删除标签

完整 API 文档请查看 [API.md](./API.md)

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](./CONTRIBUTING.md)

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 AGPL-3.0-with-Commons-Clause 许可证 - 查看 [LICENSE](../LICENSE) 文件了解详情

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/tg-image&type=Date)](https://star-history.com/#your-username/tg-image&Date)

## 💖 致谢

- [React](https://react.dev/) - UI 框架
- [Vite](https://vitejs.dev/) - 构建工具
- [Cloudflare Workers](https://workers.cloudflare.com/) - 无服务器平台
- [Telegram](https://telegram.org/) - 图片存储
- [Hono](https://hono.dev/) - Web 框架

## 📧 联系方式

- 提交 Issue: [GitHub Issues](https://github.com/your-username/tg-image/issues)
- 邮箱: your-email@example.com
- Telegram: [@your_username](https://t.me/your_username)

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐️ Star 支持一下！**

Made with ❤️ by [Your Name](https://github.com/your-username)

</div>
