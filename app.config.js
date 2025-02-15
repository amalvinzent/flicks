export default {
  expo: {
    name: 'flicks',
    extra: {
      API_KEY: process.env.API_KEY,
      eas: {
        projectId: '5e58067a-7edb-4fbd-81d8-dd3cecb01736'
      }
    },
    android: {
      package: 'com.flicks.app'
    }
  }
}
