import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          href: null 
        }}
      />
      <Tabs.Screen
        name="now_playing"
        options={{
          title: 'Now Playing',
          headerShown: false
        }}
      />
    </Tabs>
  )
}
