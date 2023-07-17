import {Box, Link, Typography, useTheme} from '@mui/material'
import {useTranslation} from 'react-i18next'
import usePatchNotification from 'src/api/notifications/hooks/usePatchNotification'
import {useNotifications} from './NotificationsContext'

const NotificationsHeader = () => {
  const {t} = useTranslation()
  const theme = useTheme()
  const mutationPatch = usePatchNotification()
  const {notifications, handleReadAll} = useNotifications()

  return (
    <Box
      sx={{
        p: 2,
        background: theme.colors.alpha.black[5],
      }}
      display={{xs: 'block', sm: 'flex'}}
      justifyContent="space-between"
      alignItems="center">
      <Typography variant="h5">{t('Notifications')}</Typography>
      <Box display={{xs: 'block'}}>
        {notifications?.length > 0 ? (
          <Link
            display="flex"
            href="#"
            onClick={() => {
              notifications
                ?.filter(
                  (item) => item.recipient.notifications_users.read === 0,
                )
                .map((notification) => {
                  mutationPatch.mutate(
                    {
                      id: notification.recipient.notifications_users?.id,
                      read: 1,
                    },
                    {
                      onSuccess: () => {
                        handleReadAll()
                      },
                    },
                  )
                  return false
                })
            }}
            variant="caption">
            {t('Mark all as read')}
          </Link>
        ) : null}
      </Box>
    </Box>
  )
}

export default NotificationsHeader
