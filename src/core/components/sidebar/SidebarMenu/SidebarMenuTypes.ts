import {ReactNode} from 'react'

export interface MenuItem {
  name: string
  icon?: any
  badge?: string
  badgeTooltip?: string
  items?: MenuItem[]
}

export interface MenuItems {
  heading?: string
  items: MenuItem[]
}

export interface SidebarMenuItemProps {
  children?: ReactNode
  link?: string
  icon?: any
  badge?: string
  badgeTooltip?: string
  open?: boolean
  active?: boolean
  name: string
  state: string
}
