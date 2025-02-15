import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { theme } from '../constants/theme'

export const LoadingOverlay = () => {
  return (
    <View style={styles.container} testID="loading-overlay">
      <View style={styles.spinnerContainer}>
        <ActivityIndicator
          size="large"
          color={theme.colors.textSecondary}
          style={styles.spinner}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    transform: [{ scale: 1.2 }]
  }
})
