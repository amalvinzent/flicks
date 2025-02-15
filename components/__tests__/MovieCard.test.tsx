import { render, screen } from '@testing-library/react-native'
import { MovieCard } from '../MovieCard'

jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('expo-image', () => ({
  Image: 'Image'
}))

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test-path.jpg',
  release_date: '2024-01-01',
  vote_average: 8.5,
  overview: 'Test overview'
}

describe('MovieCard', () => {
  it('renders movie information correctly', () => {
    render(<MovieCard movie={mockMovie} />)
    expect(screen.getByText('Test Movie')).toBeTruthy()
    expect(screen.getByText('2024-01-01')).toBeTruthy()
    expect(screen.getByText('⭐️ 8.5')).toBeTruthy()
  })
})
