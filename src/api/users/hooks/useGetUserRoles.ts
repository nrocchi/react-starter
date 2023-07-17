import {AxiosResponse} from 'axios'
import {useSnackbar} from 'notistack'
import {useTranslation} from 'react-i18next'
import {useQuery} from 'react-query'
import {getUserRoles} from '../UsersAPI'

export default function useGetUserRoles() {
  const {t} = useTranslation()
  const {enqueueSnackbar} = useSnackbar()

  return useQuery(['userRoles'], () => getUserRoles(), {
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
