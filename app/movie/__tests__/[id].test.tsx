import { render, screen, waitFor } from '@testing-library/react-native'
import MovieDetails from '../[id]'
import { movieAPI } from '../../../services/api'

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ id: '123' }),
  Link: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('../../../services/api', () => ({
  movieAPI: {
    getMovieDetails: jest.fn()
  }
}))

jest.mock('expo-image', () => ({
  Image: 'Image'
}))

const mockMovie = {
  id: 123,
  title: 'Test Movie',
  poster_path: '/test-poster.jpg',
  release_date: '2024-01-01',
  vote_average: 8.5,
  overview: 'Test movie overview',
  backdrop_path: '/test-backdrop.jpg'
}

describe('MovieDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading state initially', async () => {
    ;(movieAPI.getMovieDetails as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    )
    render(<MovieDetails />)
    await waitFor(() => {
      expect(screen.getByTestId('loading-overlay')).toBeTruthy()
    })
  })

  it('renders movie details after successful fetch', async () => {
    ;(movieAPI.getMovieDetails as jest.Mock).mockResolvedValue(mockMovie)
    render(<MovieDetails />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeTruthy()
      expect(screen.getByText('2024-01-01')).toBeTruthy()
      expect(screen.getByText('⭐️ 8.5')).toBeTruthy()
      expect(screen.getByText('Test movie overview')).toBeTruthy()
    })
  })

  it('shows error message on API failure', async () => {
    ;(movieAPI.getMovieDetails as jest.Mock).mockRejectedValue(
      new Error('API Error')
    )
    render(<MovieDetails />)
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeTruthy()
    })
  })

  it('calls getMovieDetails with correct movie ID', async () => {
    ;(movieAPI.getMovieDetails as jest.Mock).mockResolvedValue(mockMovie)
    render(<MovieDetails />)
    
    await waitFor(() => {
      expect(movieAPI.getMovieDetails).toHaveBeenCalledWith(123)
    })
  })
})