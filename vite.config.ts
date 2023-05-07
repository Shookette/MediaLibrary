import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA, VitePWAOptions} from 'vite-plugin-pwa';

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  includeAssets: ['**/*'],
  devOptions: {
    enabled: true,
  },
  workbox: {
    globPatterns: ['**/*'],
  },
  manifest: {
    theme_color: '#000000',
    name: 'Media Library',
    short_name: 'ML',
    description: 'Etagère de média',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
    icons: [
      {
        'src': '/icon-192x192.png',
        'sizes': '192x192',
        'type': 'image/png',
      },
      {
        'src': '/apple-icon-180.png',
        'sizes': '180x180',
        'type': 'image/png',
      },
      {
        'src': '/manifest-icon-192.maskable.png',
        'sizes': '192x192',
        'type': 'image/png',
        'purpose': 'any maskable',
      },
      {
        'src': '/manifest-icon-512.maskable.png',
        'sizes': '512x512',
        'type': 'image/png',
        'purpose': 'any maskable',
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
