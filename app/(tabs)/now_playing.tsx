import { View, Text, StyleSheet } from 'react-native'

export default function NowPlaying() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Flicks</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 20
  }
})
