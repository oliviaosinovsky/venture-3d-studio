import {defineConfig} from 'vite';
export default defineConfig({base:'/venture-3d-studio/',publicDir:false,build:{target:'es2022',assetsDir:'',rollupOptions:{input:{studio:'index.html',viewer:'viewer.html'}}}});
