import {ButtonProps, SxProps, Theme} from '@mui/material'
import {MouseEventHandler, ReactElement} from 'react'

export interface ButtonBackProps {
  color?: ButtonProps['color']
  size?: ButtonProps['size']
  page?: string
  to?: any
  variant?: ButtonProps['variant']
  sx?: SxProps<Theme>
}

export interface ButtonLoadingIconProps {
  color?: ButtonProps['color']
  edge?: string
  icon: ReactElement
  loading: boolean
  padding?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  size?: ButtonProps['size']
  sx?: SxProps<Theme>
  tooltip?: string
}

export interface ButtonSelectProps {
  all?: boolean
  allValue?: string
  color?: ButtonProps['color']
  datas?: Array<ButtonSelectOption>
  defaultValue?: ButtonSelectOption
  handleSelect?: Function
  size?: ButtonProps['size']
  sx?: SxProps<Theme>
  variant?: ButtonProps['variant']
}

export interface ButtonSelectMultipleProps {
  all?: boolean
  allValue?: string
  color?: ButtonProps['color']
  datas: Array<ButtonSelectOption>
  defaultValue?: Array<ButtonSelectOption>
  handleSelect?: Function
  size?: ButtonProps['size']
  sx?: SxProps<Theme>
  variant?: ButtonProps['variant']
}
export interface ButtonSelectOption {
  id?: number
  code?: string
  name?: string
  value?: string
}
