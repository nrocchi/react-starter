import {AxiosResponse} from 'axios'
import {useSnackbar} from 'notistack'
import {useTranslation} from 'react-i18next'
import {useQuery} from 'react-query'
import {getNotifications} from '../NotificationsAPI'

export default function useGetNotifications(id: number) {
  const {t} = useTranslation()
  const {enqueueSnackbar} = useSnackbar()

  return useQuery(['notifications', id], () => getNotifications(id), {
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    keepPreviousData: true,
    enabled: !!id,
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
