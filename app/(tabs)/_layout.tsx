import { Tabs } from 'expo-router'
import { theme } from '../../constants/theme'
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins'
import { MaterialIcons } from '@expo/vector-icons'

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          height: theme.spacing.xl * 2.5,
          paddingBottom: theme.spacing.md,
          paddingTop: theme.spacing.sm,
          backdropFilter: 'blur(25px)',
          borderTopWidth: 0.5,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 5
        },
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontFamily: 'Poppins_400Regular',
          fontSize: 10,
          paddingBottom: theme.spacing.sm
        },
        animation: 'fade'
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="NowPlaying"
        options={{
          title: 'Now Playing',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="local-movies"
              size={20}
              color={color}
              style={{ transform: [{ scale: focused ? 1.2 : 1 }] }}
            />
          )
        }}
      />
      <Tabs.Screen
        name="Popular"
        options={{
          title: 'Popular',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="trending-up"
              size={20}
              color={color}
              style={{ transform: [{ scale: focused ? 1.2 : 1 }] }}
            />
          )
        }}
      />
      <Tabs.Screen
        name="TopRated"
        options={{
          title: 'Top Rated',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="star"
              size={20}
              color={color}
              style={{ transform: [{ scale: focused ? 1.2 : 1 }] }}
            />
          )
        }}
      />
      <Tabs.Screen
        name="Upcoming"
        options={{
          title: 'Upcoming',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="schedule"
              size={20}
              color={color}
              style={{ transform: [{ scale: focused ? 1.2 : 1 }] }}
            />
          )
        }}
      />
    </Tabs>
  )
}
