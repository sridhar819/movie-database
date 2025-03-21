import {BrowserRouter} from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import SearchContextProvider from './SearchContext'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
