import {ReactNode} from 'react'

export interface SidebarState {
  sidebarToggle: boolean
}

export interface SidebarContextValue extends SidebarState {
  toggleSidebar: () => void
  closeSidebar: () => void
}

export interface SidebarProviderProps {
  children: ReactNode
}
