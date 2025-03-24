import AllRoutes from '../AllRoutes'

import SearchContext from '../../SearchContext'

import './index.css'

const SearchedMovies = () => (
  <SearchContext.Consumer>
    {value => {
      const {searchUrl} = value

      return <AllRoutes searchUrl={searchUrl} />
    }}
  </SearchContext.Consumer>
)

export default SearchedMovies
