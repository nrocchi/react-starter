import {ReactElement} from 'react'
import {SxProps, Theme} from '@mui/material'

export interface CardCustomProps {
  header?: ReactElement
  headerBgColor?: string
  headerGradient?: string
  headerPadding?: number
  content?: ReactElement
  contentBgColor?: string
  contentGradient?: string
  contentPadding?: number
  fullHeight?: boolean
  footer?: ReactElement
  footerBgColor?: string
  footerGradient?: string
  footerPadding?: number
  sx?: SxProps<Theme>
  sxContent?: SxProps<Theme>
  sxFooter?: SxProps<Theme>
  sxHeader?: SxProps<Theme>
}
