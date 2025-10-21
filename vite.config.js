import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    server: {
      port: 3000,
      open: true
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets'
    }
  }

  // Only set base path for production builds
  if (command === 'build') {
    config.base = '/magic-beans-for-dev/'
  }

  return config
})