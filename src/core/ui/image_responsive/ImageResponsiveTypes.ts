import {SxProps, Theme} from '@mui/material'
import {ReactEventHandler} from 'react'

export interface ImageResponsiveProps {
  alt?: string
  maxWidth?: number | string
  onLoad?: ReactEventHandler
  src: string
  sx?: SxProps<Theme>
}
