/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['5173-i5mwwhh00b0bnmmk4hgem-41f2f65b.sg2.manus.computer'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
