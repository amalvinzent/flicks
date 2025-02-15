import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import { Movie } from '../../types/movie'
import { movieAPI } from '../../services/api'
import { theme } from '../../constants/theme'
import { useResponsive } from '../../hooks/useResponsive'
import { LoadingOverlay } from '../../components/LoadingOverlay'
import { ErrorMessage } from '../../components/ErrorMessage'

export default function MovieDetails() {
  const { id } = useLocalSearchParams()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const { isTablet } = useResponsive()

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true)
        const data = await movieAPI.getMovieDetails(Number(id))
        setMovie(data)
      } catch (error) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMovieDetails()
  }, [id])

  if (isLoading) {
    return <LoadingOverlay />
  }

  if (error) {
    return <ErrorMessage />
  }

  if (!movie) return null

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: isTablet
            ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
            : `https://image.tmdb.org/t/p/w780${movie.poster_path}`
        }}
        style={[styles.poster, { height: isTablet ? 600 : 550 }]}
        contentFit="cover"
        transition={300}
        placeholder={require('../../assets/images/placeholder.png')}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.metadata}>
          <Text style={styles.releaseDate}>{movie.release_date}</Text>
          <Text style={styles.rating}>⭐️ {movie.vote_average.toFixed(1)}</Text>
        </View>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  poster: {
    width: '100%'
  },
  content: {
    padding: theme.spacing.lg
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg
  },
  releaseDate: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: theme.colors.textSecondary
  },
  rating: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: theme.colors.textSecondary,
    backgroundColor: `${theme.colors.primary}15`,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm
  },
  overview: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24
  }
})
