import {createContext, useState} from 'react'

export const SearchContext = createContext()

const SearchContextProvider = props => {
  const [userInput, setUserInput] = useState('')

  const addSearchValue = value => {
    console.log(value, 'contextvalue')
    setUserInput(value)
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

  const {children} = props
  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  )
}

export default SearchContextProvider
