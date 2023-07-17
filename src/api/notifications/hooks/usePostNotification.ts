import {useSnackbar} from 'notistack'
import {useTranslation} from 'react-i18next'
import {useMutation} from 'react-query'
import {AxiosResponse} from 'axios'
import {socket} from 'src/core/socket/Socket'
import {UserData} from 'src/api/users/UsersModel'
import {postNotification} from '../NotificationsAPI'
import {Notification} from '../NotificationsModel'

export default function usePostNotification() {
  const {t} = useTranslation()
  const {enqueueSnackbar} = useSnackbar()

  return useMutation(
    ({
      category,
      type,
      target,
      sender,
      content,
    }: {
      category: string
      type: string
      target: UserData
      sender: UserData
      content: string
    }) => postNotification(category, type, target, sender, content),
    {
      onSuccess: (
        data: Notification,
        variables: {
          category: string
          type: string
          target: UserData
          sender: UserData
          content: string
        },
      ) => {
        if (variables.category === 'role') {
          socket.emit('notifications_roles', {
            ...data.datas,
          })
        }

        if (variables.category === 'user') {
          socket.emit('notifications_user', {
            ...data.datas,
          })
        }
      },
      onError: (error: AxiosResponse) => {
        if (error.data) {
          if (Array.isArray(error.data.message)) {
            error.data.message.map((item: string) =>
              enqueueSnackbar(t(item), {
                variant: error.data?.status,
              }),
            )
          } else {
            enqueueSnackbar(t(error.data?.message), {
              variant: error.data?.status,
            })
          }
        } else {
          enqueueSnackbar(t('A server error is occured.'), {
            variant: 'error',
          })
        }
      },
    },
  )
}
