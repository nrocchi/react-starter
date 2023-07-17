import {AxiosResponse} from 'axios'
import {useSnackbar} from 'notistack'
import {useTranslation} from 'react-i18next'
import {useQuery} from 'react-query'
import {getUserStatus} from '../UsersAPI'

export default function useGetUserStatus() {
  const {t} = useTranslation()
  const {enqueueSnackbar} = useSnackbar()

  return useQuery(['userStatus'], () => getUserStatus(), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
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
