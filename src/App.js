import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SearchedMovies from './components/SearchedMovies'
import MovieDetails from './components/MovieDetails'
import Header from './components/Header'

import './App.css'

const App = () => (
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
)

export default App
