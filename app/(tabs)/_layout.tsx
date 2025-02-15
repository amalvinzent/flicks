import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs>
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
          headerShown: false
        }}
      />
    </Tabs>
  )
}
