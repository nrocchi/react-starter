import {createContext, useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useAuth} from 'src/core/auth/AuthContext'
import {socket} from 'src/core/socket/Socket'
import useGetNotifications from 'src/api/notifications/hooks/useGetNotifications'
import useCountReadNotifications from 'src/api/notifications/hooks/useCountReadNotifications'
import {NotificationData} from 'src/api/notifications/NotificationsModel'
import {Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'
import {UserData} from 'src/api/users/UsersModel'
import {
  NotificationsState,
  NotificationsContextValue,
  NotificationsProviderProps,
} from './NotificationsContextTypes'

const initialState: NotificationsState = {
  isConnected: false,
  socketId: null,
  notifications: [],
  count: 0,
}

export const NotificationsContext = createContext<NotificationsContextValue>({
  ...initialState,
  handleRead: () => {},
  handleReadAll: () => {},
  handleDelete: () => {},
  handleDeleteAll: () => {},
  getContent: () => <></>,
})

export const useNotifications = () => useContext(NotificationsContext)

export const NotificationsProvider = ({
  children,
}: NotificationsProviderProps) => {
  const {t} = useTranslation()
  const {user: authUser} = useAuth()
  const {data} = useGetNotifications(authUser?.id)
  const {data: countRead} = useCountReadNotifications(authUser?.id)
  const [isConnected, setIsConnected] = useState(initialState.isConnected)
  const [socketId, setSocketId] = useState(initialState.socketId)
  const [notifications, setNotifications] = useState(initialState.notifications)
  const [count, setCount] = useState(initialState.count)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
      setSocketId(socket.id)

      if (authUser) {
        socket.emit('connected', {
          user: authUser,
        })
      }
    }

    function onDisconnect() {
      setIsConnected(false)
      setSocketId(null)
    }

    function onNotificationsEvent(value) {
      setNotifications((previous) => [value, ...previous])
      setCount((previous) => previous + 1)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('notifications_roles', onNotificationsEvent)
    socket.on('notifications_user', onNotificationsEvent)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('notifications_roles', onNotificationsEvent)
      socket.off('notifications_user', onNotificationsEvent)
    }
  }, [authUser])

  useEffect(() => {
    if (data) {
      setNotifications(data.datas)
    }
  }, [data])

  useEffect(() => {
    if (!countRead || !!countRead) {
      setCount(countRead)
    }
  }, [countRead])

  const handleRead = (id: number) => {
    const updatedNotification = notifications.find(
      (notification: NotificationData) =>
        notification.recipient.notifications_users.id === id,
    )
    updatedNotification.recipient.notifications_users.read = 1
  }

  const handleReadAll = () => {
    notifications
      ?.filter(
        (item: NotificationData) =>
          item.recipient.notifications_users.read === 0,
      )
      .map((notification: NotificationData) => {
        notification.recipient.notifications_users.read = 1
        return false
      })
    setCount(0)
  }

  const handleDelete = (id: number) => {
    const filteredNotifications = notifications.filter(
      (notification: NotificationData) =>
        notification.recipient.notifications_users.notification_id !== id,
    )

    setNotifications(filteredNotifications)
  }

  const handleDeleteAll = () => {
    setNotifications([])
  }

  const getContent = (
    type: string,
    content: string,
    target: UserData,
  ): JSX.Element => {
    let map = {}
    const role = target.role.code === 'SUPER_ADMIN' ? 'superadmin' : 'user'

    switch (content) {
      case 'notification_role':
        map = {
          post_user: {
            value: t(`${role}_created`, {
              role: t('text.lowercase', {value: t(target.role.name)}),
              value: `${target.firstname} ${target.lastname}`,
            }),
          },
          post_user_invite: {
            value: t(`${role}_invited`, {
              role: t('text.lowercase', {value: t(target.role.name)}),
              value: `${target.firstname} ${target.lastname}`,
            }),
          },
          patch_user: {
            value: t(`${role}_edited`, {
              role: t('text.lowercase', {value: t(target.role.name)}),
              value: `${target.firstname} ${target.lastname}`,
            }),
          },
          delete_user: {
            value: t(`${role}_deleted`, {
              role: t('text.lowercase', {value: t(target.role.name)}),
              value: `${target.firstname} ${target.lastname}`,
            }),
          },
          enable_user: {
            value: t(`${role}_enabled`, {
              role: t('text.lowercase', {value: t(target.role.name)}),
              value: `${target.firstname} ${target.lastname}`,
            }),
          },
          disable_user: {
            value: t(`${role}_disabled`, {
              role: t('text.lowercase', {value: t(target.role.name)}),
              value: `${target.firstname} ${target.lastname}`,
            }),
          },
          signup: {
            value: t(`${role}_registered`, {
              role: t('text.lowercase', {value: t(target.role.name)}),
              value: `${target.firstname} ${target.lastname}`,
            }),
          },
          invite: {
            value: t(`${role}_invite_used`, {
              role: t('text.lowercase', {value: t(target.role.name)}),
              value: `${target.firstname} ${target.lastname}`,
            }),
          },
        }
        break
      case 'notification_user':
        map = {
          patch_user: {
            value: t('Your profile has been edited!'),
          },
        }
        break
      default:
        break
    }

    const {value}: any = map[type]

    return (
      <Typography color="secondary" dangerouslySetInnerHTML={{__html: value}} />
    )
  }

  const contextValues = {
    isConnected,
    socketId,
    notifications,
    count,
    handleRead,
    handleReadAll,
    handleDelete,
    handleDeleteAll,
    getContent,
  }

  return (
    <NotificationsContext.Provider value={contextValues}>
      {children}
    </NotificationsContext.Provider>
  )
}

NotificationsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
