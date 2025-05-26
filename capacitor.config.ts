
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e6eb28d8c20449aea09af76bcd0d16f7',
  appName: 'time-track-profile-view',
  webDir: 'dist',
  server: {
    url: 'https://e6eb28d8-c204-49ae-a09a-f76bcd0d16f7.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;
