export type Movie = {
  id: number
  title: string
  release_date: string
  overview: string
  poster_path: string
  vote_average: number
  runtime?: number
  genres?: Array<{ id: number; name: string }>
  tagline?: string
}
