import {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'

import './index.css'

const stagesList = {
  initial: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const API_KEY = 'ce236f158477173486a75637bb0e77d8'

const MovieDetails = props => {
  const [data, setData] = useState({
    activeStage: stagesList.initial,
    movieDetails: {},
  })

  console.log('stateDataD', data)

  const {match} = props
  const {params} = match
  const {id} = params

  const getMovieDetails = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    const response = await fetch(url)
    const apiData = await response.json()
    console.log('movieDetails', apiData)

    if (response.ok) {
      const updatedData = {
        ...apiData,
        backdropPath: apiData.backdrop_path,
        releaseDate: apiData.release_date,
        posterPath: apiData.poster_path,
        collection: apiData.belongs_to_collection?.name,
        voteAverage: apiData.vote_average,
        voteCount: apiData.vote_count,
        productionCompanies: apiData.production_companies.map(each => ({
          ...each,
          logoPath: each.logo_path,
          originCountry: each.origin_country,
        })),
      }
      setData({movieDetails: updatedData, activeStage: stagesList.success})
    }
  }

  useEffect(() => {
    getMovieDetails()
  }, [id])

  const {
    backdropPath,
    posterPath,
    title,
    adult,
    homepage,
    overview,
    runtime,
    status,
    voteAverage,
    voteCount,
    tagline,
    budget,
    popularity,
    releaseDate,
    collection,
  } = data.movieDetails

  const backgroundUrl = `https://image.tmdb.org/t/p/w1280/${backdropPath}`

  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w200/${posterPath}`
    : 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'

  return (
    <div
      style={{
        backgroundImage: backdropPath
          ? `linear-gradient(to right,rgba(0,0,0),transparent),url(${backgroundUrl})`
          : 'linear-gradient(to right,rgba(0,0,0.5),transparent)',
      }}
      className="movie-details-container"
    >
      <div className="movie-details-card">
        <div className="movie-details-img">
          <img src={posterUrl} alt="" />
        </div>
        <div className="details-card p-2 gap-2">
          <h1 className="m-0">{title}</h1>
          <p style={{fontSize: '13px'}} className="mb-2 text-light">
            {overview}
          </p>
          <div className="d-flex mb-2">
            {budget > 0 && (
              <p style={{fontSize: '12px'}}>budget: Rs {budget}/-</p>
            )}
            {collection && <p style={{fontSize: '12px'}}>{collection}</p>}
          </div>
          <div className="d-flex justify-content-between mb-2">
            <p className="text-info" style={{fontSize: '12px'}}>
              <span className="fs-6">Rum Time:</span> {runtime}
            </p>
            <p className="text-light" style={{fontSize: '12px'}}>
              <span className="fs-6">Released in:</span> {releaseDate}
            </p>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <p style={{fontSize: '14px'}}>{voteAverage}⭐/10</p>
            <p style={{fontSize: '12px'}}>({voteCount} Reviews)</p>
          </div>
          <p style={{fontSize: '14px'}} className="mt-2 text-secondary">
            Popularity: {popularity}
          </p>
          {adult && <p className="text-danger">{adult}</p>}
          <p style={{fontSize: '12px'}}>{tagline}</p>
          {homepage && (
            <a
              className="fw-bold"
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Movie
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default withRouter(MovieDetails)
