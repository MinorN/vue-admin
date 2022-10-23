import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'node:path'

// 全局引入ref...等
import AutoImport from 'unplugin-auto-import/vite'
export default defineConfig({
  plugins: [
      AutoImport({
        imports:['vue','vue-router','pinia'],
        dts:'./src/auto-import.d.ts'
      }),
      vue()
  ],
  resolve:{
    alias: {
      '@' : path.resolve(__dirname,'src')
    }
  }
})
