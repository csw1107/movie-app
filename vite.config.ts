import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // 배포 프록시가 앱 루트(/g/<user>/<app>/) 기준 <base href> 를 주입하므로
  // 빌드 자산 경로를 상대경로(./)로 만들어 깨짐 방지
  base: "./",
  plugins: [react()],
})
