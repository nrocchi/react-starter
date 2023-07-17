import {useSnackbar} from 'notistack'
import {useTranslation} from 'react-i18next'
import {useMutation} from 'react-query'
import {AxiosResponse} from 'axios'
import {postResetPassword} from '../AuthAPI'
import {ResetPassword} from '../AuthModel'

export default function usePostResetPassword() {
  const {t} = useTranslation()
  const {enqueueSnackbar} = useSnackbar()

  return useMutation(
    ({
      password,
      passwordConfirm,
      token,
    }: {
      password: string
      passwordConfirm: string
      token: string
    }) => postResetPassword(password, passwordConfirm, token),
    {
      onSuccess: (data: ResetPassword) => {
        enqueueSnackbar(t(data.message), {
          variant: data.status,
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
