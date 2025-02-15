import { API_KEY } from '@env'

const BASE_URL = 'https://api.themoviedb.org/3/movie'

interface ApiConfig {
  baseURL: string
  apiKey: string
}

const config: ApiConfig = {
  baseURL: BASE_URL,
  apiKey: API_KEY
}

export const fetchFromAPI = async (endpoint: string) => {
  try {
    const response = await fetch(
      `${config.baseURL}/${endpoint}?api_key=${config.apiKey}`
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

export const movieAPI = {
  getNowPlaying: () => fetchFromAPI('/movie/now_playing'),
  getMovieDetails: (movieId: number) => fetchFromAPI(`/movie/${movieId}`)
}
