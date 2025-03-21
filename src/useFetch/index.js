import {useState, useEffect} from 'react'

const stagesList = {
  initial: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const useFetch = (type = '', page = 1) => {
  const [data, setData] = useState({
    activeStage: stagesList.initial,
    movieList: [],
    totalPages: '',
  })

  const API_KEY = 'ce236f158477173486a75637bb0e77d8'

  const apiUrl =
    type.length > 15
      ? `${type}${page}`
      : `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`

  const getData = async () => {
    const response = await fetch(apiUrl)
    const fetchedData = await response.json()

    if (response.ok) {
      const dataTotalPages = fetchedData.total_pages
      const updatedData = fetchedData.results.map(each => ({
        ...each,
        originalLanguage: each.original_language,
        originalTitle: each.original_title,
        posterPath: `https://image.tmdb.org/t/p/w200/${each.poster_path}`,
        releaseDate: each.release_date,
        voteAverage: each.vote_average,
        voteCount: each.vote_count,
        genreIds: each.genre_ids,
      }))

      setData({
        activeStage: stagesList.success,
        movieList: updatedData,
        totalPages: dataTotalPages,
      })
    }
  }

  useEffect(() => {
    getData()
  }, [type, page])

  return data
}

export default useFetch
