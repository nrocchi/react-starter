import {useSnackbar} from 'notistack'
import {useTranslation} from 'react-i18next'
import {useMutation, useQueryClient} from 'react-query'
import {AxiosResponse} from 'axios'
import {FileCustom} from 'src/core/ui/form/FormTypes'
import usePostNotification from 'src/api/notifications/hooks/usePostNotification'
import {useAuth} from 'src/core/auth/AuthContext'
import {postInviteUser} from '../UsersAPI'
import {User, UserRoleData} from '../UsersModel'
import useGetUser from './useGetUser'

export default function usePostInviteUser() {
  const {t} = useTranslation()
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()
  const {user: authUser} = useAuth()
  const {data: currentUser} = useGetUser(authUser?.id)
  const postNotification = usePostNotification()

  return useMutation(
    ({
      firstname,
      lastname,
      email,
      role,
      avatar,
      companyId,
      files,
    }: {
      firstname: string
      lastname: string
      email: string
      role: UserRoleData
      avatar?: string
      companyId?: number
      files?: Array<FileCustom>
    }) =>
      postInviteUser(
        firstname,
        lastname,
        email,
        role,
        avatar,
        companyId,
        files,
      ),
    {
      onSuccess: (data: User) => {
        queryClient.invalidateQueries('users')

        enqueueSnackbar(
          t('The user {{ value }} has been invited!', {
            value: `${data.datas.firstname} ${data.datas.lastname}`,
          }),
          {
            variant: data.status,
          },
        )

        postNotification.mutate({
          category: 'role',
          type: 'post_user_invite',
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
    },
  )
}
