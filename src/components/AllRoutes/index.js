import {useLocation, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {useState} from 'react'

import MovieItem from '../MovieItem'
import useFetch from '../../useFetch'
import './index.css'

const stagesList = {
  initial: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

function renderLoader() {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Loader type="ThreeDots" height={45} width={45} color="orange" />
    </div>
  )
}

const AllRoutes = ({type = '', searchUrl = ''}) => {
  const [pageNo, setPage] = useState(1)

  const fetchurl = searchUrl !== '' ? searchUrl : type

  const data = useFetch(fetchurl, pageNo)

  console.log(data, 'data')

  const location = useLocation()

  const goToFirstPage = () => {
    setPage(1)
  }

  const goToLastPage = () => {
    setPage(500)
  }

  const handleNextPage = () => {
    if (pageNo < 500) {
      setPage(pre => pre + 1)
    }
  }

  const handlePrevPage = () => {
    if (pageNo > 1) {
      setPage(pre => pre - 1)
    }
  }

  const heading =
    location.pathname === '/' ? (
      <h1 style={{fontSize: '20px'}} className="m-0 mt-2 px-3">
        Popular
      </h1>
    ) : null

  const successView = () => (
    <>
      {heading}
      <div className="movie-list">
        {data.movieList.map(each => (
          <MovieItem key={each.id} movie={each} />
        ))}
        <div className="d-flex justify-content-center gap-2 align-items-center w-100">
          <button
            onClick={goToFirstPage}
            type="button"
            className="btn btn-outline-primary"
          >
            first
          </button>
          <button
            onClick={handlePrevPage}
            type="button"
            className="btn btn-outline-danger"
          >
            Prev
          </button>
          <mark className="px-2">{pageNo}</mark>
          <button
            onClick={handleNextPage}
            type="button"
            className="btn btn-outline-success"
          >
            Next
          </button>
          <button
            onClick={goToLastPage}
            type="button"
            className="btn btn-outline-warning"
          >
            Last
          </button>
        </div>
        {pageNo >= 500 && (
          <p className="text-danger text-center w-100">Max pages Reached</p>
        )}
      </div>
    </>
  )

  switch (data.activeStage) {
    case stagesList.initial:
      return renderLoader()
    case stagesList.success:
      return data.movieList.length >= 1 ? (
        successView()
      ) : (
        <Link className="d-flex justify-content-center mt-5" to="/">
          <button className="btn btn-primary" type="button">
            Go to home page
          </button>
        </Link>
      )
    default:
      return null
  }
}

export default AllRoutes
