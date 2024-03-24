import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.hanziness.FocusTide',
  appName: 'FocusTide',
  webDir: '../dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
