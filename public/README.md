# Public 目录

这个目录用于存放 React 应用构建后的静态文件。

## 构建流程

当你运行 `npm run build` 时：

1. Vite 会构建 `client/` 中的 React 应用
2. 构建产物会输出到这个 `public/` 目录
3. Cloudflare Workers 会通过 `serveStatic` 服务这些文件

## 目录结构（构建后）

```
public/
├── index.html              # 主 HTML 文件
├── assets/                 # 静态资源
│   ├── index-[hash].js    # 主 JS bundle
│   ├── index-[hash].css   # 主 CSS bundle
│   └── ...                # 其他分割的 chunks
├── images/                 # 图片资源（保留）
│   ├── logo.svg
│   └── blocked.png
└── README.md              # 本文件
```

## 注意事项

- ⚠️ 不要手动修改这个目录中的文件（除了 `images/` 和本 README）
- ⚠️ 构建时会清空并重新生成所有文件
- ✅ `images/` 目录中的文件会被保留
- ✅ 部署前请确保已运行 `npm run build`

## 快速命令

```bash
# 构建 React 应用
npm run build

# 构建并部署
npm run build:deploy

# 本地预览构建产物
cd client && npm run preview
```
