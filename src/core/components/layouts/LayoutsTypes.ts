import {ReactNode} from 'react'

export interface LayoutPublicProps {
  children?: ReactNode
}

export interface LayoutStyledProps {
  bgcolor?: string
  gradient?: string
  logo?: number
  search?: number
  megamenu?: number
  darkmode?: number
  notifications?: number
  messenger?: number
  language?: number
  userbox?: number
  toggle?: number
}
