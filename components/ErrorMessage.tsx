import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../constants/theme'

export const ErrorMessage = () => {
  return (
    <View style={styles.container} testID="error-message">
      <Text style={styles.text}>Something went wrong</Text>
      <Text style={styles.subText}>Please try again later</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.xl
  },
  text: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: theme.colors.text,
    textAlign: 'center'
  },
  subText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
    textAlign: 'center'
  }
})
