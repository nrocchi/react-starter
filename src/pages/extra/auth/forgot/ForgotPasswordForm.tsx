import * as yup from 'yup'
import {Button, CircularProgress} from '@mui/material'
import {useTranslation} from 'react-i18next'
import {useForm, SubmitHandler} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import TextFieldCustom from 'src/core/ui/form/TextFieldCustom'
import usePostForgotPassword from 'src/core/auth/hooks/usePostForgotPassword'
import {ForgotPasswordFormValues} from './ForgotPasswordTypes'

const ForgotPasswordForm = () => {
  const {t} = useTranslation()
  const mutationPostForgotPassword = usePostForgotPassword()

  const validation = yup.object().shape({
    email: yup.string().email().max(255).required(),
  })

  const {
    handleSubmit,
    control,
    resetField,
    formState: {isSubmitting, isValid, errors},
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(validation),
    mode: 'all',
  })

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    mutationPostForgotPassword.mutate(
      {
        email: data.email,
      },
      {
        onSuccess: async () => {
          resetField('email')
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextFieldCustom
        name="email"
        control={control}
        error={errors.email}
        maxValidation={255}
        required
        autoFocus
        type="email"
        sx={{mb: 3}}
      />

      <Button
        sx={{
          mt: 3,
        }}
        color="primary"
        startIcon={
          mutationPostForgotPassword.isLoading ? (
            <CircularProgress size="1rem" sx={{color: 'white'}} />
          ) : null
        }
        disabled={!isValid || isSubmitting}
        type="submit"
        fullWidth
        size="large"
        variant="contained">
        {t('Send')}
      </Button>
    </form>
  )
}

export default ForgotPasswordForm
