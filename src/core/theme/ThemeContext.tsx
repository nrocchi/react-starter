import {createContext, useState} from 'react'
import PropTypes from 'prop-types'
import {ThemeProvider} from '@mui/material'
import {StylesProvider} from '@mui/styles'
import {themeCreator} from './ThemeTypes'
import {
  ThemeState,
  ThemeContextValue,
  ThemeProviderCustomProps,
} from './ThemeContextTypes'

const initialState: ThemeState = {
  currentTheme: 'LightTheme',
}

export const ThemeContext = createContext<ThemeContextValue>({
  ...initialState,
  changeTheme: () => {},
})

export const ThemeProviderCustom = ({children}: ThemeProviderCustomProps) => {
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem('theme') || initialState.currentTheme,
  )
  const theme = themeCreator(currentTheme)

  const changeTheme = (newTheme: string): void => {
    localStorage.setItem('theme', newTheme)
    setCurrentTheme(newTheme)
  }

  const contextValues = {
    currentTheme,
    changeTheme,
  }

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={contextValues}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  )
}

ThemeProviderCustom.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
