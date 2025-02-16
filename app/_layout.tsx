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
import { theme } from '@/constants/theme'

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
    <View
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      onLayout={onLayoutRootView}
    >
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: '#000'
          },
          headerStyle: {
            backgroundColor: 'transparent'
          },
          headerTransparent: true,
          animation: Platform.OS === 'android' ? 'fade_from_bottom' : 'default',
          presentation: 'card',
          animationDuration: 200,
          gestureEnabled: true,
          gestureDirection: 'horizontal'
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: true,
            headerTitle: '',
            headerTintColor: '#fff',
            headerBackVisible: true,
            headerTransparent: true,
            animation: 'none'
          }}
        />
      </Stack>
      <Toast />
    </View>
  )
}
