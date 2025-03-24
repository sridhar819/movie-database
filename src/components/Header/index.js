import {useState, useContext} from 'react'
import {Link, useLocation, withRouter} from 'react-router-dom'
import SearchContext from '../../SearchContext'

import './index.css'

const Header = props => {
  const [searchInput, setInput] = useState('')
  const {history} = props

  const location = useLocation()
  const {addSearchValue} = useContext(SearchContext)

  const handleInput = e => {
    setInput(e.target.value)
  }

  const handleKey = e => {
    if (e.key === 'Enter' && searchInput !== '') {
      addSearchValue(searchInput)
      history.push('/searched-movies')
    }
  }

  const handleSearchBtn = () => {
    addSearchValue(searchInput)
    history.push('/searched-movies')
  }

  return (
    <nav className="navbar pt-3">
      <ul className="menu-card">
        <li>
          <Link to="/" className="mr-3">
            <h1 className="nav-head">MovieDB</h1>
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className={`menu-name ${location.pathname === '/' ? 'active' : ''}`}
          >
            Popular
          </Link>
        </li>
        <li>
          <Link
            to="/top-rated"
            className={`menu-name ${
              location.pathname === '/top-rated' ? 'active' : ''
            }`}
          >
            Top Rated
          </Link>
        </li>
        <li>
          <Link
            to="/upcoming"
            className={`menu-name ${
              location.pathname === '/upcoming' ? 'active' : ''
            }`}
          >
            Upcoming
          </Link>
        </li>
      </ul>
      <div className="search-card">
        <input
          onKeyDown={handleKey}
          onChange={handleInput}
          type="text"
          value={searchInput}
          placeholder="Enter Movie Name"
        />
        <button onClick={handleSearchBtn} type="button">
          Search
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
