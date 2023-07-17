import {useSnackbar} from 'notistack'
import {useTranslation} from 'react-i18next'
import {useMutation} from 'react-query'
import {AxiosResponse} from 'axios'
import usePostNotification from 'src/api/notifications/hooks/usePostNotification'
import {postCreatePassword} from '../AuthAPI'
import {CreatePassword} from '../AuthModel'

export default function usePostCreatePassword() {
  const {t} = useTranslation()
  const {enqueueSnackbar} = useSnackbar()
  const postNotification = usePostNotification()

  return useMutation(
    ({
      password,
      passwordConfirm,
      token,
    }: {
      password: string
      passwordConfirm: string
      token: string
    }) => postCreatePassword(password, passwordConfirm, token),
    {
      onSuccess: (data: CreatePassword) => {
        enqueueSnackbar(t(data.message), {
          variant: data.status,
        })

        postNotification.mutate({
          category: 'role',
          type: 'invite',
          target: data.user,
          sender: null,
          content: 'notification_role',
        })
      },
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
