import {ReactNode} from 'react'

export interface LanguageState {
  getLanguage: string
}

export interface LanguageContextValue extends LanguageState {
  changeLanguage: (language: any) => void
}

export interface LanguageProviderProps {
  children: ReactNode
}
