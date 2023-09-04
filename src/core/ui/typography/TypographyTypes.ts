import {ElementType} from 'react'
import {BoxProps, SxProps, Theme, TypographyProps} from '@mui/material'

export interface TypographyCustomProps {
  color?: string
  component?: ElementType
  fontWeight?: TypographyProps['fontWeight']
  formatCurrency?: string
  formatDate?: string
  noWrap?: TypographyProps['noWrap']
  sx?: SxProps<Theme>
  type?: 'date' | 'currency' | 'number' | 'percent' | null
  value?: number | string | null
  variant?: TypographyProps['variant']
  width?: BoxProps['width']
}
