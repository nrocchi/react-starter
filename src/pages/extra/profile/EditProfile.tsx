import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {
  Grid,
  Button,
  CircularProgress,
  Container,
  Card,
  CardContent,
  Skeleton,
  useTheme,
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import {SubmitHandler, useForm} from 'react-hook-form'
import TextFieldCustom from 'src/core/ui/form/TextFieldCustom'
import usePatchUser from 'src/api/users/hooks/usePatchUser'
import AvatarUploadCustom from 'src/core/ui/form/AvatarUploadCustom'
import {useAuth} from 'src/core/auth/AuthContext'
import useGetUser from 'src/api/users/hooks/useGetUser'
import {useEffect} from 'react'
import HelmetCustom from 'src/core/ui/helmet/HelmetCustom'
import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone'
import Header from 'src/core/components/header/Header'
import {FormValues} from 'src/pages/management/users/form/UsersFormTypes'
import SelectCustom from 'src/core/ui/form/SelectCustom'

const EditProfile = () => {
  const {t} = useTranslation()
  const theme = useTheme()
  const {user: authUser} = useAuth()
  const {
    data: currentUser,
    isLoading,
    isFetched,
    isError,
  } = useGetUser(authUser?.id)
  const mutationPatch = usePatchUser()

  const validation = yup.object().shape({
    firstname: yup.string().min(2).max(255).required(),
    lastname: yup.string().min(2).max(255).required(),
  })

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: {isSubmitting, isValid, errors},
  } = useForm<FormValues>({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      role: '',
      avatar: null,
    },
    resolver: yupResolver(validation),
    mode: 'onChange',
  })

  // Reset the inputs defaultValues when the currentUser is loaded
  useEffect(() => {
    reset({
      firstname: currentUser?.datas.firstname || '',
      lastname: currentUser?.datas.lastname || '',
      email: currentUser?.datas.email || '',
      role: JSON.stringify(currentUser?.datas.role) || '',
      avatar: currentUser?.datas.avatar
        ? currentUser?.datas.avatar.startsWith('https://')
          ? currentUser?.datas.avatar
          : `${process.env.REACT_APP_API_URL}${currentUser?.datas.avatar}`
        : null,
    })
    setValue('role', JSON.stringify(currentUser?.datas.role))
  }, [currentUser])

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const base64 = data.avatar
      ? data.avatar.replace(/^data:([A-Za-z-+/]+);base64,/, '')
      : null

    const isBase64 = (value: string) =>
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(
        value,
      )

    if (isBase64(base64)) {
      mutationPatch.mutate({
        id: currentUser?.datas.id,
        avatar: data.avatar,
        firstname: data.firstname,
        lastname: data.lastname,
        email: authUser?.email,
        role: currentUser?.datas.role,
        active: true,
      })
    } else {
      mutationPatch.mutate({
        id: currentUser?.datas.id,
        firstname: data.firstname,
        lastname: data.lastname,
        email: authUser?.email,
        role: currentUser?.datas.role,
        active: true,
      })
    }
  }

  return (
    <>
      <HelmetCustom title={t('Edit my profile')} />
      <Header
        title={t('Edit my profile')}
        subtitle={t('Fill in the fields below to edit your profile.')}
        icon={<FaceTwoToneIcon fontSize="large" />}
        back={true}
      />
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid container>
                <Grid item xs={12} lg={6} p={2} pb={0} order={{xs: 2, lg: 1}}>
                  <TextFieldCustom
                    autoFocus
                    control={control}
                    error={errors.firstname}
                    label={t('Firstname')}
                    minValidation={2}
                    maxValidation={255}
                    name="firstname"
                    required
                    sx={{mb: 3}}
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
                    control={control}
                    label={t('Email')}
                    disabled
                    name="email"
                    type="email"
                    sx={{mb: 3}}
                  />
                  {isLoading && !isFetched ? (
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
                  ) : !isError ? (
                    <SelectCustom
                      name="role"
                      control={control}
                      error={errors.role}
                      disabled
                      label="Role"
                      options={
                        currentUser?.datas.role ? [currentUser?.datas.role] : []
                      }
                      sx={{mb: 3}}
                    />
                  ) : null}
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={6}
                  p={2}
                  pb={0}
                  flexDirection="column"
                  display={'flex'}
                  justifyContent="space-between"
                  order={{xs: 1, lg: 2}}>
                  <AvatarUploadCustom
                    control={control}
                    error={errors.avatar}
                    name="avatar"
                    setValue={setValue}
                    watch={watch}
                    noLabel
                    user={currentUser?.datas}
                    sx={{textAlign: 'center'}}
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
      </Container>
    </>
  )
}

export default EditProfile
