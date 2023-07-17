import {Box, Button, CircularProgress} from '@mui/material'
import {useTranslation} from 'react-i18next'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import ButtonLoadingIcon from 'src/core/ui/buttons/ButtonLoadingIcon'
import useDeleteNotification from 'src/api/notifications/hooks/useDeleteNotification'
import {useNotifications} from './NotificationsContext'

const NotificationsFooter = () => {
  const {t} = useTranslation()
  const {notifications, handleDeleteAll} = useNotifications()
  const mutationDelete = useDeleteNotification()

  return notifications.length > 0 ? (
    <Box m={1}>
      <Button
        color="secondary"
        startIcon={
          mutationDelete.isLoading ? (
            <CircularProgress color="secondary" size="1rem" thickness={5} />
          ) : null
        }
        disabled={mutationDelete.isLoading}
        onClick={() => {
          notifications?.map((notification) => {
            mutationDelete.mutate(
              notification.recipient.notifications_users.id,
              {
                onSuccess: () => {
                  handleDeleteAll()
                },
              },
            )
            return false
          })
        }}
        fullWidth>
        {t('Delete all')}
      </Button>
    </Box>
  ) : null
}

export default NotificationsFooter
