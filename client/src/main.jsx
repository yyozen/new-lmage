import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './styles/index.css';

// 创建 React Query 客户端
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5分钟
      cacheTime: 10 * 60 * 1000, // 10分钟
    },
    mutations: {
      retry: 1,
    },
  },
});

// 渲染应用
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        
        {/* 全局通知组件 */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            // 默认配置
            duration: 3000,
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
            // 成功通知
            success: {
              duration: 2000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
              style: {
                background: '#10b981',
                color: '#ffffff',
              },
            },
            // 错误通知
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
              style: {
                background: '#ef4444',
                color: '#ffffff',
              },
            },
            // 加载通知
            loading: {
              iconTheme: {
                primary: '#6366f1',
                secondary: '#ffffff',
              },
              style: {
                background: '#6366f1',
                color: '#ffffff',
              },
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// 性能监控（可选）
if (import.meta.env.DEV) {
  // 开发环境下的性能监控
  const reportWebVitals = (metric) => {
    console.log('📊 Performance Metric:', metric);
  };
  
  // 可以集成 web-vitals 库
  // import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
  // getCLS(reportWebVitals);
  // getFID(reportWebVitals);
  // getFCP(reportWebVitals);
  // getLCP(reportWebVitals);
  // getTTFB(reportWebVitals);
}
