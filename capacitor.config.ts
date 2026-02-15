import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'hyphae.space',
  appName: 'Hyphae.space',
  webDir: 'public',
  server: {
    url: 'http://172.20.10.3',
    cleartext: true
  }
};

export default config;

