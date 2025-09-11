import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  optimizeDeps: {
    include: ['@apollo/client/core'],
    exclude: ['@apollo/client/react']
  },
  ssr: {
    noExternal: ['@apollo/client']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Apollo Client를 별도 청크로 분리
          'apollo': ['@apollo/client'],
          // UI 컴포넌트들을 별도 청크로 분리
          'ui': ['@radix-ui/react-avatar', '@radix-ui/react-checkbox', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-label', '@radix-ui/react-menubar', '@radix-ui/react-popover', '@radix-ui/react-select', '@radix-ui/react-separator', '@radix-ui/react-slot', '@radix-ui/react-switch', '@radix-ui/react-tooltip'],
          // 테이블 관련 라이브러리를 별도 청크로 분리
          'table': ['@tanstack/react-table'],
          // 폼 관련 라이브러리를 별도 청크로 분리
          'form': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // 아이콘 라이브러리를 별도 청크로 분리
          'icons': ['lucide-react'],
          // 유틸리티 라이브러리들을 별도 청크로 분리
          'utils': ['class-variance-authority', 'clsx', 'tailwind-merge', 'date-fns', 'luxon', 'papaparse', 'xlsx'],
          // 토스트 라이브러리를 별도 청크로 분리
          'toast': ['sonner'],
        },
      },
    },
    // 청크 사이즈 경고 임계값 증가 (성능 모니터링용)
    chunkSizeWarningLimit: 1000,
  },
});
