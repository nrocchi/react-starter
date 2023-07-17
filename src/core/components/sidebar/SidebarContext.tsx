import {createContext, useContext, useState} from 'react'
import PropTypes from 'prop-types'
import {
  SidebarState,
  SidebarContextValue,
  SidebarProviderProps,
} from './SidebarContextTypes'

const initialState: SidebarState = {
  sidebarToggle: false,
}

export const SidebarContext = createContext<SidebarContextValue>({
  ...initialState,
  toggleSidebar: () => {},
  closeSidebar: () => {},
})

export const useSidebar = () => useContext(SidebarContext)

export const SidebarProvider = ({children}: SidebarProviderProps) => {
  const [sidebarToggle, setSidebarToggle] = useState(initialState.sidebarToggle)

  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle)
  }
  const closeSidebar = () => {
    setSidebarToggle(false)
  }

  const contextValues = {
    sidebarToggle,
    toggleSidebar,
    closeSidebar,
  }

  return (
    <SidebarContext.Provider value={contextValues}>
      {children}
    </SidebarContext.Provider>
  )
}

SidebarProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
