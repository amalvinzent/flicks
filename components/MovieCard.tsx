import { View, Text, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { theme } from '../constants/theme'
import { Movie } from '../types/movie'
import { useResponsive } from '../hooks/useResponsive'

type MovieCardProps = {
  movie: Movie
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { isTablet } = useResponsive()

  return (
    <View style={styles.movieCard}>
      <Image
        source={{
          uri: isTablet
            ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
            : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }}
        style={[styles.poster, { height: isTablet ? 400 : 300 }]}
        contentFit="cover"
        transition={300}
        cachePolicy="memory-disk"
        placeholder={require('../assets/placeholder.png')}
      />
      <View style={styles.movieInfo}>
        <Text
          style={[styles.movieTitle, isTablet && styles.tabletTitle]}
          numberOfLines={2}
        >
          {movie.title}
        </Text>
        <Text style={[styles.releaseDate, isTablet && styles.tabletText]}>
          {movie.release_date}
        </Text>
        <Text style={[styles.rating, isTablet && styles.tabletText]}>
          ⭐️ {movie.vote_average.toFixed(1)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  movieCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    flex: 1,
    margin: theme.spacing.sm
  },
  poster: {
    width: '100%'
  },
  movieInfo: {
    padding: theme.spacing.sm
  },
  movieTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs
  },
  releaseDate: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    opacity: 0.8
  },
  rating: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: theme.colors.textSecondary,
    backgroundColor: `${theme.colors.primary}15`,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    alignSelf: 'flex-start'
  },

  tabletTitle: {
    fontSize: 18
  },
  tabletText: {
    fontSize: 16
  }
})
