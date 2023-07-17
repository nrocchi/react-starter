import {SxProps, Theme, TypographyProps} from '@mui/material'

export interface CircularProgressCustomProps {
  color?: string
  data?: number
  size?: number
  sx?: SxProps<Theme>
  thickness?: number
  variant?: TypographyProps['variant']
}

export interface LinearProgressCustomProps {
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'inherit'
  barColor?: string
  gradient?: string
  sx?: SxProps<Theme>
  tooltip?: string
  total: number
  value: number
}

export interface LinearProgressStyledProps {
  barColor?: string
  gradient?: string
}
