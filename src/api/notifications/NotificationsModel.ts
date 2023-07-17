import {VariantType} from 'notistack'
import {UserData} from '../users/UsersModel'

export interface Notification {
  id?: number
  status: VariantType
  message: string
  datas: NotificationData
  pagination?: Pagination
  total?: number
}

export interface NotificationArray {
  status: string
  message: string
  datas: Array<NotificationData>
  pagination?: Pagination
  total?: number
}

export interface NotificationData {
  id: number
  type: string
  content: string
  recipient: UserData & UserNotifications
  sender: UserData
  target: UserData
  created_at: string
  updated_at: string
}

export interface UserNotifications {
  id: number
  read: number
  notification_id: number
  user_id: number
  created_at: string
  updated_at: string
}

export interface Pagination {
  current: number
  total: number
}
