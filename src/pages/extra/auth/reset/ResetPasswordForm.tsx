import * as yup from 'yup'
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import {useForm, SubmitHandler} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import TextFieldCustom from 'src/core/ui/form/TextFieldCustom'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {MouseEventHandler, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useAuth} from 'src/core/auth/AuthContext'
import usePostResetPassword from 'src/core/auth/hooks/usePostResetPassword'
import {ResetPasswordFormValues} from './ResetPasswordTypes'

const ResetPasswordForm = () => {
  const {t} = useTranslation()
  const {token} = useParams()
  const navigate = useNavigate()
  const {signIn} = useAuth()
  const mutationPostResetPassword = usePostResetPassword()
  const [showPassword, setShowPassword] = useState<Boolean>(false)

  const validation = yup.object().shape({
    password: yup
      .string()
      .nullable()
      .transform((v, o) => (o === '' ? null : v))
      .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/, {
        name: 'password',
      })
      .required(),
    passwordConfirm: yup.string().when('password', {
      is: (val: string) => val && val.length > 0,
      then: yup
        .string()
        .oneOf([yup.ref('password')], t('Passwords must match.')),
    }),
  })

  const handleClickShowPassword: MouseEventHandler<HTMLButtonElement> = () => {
    setShowPassword(!showPassword)
  }

  const {
    handleSubmit,
    control,
    reset,
    formState: {isSubmitting, isValid, errors},
  } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(validation),
    mode: 'all',
  })

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (dataForm) => {
    mutationPostResetPassword.mutate(
      {
        password: dataForm.password,
        passwordConfirm: dataForm.passwordConfirm,
        token,
      },
      {
        onSuccess: async (data) => {
          await signIn(data.user.email, dataForm.password)
          navigate('/')
          reset()
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextFieldCustom
        name="password"
        control={control}
        error={errors.password}
        label={`${t('New password')}`}
        type={showPassword ? 'text' : 'password'}
        inputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
          autoComplete: 'new-password',
        }}
        sx={{mb: 3}}
      />

      <TextFieldCustom
        name="passwordConfirm"
        control={control}
        error={errors.passwordConfirm}
        errorCustom={true}
        label={`${t('Confirm password')}`}
        type={showPassword ? 'text' : 'password'}
        inputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
          autoComplete: 'new-password',
        }}
        sx={{mb: 3}}
      />

      <Button
        sx={{
          mt: 3,
        }}
        color="primary"
        startIcon={
          mutationPostResetPassword.isLoading ? (
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

export default ResetPasswordForm
