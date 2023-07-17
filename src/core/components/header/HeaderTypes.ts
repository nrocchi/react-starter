import {ButtonProps, SxProps, Theme} from '@mui/material'
import {ReactElement} from 'react'

export interface HeaderProps {
  back?: boolean
  button?: ReactElement
  color?: ButtonProps['color']
  icon?: ReactElement
  subtitle?: ReactElement | string
  sx?: SxProps<Theme>
  title?: ReactElement | string
  to?: any
}
