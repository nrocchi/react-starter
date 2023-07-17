import {createContext, useContext} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {fr, enUS} from 'date-fns/locale'
import {
  LanguageState,
  LanguageContextValue,
  LanguageProviderProps,
} from './LanguageContextTypes'
import internationalization from './i18n'

const initialState: LanguageState = {
  getLanguage: '',
}

export const LanguageContext = createContext<LanguageContextValue>({
  ...initialState,
  changeLanguage: () => {},
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({children}: LanguageProviderProps) => {
  const {i18n, t} = useTranslation()
  const getLanguage = localStorage.getItem('i18nextLng') || i18n.language

  // date-fns locales
  const locales: {[key: string]: Locale} = {fr, en: enUS}

  const changeLanguage = ({language}: {language: any}) => {
    internationalization.changeLanguage(language)
    localStorage.setItem('i18nextLng', language)
  }

  const contextValues = {
    getLanguage,
    changeLanguage,
  }

  return (
    <LanguageContext.Provider value={contextValues}>
      {/* <LocalizationProvider
        dateAdapter={AdapterDateFns}
        locale={locales[getLanguage.split('-')[0]]}> */}
      {children}
      {/* </LocalizationProvider> */}
    </LanguageContext.Provider>
  )
}

LanguageProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
