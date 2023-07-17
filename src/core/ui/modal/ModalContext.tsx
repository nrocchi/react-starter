import {createContext, useContext, useState} from 'react'
import PropTypes from 'prop-types'
import {
  ModalState,
  ModalContextValue,
  ModalProviderProps,
} from './ModalContextTypes'

const initialState: ModalState = {
  isOpen: false,
}

export const ModalContext = createContext<ModalContextValue>({
  ...initialState,
  handleOpen: () => {},
  handleClose: () => {},
})

export const useModal = () => useContext(ModalContext)

export const ModalProvider = ({children}: ModalProviderProps) => {
  const [isOpen, setOpen] = useState<boolean>(initialState.isOpen)

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const contextValues = {
    isOpen,
    handleOpen,
    handleClose,
  }

  return (
    <ModalContext.Provider value={contextValues}>
      {children}
    </ModalContext.Provider>
  )
}

ModalProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
