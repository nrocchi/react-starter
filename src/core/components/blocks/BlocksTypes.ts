import {SxProps, Theme, TypographyProps} from '@mui/material'
import {ReactElement} from 'react'

export interface CardProps {
  circular?: boolean
  color?: string
  fullHeight?: boolean
  gradient: string
  icon: ReactElement
  loading?: boolean
  percent?: number
  title: string
  tooltip: string
  type: string
  value?: number
  variant?: TypographyProps['variant']
}

export interface ChartProps {
  chart: ReactElement
  loading?: boolean
  sx?: SxProps<Theme>
  title: string
  tooltip: string
}
