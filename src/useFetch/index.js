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
        posterPath: each.poster_path
          ? `https://image.tmdb.org/t/p/w500${each.poster_path}`
          : 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg',
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
    setData(prevData => ({
      ...prevData,
      movieList: [],
      activeStage: stagesList.initial,
    }))
  }, [page])

  useEffect(() => {
    getData()
  }, [type, page])

  return data
}

export default useFetch
