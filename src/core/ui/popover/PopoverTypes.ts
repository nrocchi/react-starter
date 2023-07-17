import {ModalProps, PopoverOrigin} from '@mui/material'
import {ReactNode} from 'react'

export interface PopoverCustomProps {
  anchorEl?: null | Element | ((element: Element) => Element)
  anchorOrigin?: PopoverOrigin
  children: ReactNode
  onClose: ModalProps['onClose']
  open: ModalProps['open']
  transformOrigin?: PopoverOrigin
}
