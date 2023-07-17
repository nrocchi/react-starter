import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {
  Box,
  Grid,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Container,
  Card,
  CardContent,
  Skeleton,
  useTheme,
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import {SubmitHandler, useForm} from 'react-hook-form'
import TextFieldCustom from 'src/core/ui/form/TextFieldCustom'
import {useAuth} from 'src/core/auth/AuthContext'
import useGetUser from 'src/api/users/hooks/useGetUser'
import {MouseEventHandler, useState} from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import HelmetCustom from 'src/core/ui/helmet/HelmetCustom'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import Header from 'src/core/components/header/Header'
import usePatchUserPassword from 'src/api/users/hooks/usePatchUserPassword'

const EditPassword = () => {
  const {t} = useTranslation()
  const theme = useTheme()
  const {user: authUser} = useAuth()
  const {data: currentUser, isLoading} = useGetUser(authUser?.id)
  const [showPassword, setShowPassword] = useState<Boolean>(false)
  const mutationPatch = usePatchUserPassword()

  const validation = yup.object().shape({
    password: yup
      .string()
      .nullable()
      .transform((v, o) => (o === '' ? null : v))
      .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/, {
        name: 'password',
      })
      .required(),
    newPassword: yup
      .string()
      .nullable()
      .transform((v, o) => (o === '' ? null : v))
      .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/, {
        name: 'password',
      })
      .required(),
    passwordConfirm: yup.string().when('newPassword', {
      is: (val: string) => val && val.length > 0,
      then: yup
        .string()
        .oneOf([yup.ref('newPassword')], t('Passwords must match.')),
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
  } = useForm<{
    password: string
    newPassword: string
    passwordConfirm: string
  }>({
    defaultValues: {
      password: '',
      newPassword: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(validation),
    mode: 'all',
  })

  const onSubmit: SubmitHandler<{
    password: string
    newPassword: string
    passwordConfirm: string
  }> = (data) => {
    mutationPatch.mutate(
      {
        id: currentUser?.datas?.id,
        password: data.password,
        newPassword: data.newPassword,
        passwordConfirm: data.passwordConfirm,
      },
      {
        onSuccess: () => {
          reset()
        },
      },
    )
  }

  return (
    <>
      <HelmetCustom title={t('Edit my password')} />
      <Header
        title={t('Edit my password')}
        subtitle={t('Fill in the fields below to edit your password.')}
        icon={<VpnKeyIcon fontSize="large" />}
        back={true}
      />
      <Container maxWidth="sm">
        {!authUser || isLoading ? (
          <Box px={4} pt={3} pb={4}>
            <Skeleton
              variant="rectangular"
              sx={{
                bgcolor: theme.colors.alpha.black[10],
                width: '100%',
                height: 53,
                borderRadius: theme.general.borderRadiusMd,
                marginBottom: 3,
              }}
            />
            <Skeleton
              variant="rectangular"
              sx={{
                bgcolor: theme.colors.alpha.black[10],
                width: '100%',
                height: 53,
                borderRadius: theme.general.borderRadiusMd,
                marginBottom: 3,
              }}
            />
            <Skeleton
              variant="rectangular"
              sx={{
                bgcolor: theme.colors.alpha.black[10],
                width: '100%',
                height: 53,
                borderRadius: theme.general.borderRadiusMd,
                marginBottom: 3,
              }}
            />
            <Box display="flex">
              <Skeleton
                variant="rectangular"
                sx={{
                  bgcolor: theme.colors.alpha.black[10],
                  width: 125,
                  height: 48,
                  borderRadius: theme.general.borderRadiusMd,
                }}
              />
            </Box>
          </Box>
        ) : (
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    p={2}
                    py={0}
                    flexDirection="column"
                    display={'flex'}
                    justifyContent="space-between">
                    <TextFieldCustom
                      name="password"
                      control={control}
                      error={errors.password}
                      label={`${t('Your password')}`}
                      type={showPassword ? 'text' : 'password'}
                      inputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end">
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                        autoComplete: 'new-password',
                      }}
                      sx={{mb: 3, mt: 1}}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    p={2}
                    py={0}
                    flexDirection="column"
                    display={'flex'}
                    justifyContent="space-between">
                    <TextFieldCustom
                      name="newPassword"
                      control={control}
                      error={errors.newPassword}
                      label={`${t('New password')}`}
                      type={showPassword ? 'text' : 'password'}
                      inputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end">
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                        autoComplete: 'new-password',
                      }}
                      sx={{mb: 3}}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    p={2}
                    py={0}
                    flexDirection="column"
                    display={'flex'}
                    justifyContent="space-between">
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
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end">
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{mb: 3}}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    p={2}
                    py={0}
                    order={{xs: 3, lg: 3}}
                    display="flex"
                    flexWrap="wrap"
                    flexDirection={{xs: 'column', sm: 'row'}}
                    justifyContent={{xs: 'center', sm: 'flex-start'}}>
                    <Button
                      size="large"
                      variant="contained"
                      startIcon={
                        mutationPatch.isLoading ? (
                          <CircularProgress size="1rem" sx={{color: 'white'}} />
                        ) : null
                      }
                      disabled={!isValid || isSubmitting}
                      type="submit">
                      {t('Save')}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  )
}

export default EditPassword
