import { render, screen, waitFor } from '@testing-library/react-native'
import Popular from '../Popular'
import { movieAPI } from '../../../services/api'

jest.mock('../../../services/api', () => ({
  movieAPI: {
    getPopular: jest.fn()
  }
}))

const mockMovies = {
  results: [
    {
      id: 1,
      title: 'Movie 1',
      poster_path: '/poster1.jpg',
      release_date: '2023-01-01',
      vote_average: 8.5,
      overview: 'Overview 1',
      backdrop_path: '/backdrop1.jpg'
    },
    {
      id: 2,
      title: 'Movie 2',
      poster_path: '/poster2.jpg',
      release_date: '2023-01-02',
      vote_average: 7.5,
      overview: 'Overview 2',
      backdrop_path: '/backdrop2.jpg'
    }
  ]
}

describe('Popular', () => {
  beforeEach(() => {
    ;(movieAPI.getPopular as jest.Mock).mockReset()
  })
  it('shows loading state initially', () => {
    ;(movieAPI.getPopular as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    )
    render(<Popular />)
    expect(screen.getByTestId('loading-overlay')).toBeTruthy()
  })

  it('renders movies after successful fetch', async () => {
    ;(movieAPI.getPopular as jest.Mock).mockResolvedValue(mockMovies)
    render(<Popular />)
    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeTruthy()
      expect(screen.getByText('Movie 2')).toBeTruthy()
    })
  })

  it('shows error message on API failure', async () => {
    ;(movieAPI.getPopular as jest.Mock).mockRejectedValue(
      new Error('API Error')
    )
    render(<Popular />)
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeTruthy()
    })
  })
})
