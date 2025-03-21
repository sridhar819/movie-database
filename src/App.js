import {useState} from 'react'

import {Switch, Route} from 'react-router-dom'
import SearchContext from './SearchContext'
import Home from './components/Home'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SearchedMovies from './components/SearchedMovies'
import MovieDetails from './components/MovieDetails'
import Header from './components/Header'

import './App.css'

const App = () => {
  const [userInput, setUserInput] = useState('')

  const addSearchValue = value => {
    if (value) {
      setUserInput(value)
    }
  }

  const API_KEY = 'ce236f158477173486a75637bb0e77d8'

  const searchUrl = userInput
    ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${userInput}&page=`
    : ''

  const values = {
    userInput,
    addSearchValue,
    searchUrl,
  }

  return (
    <SearchContext.Provider value={values}>
      <div className="bg-container">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/top-rated" component={TopRated} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/movie/:id" component={MovieDetails} />
          <Route exact path="/searched-movies" component={SearchedMovies} />
        </Switch>
      </div>
    </SearchContext.Provider>
  )
}

export default App
