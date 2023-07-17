import {AxiosResponse} from 'axios'
import {useSnackbar} from 'notistack'
import {useTranslation} from 'react-i18next'
import {useQuery} from 'react-query'
import {useDebounce} from 'src/core/hooks/useDebounce'
import {UserData} from 'src/api/users/UsersModel'
import {getUsers} from '../UsersAPI'
import {User} from '../UsersModel'

export default function useGetUsers(
  page: number,
  limit: number,
  orderBy: keyof UserData,
  order: 'asc' | 'desc',
  filters: Record<keyof UserData, string | null>,
  query: string,
) {
  const {t} = useTranslation()
  const {enqueueSnackbar} = useSnackbar()
  const debouncedQuery = useDebounce(query, 500)

  return useQuery(
    ['users', page, limit, orderBy, order, filters, debouncedQuery],
    () => getUsers(page, limit, orderBy, order, filters, debouncedQuery),
    {
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // keepPreviousData: true,
      enabled: debouncedQuery ? Boolean(debouncedQuery) : !debouncedQuery,
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
    },
  )
}
