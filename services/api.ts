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
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000)
    const response = await fetch(
      `${config.baseURL}/${endpoint}?api_key=${config.apiKey}`,
      {
        signal: controller.signal
      }
    )
    clearTimeout(timeoutId)
    if (!response.ok) {
      throw new Error('API request failed')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export const movieAPI = {
  getNowPlaying: () => fetchFromAPI('now_playing'),
  getPopular: () => fetchFromAPI('popular'),
  getTopRated: () => fetchFromAPI('top_rated'),
  getUpcoming: () => fetchFromAPI('upcoming'),
  getMovieDetails: (movieId: number) => fetchFromAPI(`${movieId}`)
}
