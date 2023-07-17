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
import {useForm, SubmitHandler} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useAuth} from 'src/core/auth/AuthContext'
import TextFieldCustom from 'src/core/ui/form/TextFieldCustom'
import CheckboxCustom from 'src/core/ui/form/CheckboxCustom'
import AvatarUploadCustom from 'src/core/ui/form/AvatarUploadCustom'
import {useNavigate} from 'react-router-dom'
import {SignUpFormValues} from './SignUpTypes'

const SignUpForm = () => {
  const {signUp, user} = useAuth()
  const navigate = useNavigate()
  const {t} = useTranslation()
  const [showPassword, setShowPassword] = useState<Boolean>(false)

  const validation = yup.object().shape({
    firstname: yup.string().min(2).max(255).required(),
    lastname: yup.string().min(2).max(255).required(),
    email: yup.string().email().max(255).required(),
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
    terms: yup.boolean().test('terms', (value) => value === true),
  })

  const {
    handleSubmit,
    control,
    resetField,
    setValue,
    watch,
    formState: {isSubmitting, isValid, errors},
  } = useForm<SignUpFormValues>({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      terms: true,
    },
    resolver: yupResolver(validation),
    mode: 'all',
  })

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data, e) => {
    const result = await signUp(
      data.firstname,
      data.lastname,
      data.email,
      data.password,
      data.passwordConfirm,
    )

    if (result) {
      navigate('/')
    } else {
      resetField('password')
      resetField('passwordConfirm')
    }
  }

  const handleClickShowPassword: MouseEventHandler<HTMLButtonElement> = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextFieldCustom
        autoFocus
        control={control}
        error={errors.firstname}
        label={t('Firstname')}
        minValidation={2}
        maxValidation={255}
        name="firstname"
        required
        sx={{mt: 3, mb: 3}}
      />
      <TextFieldCustom
        control={control}
        error={errors.lastname}
        label={t('Lastname')}
        minValidation={2}
        maxValidation={255}
        name="lastname"
        required
        sx={{mb: 3}}
      />
      <TextFieldCustom
        name="email"
        control={control}
        error={errors.email}
        maxValidation={255}
        required
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
          autoComplete: 'new-password',
        }}
        sx={{mb: 3}}
      />
      <TextFieldCustom
        name="passwordConfirm"
        control={control}
        error={errors.passwordConfirm}
        required
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
        {t('Sign up')}
      </Button>
    </form>
  )
}

export default SignUpForm
