import {useTranslation} from 'react-i18next'
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Typography,
  useTheme,
} from '@mui/material'
import {parseISO} from 'date-fns'
import ButtonLoadingIcon from 'src/core/ui/buttons/ButtonLoadingIcon'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import usePatchNotification from 'src/api/notifications/hooks/usePatchNotification'
import useDeleteNotification from 'src/api/notifications/hooks/useDeleteNotification'
import {APP_NAME, FAVICON_URL} from 'src/core/constants/Constants'
import {useApp} from 'src/core/store/AppContext'
import {useNotifications} from './NotificationsContext'

const NotificationsListItem = ({data}) => {
  const {t} = useTranslation()
  const theme = useTheme()
  const mutationPatch = usePatchNotification()
  const mutationDelete = useDeleteNotification()
  const {getTag} = useApp()
  const {handleRead, handleDelete, getContent} = useNotifications()

  return (
    <Box display="flex" alignItems="center">
      <ListItem
        button
        onClick={() => {
          mutationPatch.mutate(
            {
              id: data?.recipient?.notifications_users?.id,
              read: 1,
            },
            {
              onSuccess: () => {
                handleRead(data?.recipient?.notifications_users?.id)
              },
            },
          )
        }}
        selected={
          data.recipient.notifications_users
            ? !data.recipient.notifications_users.read
            : data.read === 0
        }>
        <ListItemAvatar
          sx={{
            mb: {xs: 1, sm: 0},
          }}>
          <Avatar
            alt={
              data.sender?.firstname
                ? `${data.sender?.firstname} ${data.sender?.lastname}`
                : APP_NAME
            }
            src={
              data.sender?.avatar
                ? data.sender?.avatar.startsWith('https://')
                  ? data.sender?.avatar
                  : `${process.env.REACT_APP_API_URL}${data.sender?.avatar}`
                : data.sender?.firstname
                ? data.sender?.firstname
                : data.sender?.lastname
                ? data.sender?.lastname
                : FAVICON_URL
            }
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box
              display={{xs: 'block', sm: 'flex'}}
              justifyContent="space-between"
              alignItems="center">
              <Box
                display={{xs: 'flex', sm: 'flex'}}
                flexWrap="wrap"
                alignItems="center">
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    marginRight: 1,
                  }}>
                  {data.sender?.firstname
                    ? `${data.sender?.firstname} ${data.sender?.lastname}`
                    : APP_NAME}
                </Typography>
                {data.sender.role.name
                  ? getTag(data.sender?.role.name, 'small')
                  : null}
              </Box>
              <Typography variant="caption" ml={1}>
                {t('dates.ago', {value: parseISO(data.created_at)})}
              </Typography>
            </Box>
          }
          secondary={getContent(data.type, data.content, data.target)}
        />
      </ListItem>
      <ButtonLoadingIcon
        color="error"
        icon={<DeleteTwoToneIcon />}
        loading={mutationDelete.isLoading}
        onClick={() => {
          mutationDelete.mutate(data?.recipient.notifications_users.id, {
            onSuccess: () => {
              handleDelete(data?.recipient?.notifications_users?.id)
            },
          })
        }}
      />
    </Box>
  )
}

export default NotificationsListItem
