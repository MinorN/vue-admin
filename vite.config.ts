import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import {viteMockServe} from 'vite-plugin-mock';
// 全局引入ref...等
import AutoImport from 'unplugin-auto-import/vite';


export default ({command}) => {
    return defineConfig({
        plugins: [
            AutoImport({
                imports: ['vue', 'vue-router', 'pinia'],
                dts: './src/auto-import.d.ts'
            }),
            vue(),
            viteMockServe({
                // default
                mockPath: 'mock',
                localEnabled: command === 'serve',
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    });
}
