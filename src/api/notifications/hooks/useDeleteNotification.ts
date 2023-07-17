import {useSnackbar} from 'notistack'
import {useTranslation} from 'react-i18next'
import {useMutation, useQueryClient} from 'react-query'
import {AxiosResponse} from 'axios'
import {Notification, NotificationData} from '../NotificationsModel'
import {deleteNotification} from '../NotificationsAPI'

export default function useDeleteNotification() {
  const queryClient = useQueryClient()
  const {t} = useTranslation()
  const {enqueueSnackbar} = useSnackbar()

  return useMutation((id: number) => deleteNotification(id), {
    onSuccess: (data: Notification) => {
      queryClient.invalidateQueries('notifications')
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
  })
}
