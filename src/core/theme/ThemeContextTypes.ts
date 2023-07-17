import {ReactNode} from 'react'

export interface ThemeState {
  currentTheme: string
}

export interface ThemeContextValue extends ThemeState {
  changeTheme: (theme: string) => void
}

export interface ThemeProviderCustomProps {
  children: ReactNode
}
