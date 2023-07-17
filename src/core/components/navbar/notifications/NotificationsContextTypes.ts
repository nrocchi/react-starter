import {ReactNode} from 'react'
import {NotificationData} from 'src/api/notifications/NotificationsModel'
import {UserData} from 'src/api/users/UsersModel'

export interface NotificationsState {
  isConnected: boolean
  socketId: string | null
  notifications: Array<NotificationData>
  count: number
}

export interface NotificationsContextValue extends NotificationsState {
  handleRead: (id: number) => void
  handleReadAll: () => void
  handleDelete: (id: number) => void
  handleDeleteAll: () => void
  getContent: (type: string, content: string, target: UserData) => JSX.Element
}

export interface NotificationsProviderProps {
  children: ReactNode
}
