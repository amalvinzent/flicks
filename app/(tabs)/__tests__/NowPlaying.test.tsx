import { render, screen, waitFor } from '@testing-library/react-native'
import NowPlaying from '../NowPlaying'
import { movieAPI } from '../../../services/api'

jest.mock('../../../services/api', () => ({
  movieAPI: {
    getNowPlaying: jest.fn()
  }
}))

jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('expo-image', () => ({
  Image: 'Image'
}))

const mockMovies = {
  results: [
    {
      id: 1,
      title: 'Test Movie',
      poster_path: '/test-path.jpg',
      release_date: '2024-01-01',
      vote_average: 8.5,
      overview: 'Test overview'
    }
  ]
}

describe('NowPlaying', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading state initially', () => {
    ;(movieAPI.getNowPlaying as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    )
    render(<NowPlaying />)
    expect(screen.getByTestId('loading-overlay')).toBeTruthy()
  })

  it('renders movies when API call is successful', async () => {
    ;(movieAPI.getNowPlaying as jest.Mock).mockResolvedValue(mockMovies)
    render(<NowPlaying />)
    
    await waitFor(() => {
      expect(screen.getByText('Now Playing')).toBeTruthy()
      expect(screen.getByText('Test Movie')).toBeTruthy()
    })
  })

  it('shows error message when API call fails', async () => {
    ;(movieAPI.getNowPlaying as jest.Mock).mockRejectedValue(
      new Error('API Error')
    )
    render(<NowPlaying />)
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeTruthy()
    })
  })
})
