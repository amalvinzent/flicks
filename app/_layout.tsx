import { Stack } from 'expo-router'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'
import { Platform, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: true,
            headerTitle: '',
            headerTintColor: '#fff',
            headerBackVisible: true,
            headerTransparent: true,
            animation: Platform.OS === 'android' ? 'flip' : 'default',
            animationDuration: 500,
            presentation: 'card',
            gestureEnabled: true,
            gestureDirection: 'horizontal'
          }}
        />
      </Stack>
      <Toast />
    </View>
  )
}
