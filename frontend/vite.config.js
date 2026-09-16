import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({command, mode}) => {
 const env = loadEnv(mode, process.cwd(), 'VITE_');
 if (command === 'build') {
  let url;
  try { url = new URL(env.VITE_API_URL); } catch {}
  if (!url || !['http:', 'https:'].includes(url.protocol) ||
      url.username || url.password || url.search || url.hash || url.pathname !== '/') {
   throw new Error('Set VITE_API_URL to the backend origin before building, e.g. https://your-api.onrender.com (no /api path).');
  }
 }
 return {server: {proxy: {'/api': 'http://127.0.0.1:3001'}}};
});
