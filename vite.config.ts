import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA, VitePWAOptions} from 'vite-plugin-pwa';

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  includeAssets: ['**/*', 'vite.svg'],
  devOptions: {
    enabled: true,
  },
  workbox: {
    globPatterns: ['**/*'],
  },
  manifest: {
    theme_color: 'black',
    name: 'Media Library',
    short_name: 'ML',
    description: 'Etagère de média',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
