import {Breakpoint, ModalProps, SxProps, Theme} from '@mui/material'
import {ReactElement, ReactNode} from 'react'

export interface ModalCustomProps {
  actions?: ReactElement
  children: ReactNode
  disableAutoFocus?: boolean
  maxWidth?: Breakpoint | false
  onClose: ModalProps['onClose']
  open: ModalProps['open']
  scroll?: 'body' | 'paper'
  subtitle?: ReactElement | string
  sx?: SxProps<Theme>
  title?: ReactElement | string
}
