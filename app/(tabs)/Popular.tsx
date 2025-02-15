import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions
} from 'react-native'
import { useEffect, useState } from 'react'
import { movieAPI } from '../../services/api'
import { theme } from '../../constants/theme'
import { MovieCard } from '../../components/MovieCard'
import { Movie } from '../../types/movie'
import { LoadingOverlay } from '../../components/LoadingOverlay'
import { ErrorMessage } from '../../components/ErrorMessage'

export default function Popular() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const { width } = useWindowDimensions()

  const numColumns = width >= 768 ? 3 : 1

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true)
        const data = await movieAPI.getPopular()
        setMovies(data.results)
      } catch (error) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMovies()
  }, [])

  if (isLoading) {
    return <LoadingOverlay />
  }

  if (error) {
    return <ErrorMessage />
  }

  const renderMovie = ({ item: movie }: { item: Movie }) => (
    <View style={[styles.gridItem, { maxWidth: `${100 / numColumns}%` }]}>
      <MovieCard movie={movie} />
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular</Text>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        numColumns={numColumns}
        key={numColumns}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: theme.spacing.xl
  },
  listContainer: {
    padding: theme.spacing.md
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 28,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md
  },
  gridItem: {
    flex: 1
  }
})
