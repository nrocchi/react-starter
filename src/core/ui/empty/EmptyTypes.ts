import {SxProps, Theme, TypographyProps} from '@mui/material'

export interface EmptyDataProps {
  type?: string
  sx?: SxProps<Theme>
  value?: string
  variant?: TypographyProps['variant']
}
