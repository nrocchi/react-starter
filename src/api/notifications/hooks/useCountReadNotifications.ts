import {AxiosResponse} from 'axios'
import {useSnackbar} from 'notistack'
import {useTranslation} from 'react-i18next'
import {useQuery} from 'react-query'
import {getNotifications} from '../NotificationsAPI'
import {NotificationArray} from '../NotificationsModel'

export default function useCountNotifications(id: number) {
  const {t} = useTranslation()
  const {enqueueSnackbar} = useSnackbar()

  return useQuery(['notifications', id], () => getNotifications(id), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!id,
    select: (data: NotificationArray) =>
      data.datas.filter((item) => item.recipient.notifications_users.read === 0)
        .length,
    notifyOnChangeProps: 'tracked',
    onError: (error: AxiosResponse) => {
      if (error.data) {
        enqueueSnackbar(t(error.data?.message), {
          variant: error.data?.status,
        })
      } else {
        enqueueSnackbar(t('A server error is occured.'), {
          variant: 'error',
        })
      }
    },
  })
}
