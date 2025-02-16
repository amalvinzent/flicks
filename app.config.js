export default {
  expo: {
    name: 'flicks',
    extra: {
      API_KEY: process.env.API_KEY,
      eas: {
        projectId: '5e58067a-7edb-4fbd-81d8-dd3cecb01736'
      }
    },
    icon: './assets/images/icon.png',
    android: {
      package: 'com.flicks.app',
    },
    ios: {
      bundleIdentifier: 'com.flicks.app',
      icon: './assets/images/icon.png'
    }
  }
}
