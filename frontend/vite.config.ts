import { defineConfig } from 'vite'
import { resolve } from 'path'
import litcss from 'rollup-plugin-lit-css';



// https://vitejs.dev/config/
export default defineConfig({
  /*
  server: {
    strictPort: true,
    proxy: {
      '/': {
        target: 'http://localhost:8000',
        changeOrigin: false,
        secure: false,
      },
    },
  },*/
  build: {
    outDir: resolve('../static/scripts'),
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'frontend',
      fileName: 'frontend',
      formats: ['es'],
    },
    manifest: true,
    emptyOutDir: true,
    rollupOptions: {
      // external: ['lit'],
      input: 'src/index.ts',
      plugins: [
        {...litcss(), enforce: 'post'},
      ],
    },
  },
  plugins: [
        {...litcss(), enforce: 'post'},
  ],
})
