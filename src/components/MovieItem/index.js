import {withRouter} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {movie, history} = props

  const {
    id,
    posterPath,
    title,
    overview,
    adult,
    releaseDate,
    voteAverage,
    voteCount,
  } = movie

  const navToDetails = () => {
    history.push(`/movie/${id}`)
  }

  return (
    <div className="movie-item pb-5">
      <img className="poster" src={posterPath} alt={title} />
      <h1 className="mt-2 ps-2">{title}</h1>
      {overview && <p className="overview px-2">{overview}</p>}
      {adult && <p className="adult">18 +</p>}
      <div className="d-flex px-2 justify-content-between align-items-center mb-2">
        <p className="date">
          Released in <br />
          {releaseDate}
        </p>
        <div className="d-flex flex-column align-items-center">
          <p className="rating text-danger">
            {voteAverage}⭐<span className="text-info">out of 10</span>
          </p>
          <p className="review-count ms-md-2">({voteCount} Reviews)</p>
        </div>
      </div>
      <button
        onClick={navToDetails}
        id="viewDetailsBtn"
        className="btn btn-outline-primary ms-2 mb-2"
        type="button"
      >
        View Details
      </button>
    </div>
  )
}

export default withRouter(MovieItem)
