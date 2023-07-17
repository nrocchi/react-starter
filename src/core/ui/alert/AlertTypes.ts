import {ButtonProps, CardProps, SxProps, Theme} from '@mui/material'
import {ReactElement} from 'react'

export interface AlertCustomProps {
  close?: boolean
  color?: ButtonProps['color']
  icon?: ReactElement
  content?: ReactElement | string
  sx?: SxProps<Theme>
  title?: ReactElement | string
  variant?: CardProps['variant']
}
