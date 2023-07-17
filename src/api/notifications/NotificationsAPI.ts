import axios from 'src/api/axiosAPI'
import {API_ROUTE_NOTIFICATIONS} from 'src/core/constants/Constants'
import wait from 'src/core/utils/wait'
import {Notification, NotificationArray} from './NotificationsModel'
import {UserData} from '../users/UsersModel'

export const getNotifications = async (
  id: number,
): Promise<NotificationArray> => {
  const {data} = await axios.get<NotificationArray>(
    `${API_ROUTE_NOTIFICATIONS}/user/${id}`,
  )
  return data
}

export const getNotification = async (id: number): Promise<Notification> => {
  const {data} = await axios.get<Notification>(
    `${API_ROUTE_NOTIFICATIONS}/${id}`,
    {
      data: id,
    },
  )
  return data
}

export const postNotification = async (
  category: string,
  type: string,
  target: UserData,
  sender: UserData,
  content: string,
): Promise<Notification> => {
  const {data} = await axios.post<Notification>(API_ROUTE_NOTIFICATIONS, {
    category,
    type,
    target,
    sender,
    content,
  })
  return data
}

export const patchNotification = async (
  id: number,
  read: number,
): Promise<Notification> => {
  const {data} = await axios.put<Notification>(
    `${API_ROUTE_NOTIFICATIONS}/${id}`,
    {
      read,
    },
  )
  return data
}

export const deleteNotification = async (id: number): Promise<Notification> => {
  const {data} = await axios.delete<Notification>(
    `${API_ROUTE_NOTIFICATIONS}/${id}`,
    {
      data: {
        id,
      },
    },
  )
  await wait(1000)
  return data
}
