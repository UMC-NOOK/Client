import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // 'global' 변수를 'window'로 대체하여 브라우저 환경에서 사용 가능하게 함
    global: 'window',
  },
});
