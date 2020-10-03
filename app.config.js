require('dotenv').config()


export default {
  extra: {
    apiKey: process.env.EXPO_API_KEY,
    authDomain: process.env.EXPO_AUTH_DOMAIN,
    databaseUrl: process.env.EXPO_DATABASE_URL,
    projectId: process.env.EXPO_PROJECT_ID,
    storageBucket: process.env.EXPO_STORAGE_BUCKET,
    appId: process.env.EXPO_APP_ID,
    allowedEmails: process.env.EXPO_ALLOWED_EMAILS.split(','),
  },
};