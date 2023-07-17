import {useTranslation} from 'react-i18next'
import {List, Typography, Divider} from '@mui/material'
import {Fragment} from 'react'
import NotificationsListItem from './NotificationsListItem'
import {useNotifications} from './NotificationsContext'

const NotificationsList = () => {
  const {t} = useTranslation()
  const {notifications} = useNotifications()

  return (
    <List
      sx={{
        pt: 2,
        px: 2,
      }}>
      <>
        {notifications?.map((notification, index) => (
          <Fragment key={notification?.id}>
            <NotificationsListItem data={notification} />
            {index !== notifications.length - 1 ? (
              <Divider
                sx={{
                  my: 1,
                }}
                component="li"
              />
            ) : null}
          </Fragment>
        ))}
        {!notifications.length && (
          <Typography variant="subtitle2" textAlign="center" p={2}>
            {t('You have no notification.')}
          </Typography>
        )}
      </>
    </List>
  )
}

export default NotificationsList
