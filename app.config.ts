import { ExpoConfig } from '@expo/config-types';
import 'dotenv/config';

const config: ExpoConfig = {
  name: ' Swifty Companion',
  slug: 'swiftycompanion',
  scheme: 'swiftycompanion',
  version: '1.0.0',
  extra: {
    API_URL: process.env.FORTY_TWO_API_URL,
    API_UUID: process.env.FORTY_TWO_API_UUID,
    API_SECRET: process.env.FORTY_TWO_API_SECRET,
  },

  android: {
    package: 'com.anonymous.swiftycompanion',
  },
  ios: {
    bundleIdentifier: 'com.anonymous.swiftycompanion',
  },
};

export default config;
