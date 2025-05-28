import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [vue()],
        base: process.env.BASE_URL,
        define: {
            'process.env.BASE_URL': JSON.stringify(env.BASE_URL)
        }
    }
})
