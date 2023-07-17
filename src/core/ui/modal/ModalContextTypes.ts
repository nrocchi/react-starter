import {ReactNode} from 'react'

export interface ModalState {
  isOpen: boolean
}

export interface ModalContextValue extends ModalState {
  handleOpen: () => void
  handleClose: () => void
}

export interface ModalProviderProps {
  children: ReactNode
}
