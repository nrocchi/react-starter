import {useSnackbar} from 'notistack'
import {useTranslation} from 'react-i18next'
import {useMutation, useQueryClient} from 'react-query'
import {AxiosResponse} from 'axios'
import {useAuth} from 'src/core/auth/AuthContext'
import usePostNotification from 'src/api/notifications/hooks/usePostNotification'
import {User} from '../UsersModel'
import {patchUserPassword} from '../UsersAPI'
import useGetUser from './useGetUser'

export default function usePatchUserPassword() {
  const {t} = useTranslation()
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()
  const {user: authUser, setUser} = useAuth()
  const {data: currentUser} = useGetUser(authUser?.id)
  const postNotification = usePostNotification()

  return useMutation(
    ({
      id,
      password,
      newPassword,
      passwordConfirm,
    }: {
      id: number
      password: string
      newPassword: string
      passwordConfirm: string
    }) => patchUserPassword(id, password, newPassword, passwordConfirm),
    {
      onSuccess: (data: User) => {
        queryClient.invalidateQueries('users')
        queryClient.invalidateQueries('user')
        enqueueSnackbar(t(data.message), {
          variant: data.status,
        })

        // Update currentUser in AuthContext
        if (currentUser.datas.id === data.datas.id) {
          setUser(data.datas)
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
