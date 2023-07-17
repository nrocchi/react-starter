import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {
  Grid,
  Button,
  CircularProgress,
  useTheme,
  Skeleton,
  InputAdornment,
  IconButton,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {useState, MouseEventHandler} from 'react'
import {useTranslation} from 'react-i18next'
import {SubmitHandler, useForm} from 'react-hook-form'
import useGetUserRoles from 'src/api/users/hooks/useGetUserRoles'
import useGetUser from 'src/api/users/hooks/useGetUser'
import usePostUser from 'src/api/users/hooks/usePostUser'
import usePostInviteUser from 'src/api/users/hooks/usePostInviteUser'
import usePatchUser from 'src/api/users/hooks/usePatchUser'
import {useAuth} from 'src/core/auth/AuthContext'
import AvatarUploadCustom from 'src/core/ui/form/AvatarUploadCustom'
import TextFieldCustom from 'src/core/ui/form/TextFieldCustom'
import SelectCustom from 'src/core/ui/form/SelectCustom'
import SwitchCustom from 'src/core/ui/form/SwitchCustom'
import {FormValues} from './UsersFormTypes'

const UsersForm = ({user, setOpen, modal = null}) => {
  const {t} = useTranslation()
  const theme = useTheme()
  const {data: roles, isLoading, isFetched, isError} = useGetUserRoles()
  const mutationPost = usePostUser()
  const mutationInvitePost = usePostInviteUser()
  const mutationPatch = usePatchUser()
  const {user: authUser} = useAuth()
  const {data: currentUser} = useGetUser(authUser?.id)
  const [showPassword, setShowPassword] = useState<Boolean>(false)

  const validation = yup.object().shape({
    firstname: yup.string().min(2).max(255).required(),
    lastname: yup.string().min(2).max(255).required(),
    email: yup.string().email().max(255).required(),
    role: yup.string().required(),
  })

  const validationPassword = validation.shape({
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
    setValue,
    watch,
    formState: {isSubmitting, isValid, errors},
  } = useForm<FormValues>({
    defaultValues: {
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      avatar: user?.avatar
        ? user.avatar.startsWith('https://')
          ? user.avatar
          : `${process.env.REACT_APP_API_URL}${user?.avatar}`
        : null,
      role: JSON.stringify(user?.role) || '',
      active: user?.status.code === 'ACTIVE',
      files: user?.files || null,
      password: '',
      passwordConfirm: '',
    },
    resolver:
      !user && modal === 'create'
        ? yupResolver(validationPassword)
        : yupResolver(validation),
    mode: 'all',
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const base64 = data.avatar
      ? data.avatar.replace(/^data:([A-Za-z-+/]+);base64,/, '')
      : null

    const isBase64 = (value: string) =>
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(
        value,
      )

    if (modal === 'invite') {
      if (isBase64(base64)) {
        if (user) {
          mutationPatch.mutate(
            {
              id: user?.id,
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              avatar: data.avatar,
              role: JSON.parse(data.role),
              active: data.active,
            },
            {
              onSuccess: async () => {
                reset()
                setOpen(false)
              },
            },
          )
        } else {
          mutationInvitePost.mutate(
            {
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              role: data.role ? JSON.parse(data.role) : 0,
              avatar: data.avatar,
            },
            {
              onSuccess: async () => {
                reset()
                setOpen(false)
              },
            },
          )
        }
      } else if (user) {
        mutationPatch.mutate(
          {
            id: user?.id,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            role: JSON.parse(data.role),
            active: data.active,
          },
          {
            onSuccess: async () => {
              reset()
              setOpen(false)
            },
          },
        )
      } else {
        mutationInvitePost.mutate(
          {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            role: JSON.parse(data.role),
            avatar: data.avatar,
          },
          {
            onSuccess: async () => {
              reset()
              setOpen(false)
            },
          },
        )
      }
    } else if (isBase64(base64)) {
      if (user) {
        mutationPatch.mutate(
          {
            id: user?.id,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            avatar: data.avatar,
            role: JSON.parse(data.role),
            active: data.active,
          },
          {
            onSuccess: async () => {
              reset()
              setOpen(false)
            },
          },
        )
      } else {
        mutationPost.mutate(
          {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            passwordConfirm: data.passwordConfirm,
            role: data.role ? JSON.parse(data.role) : 0,
            avatar: data.avatar,
          },
          {
            onSuccess: async () => {
              reset()
              setOpen(false)
            },
          },
        )
      }
    } else if (user) {
      mutationPatch.mutate(
        {
          id: user?.id,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          role: JSON.parse(data.role),
          active: data.active,
        },
        {
          onSuccess: async () => {
            reset()
            setOpen(false)
          },
        },
      )
    } else {
      mutationPost.mutate(
        {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          password: data.password,
          passwordConfirm: data.passwordConfirm,
          role: JSON.parse(data.role),
          avatar: data.avatar,
        },
        {
          onSuccess: async () => {
            reset()
            setOpen(false)
          },
        },
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container>
        <Grid item xs={12} lg={6} p={3} py={0} order={{xs: 2, lg: 1}}>
          <Grid item xs={12} mb={3}>
            <TextFieldCustom
              autoFocus
              control={control}
              error={errors.firstname}
              label={t('Firstname')}
              minValidation={2}
              maxValidation={255}
              name="firstname"
              required
            />
          </Grid>
          <Grid item xs={12} mb={3}>
            <TextFieldCustom
              control={control}
              error={errors.lastname}
              label={t('Lastname')}
              minValidation={2}
              maxValidation={255}
              name="lastname"
              required
            />
          </Grid>
          <Grid item xs={12} mb={3}>
            <TextFieldCustom
              control={control}
              error={errors.email}
              disabled={!!user}
              label={t('Email')}
              minValidation={2}
              maxValidation={255}
              name="email"
              required
              type="email"
            />
          </Grid>
          <Grid item xs={12} mb={3}>
            {isLoading && !isFetched ? (
              <Skeleton
                variant="rectangular"
                sx={{
                  bgcolor: theme.colors.alpha.black[10],
                  width: '100%',
                  height: 53,
                  borderRadius: theme.general.borderRadiusMd,
                }}
              />
            ) : !isError ? (
              <SelectCustom
                name="role"
                control={control}
                error={errors.role}
                disabled={user && currentUser?.datas.id === user?.id}
                required
                options={roles?.datas}
                label={'Role'}
                sx={{mb: !user ? 3 : 0}}
              />
            ) : null}
            {!user && modal === 'create' ? (
              <>
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
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end">
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
                  // errorCustom={true}
                  required
                  label={`${t('Confirm password')}`}
                  type={showPassword ? 'text' : 'password'}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            ) : null}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          p={3}
          py={0}
          flexDirection="column"
          display={'flex'}
          justifyContent="space-between"
          order={{xs: 1, lg: 2}}>
          <Grid item xs={12} textAlign="center">
            <AvatarUploadCustom
              control={control}
              error={errors.avatar}
              name="avatar"
              setValue={setValue}
              watch={watch}
              user={user}
              noLabel
            />
          </Grid>
          {user && currentUser?.datas.id !== user?.id && (
            <Grid
              item
              xs={12}
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              alignItems="center"
              sx={{my: 3}}>
              <SwitchCustom
                name="active"
                control={control}
                error={errors.active}
                noLegend
                label="Activer"
              />
            </Grid>
          )}
        </Grid>
        {/* <Grid
          item
          xs={12}
          p={3}
          pt={0}
          flexDirection="column"
          display={'flex'}
          justifyContent="space-between"
          order={{xs: 3, lg: 2}}>
          <Grid item xs={12}>
            <FileUploadCustom
              control={control}
              error={errors.files as any}
              multiple={true}
              name="files"
              setValue={setValue}
              watch={watch}
              required
            />
          </Grid>
        </Grid> */}
        <Grid
          item
          xs={12}
          px={3}
          py={0}
          order={{xs: 3, lg: 3}}
          display="flex"
          flexWrap="wrap"
          flexDirection={{xs: 'column', sm: 'row'}}
          justifyContent={{xs: 'center', sm: 'flex-start'}}>
          <Button
            size="large"
            variant="contained"
            sx={{mr: {xs: 0, sm: 2}, mb: {xs: 3, sm: 0}}}
            startIcon={
              mutationPost.isLoading ||
              mutationInvitePost.isLoading ||
              mutationPatch.isLoading ? (
                <CircularProgress size="1rem" sx={{color: 'white'}} />
              ) : null
            }
            disabled={!isValid || isSubmitting}
            type="submit">
            {t('Save')}
          </Button>
          <Button
            color="secondary"
            size="large"
            variant="outlined"
            onClick={() => setOpen(false)}>
            {t('Cancel')}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default UsersForm
