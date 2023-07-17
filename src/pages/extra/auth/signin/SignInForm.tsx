import * as yup from 'yup'
import {MouseEventHandler, useState} from 'react'
import {
  Button,
  CircularProgress,
  Link,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {Trans, useTranslation} from 'react-i18next'
import {Link as RouterLink} from 'react-router-dom'
import {useForm, SubmitHandler} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useAuth} from 'src/core/auth/AuthContext'
import TextFieldCustom from 'src/core/ui/form/TextFieldCustom'
import CheckboxCustom from 'src/core/ui/form/CheckboxCustom'
import {SignInFormValues} from './SignInTypes'

const SignInForm = () => {
  const {signIn, user} = useAuth()
  const {t} = useTranslation()
  const [showPassword, setShowPassword] = useState<Boolean>(false)

  const validation = yup.object().shape({
    email: yup.string().email().max(255).required(),
    password: yup
      .string()
      .nullable()
      .transform((v, o) => (o === '' ? null : v))
      .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/, {
        name: 'password',
      })
      .required(),
    terms: yup.boolean().test('terms', (value) => value === true),
  })

  const {
    handleSubmit,
    control,
    resetField,
    formState: {isSubmitting, isValid, errors},
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: user?.email || '',
      password: '',
      terms: true,
    },
    resolver: yupResolver(validation),
    mode: 'all',
  })

  const onSubmit: SubmitHandler<SignInFormValues> = async (data, e) => {
    await signIn(data.email, data.password)
    resetField('password')
  }

  const handleClickShowPassword: MouseEventHandler<HTMLButtonElement> = () => {
    setShowPassword(!showPassword)
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

      <TextFieldCustom
        name="password"
        control={control}
        error={errors.password}
        label={`${t('Password')}`}
        required
        type={showPassword ? 'text' : 'password'}
        inputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box alignItems="center" display="flex" justifyContent="space-between">
        <CheckboxCustom
          name="terms"
          control={control}
          error={errors.terms}
          required
          noLegend
          label={
            <>
              <Typography variant="body2">
                <Trans i18nKey="terms">
                  I accept the
                  <Link component="a" href="#">
                    terms and conditions
                  </Link>
                </Trans>
              </Typography>
            </>
          }
        />
        <Link component={RouterLink} to="forgot-password">
          <b>{t('Lost password?')}</b>
        </Link>
      </Box>

      <Button
        sx={{
          mt: 3,
        }}
        color="primary"
        startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
        disabled={!isValid || isSubmitting}
        type="submit"
        fullWidth
        size="large"
        variant="contained">
        {t('Sign in')}
      </Button>
    </form>
  )
}

export default SignInForm
