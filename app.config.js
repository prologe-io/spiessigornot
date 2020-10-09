require("dotenv").config();

const allowedEmails =
  process.env.EXPO_ALLOWED_EMAILS.length > 0
    ? process.env.EXPO_ALLOWED_EMAILS.split(",")
    : "";

export default {
  name: "spiessigornot",
  slug: "spiessigornot",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  android: {
    package: "com.prologe.spiessigornot",
    versionCode: 3,
  },
  extra: {
    apiKey: process.env.EXPO_API_KEY,
    authDomain: process.env.EXPO_AUTH_DOMAIN,
    databaseUrl: process.env.EXPO_DATABASE_URL,
    projectId: process.env.EXPO_PROJECT_ID,
    storageBucket: process.env.EXPO_STORAGE_BUCKET,
    appId: process.env.EXPO_APP_ID,
    allowedEmails,
  },
};
