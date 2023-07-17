import {useSnackbar} from 'notistack'
import {useTranslation} from 'react-i18next'
import {useMutation} from 'react-query'
import {AxiosResponse} from 'axios'
import {postForgotPassword} from '../AuthAPI'
import {ForgotPassword} from '../AuthModel'

export default function usePostForgotPassword() {
  const {t} = useTranslation()
  const {enqueueSnackbar} = useSnackbar()

  return useMutation(({email}: {email: string}) => postForgotPassword(email), {
    onSuccess: (data: ForgotPassword) => {
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
  })
}
