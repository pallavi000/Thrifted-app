export default {
  expo: {
    name: "Hamro Closet",
    slug: "HamroCloset",
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
      buildNumber: "5",
      bundleIdentifier: "com.thriftmarket.HamroCloset",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.thriftmarket.HamroCloset",
    },
    web: {
      favicon: "./assets/favicon.png",
      build: {
        babel: {
          include: ["rn-all-nepal-payment"],
        },
      },
    },
    extra: {
      eas: {
        projectId: "73860936-5567-4ac0-a29f-0ae5bf17dd74",
      },
      KHALTI_SECRET: process.env.KHALTI_SECRET,
      ESEWA_SECRET: process.env.ESEWA_SECRET,
      API_URL: process.env.API_URL,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    },
  },
};
