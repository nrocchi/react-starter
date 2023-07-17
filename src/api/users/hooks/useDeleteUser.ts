import {useSnackbar} from 'notistack'
import {useTranslation} from 'react-i18next'
import {useMutation, useQueryClient} from 'react-query'
import {AxiosResponse} from 'axios'
import {UserData} from 'src/api/users/UsersModel'
import usePostNotification from 'src/api/notifications/hooks/usePostNotification'
import {useAuth} from 'src/core/auth/AuthContext'
import {User} from '../UsersModel'
import {deleteUser} from '../UsersAPI'
import useGetUser from './useGetUser'

export default function useDeleteUser() {
  const {t} = useTranslation()
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()
  const {user: authUser} = useAuth()
  const {data: currentUser} = useGetUser(authUser?.id)
  const postNotification = usePostNotification()

  return useMutation((user: UserData) => deleteUser(user), {
    onSuccess: (data: User, variables: UserData) => {
      queryClient.invalidateQueries('users')

      enqueueSnackbar(
        t('The user {{ value }} has been deleted!', {
          value: `${variables.firstname} ${variables.lastname}`,
        }),
        {
          variant: data.status,
        },
      )

      postNotification.mutate({
        category: 'role',
        type: 'delete_user',
        target: data.datas,
        sender: currentUser.datas,
        content: 'notification_role',
      })
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
