import type { CapacitorConfig } from '@capacitor/cli';

import packageJson from './package.json' with { type: 'json' };

const author = String(packageJson.author?.name || packageJson.author || '')
.toLowerCase()
.replace(/[\W_]+/giu, '_');
const name  = packageJson.name.replace(/[\W_]+/giu, '_');
const productName = packageJson.productName;

const config: CapacitorConfig = {
  appId: `com.${author}.${name}`,
  appName: `${productName}`,
  webDir: 'dist',
  android: {
    path: 'build/capacitor/android',
  },
  ios: {
    path: 'build/capacitor/ios',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#ffffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
