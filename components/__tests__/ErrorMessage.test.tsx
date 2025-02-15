import { render, screen } from '@testing-library/react-native'
import { ErrorMessage } from '../ErrorMessage'

describe('ErrorMessage', () => {
  it('renders error message correctly', () => {
    render(<ErrorMessage />)
    expect(screen.getByText('Something went wrong')).toBeTruthy()
    expect(screen.getByText('Please try again later')).toBeTruthy()
  })
})
