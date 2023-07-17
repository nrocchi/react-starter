import {useState} from 'react'
import PropTypes from 'prop-types'
import {Link as RouterLink} from 'react-router-dom'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import ButtonLoadingIcon from 'src/core/ui/buttons/ButtonLoadingIcon'
import {useTranslation} from 'react-i18next'
import useDeleteUser from 'src/api/users/hooks/useDeleteUser'
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Divider,
  Link,
  styled,
  Typography,
  useTheme,
} from '@mui/material'
import clsx from 'clsx'
import {useApp} from 'src/core/store/AppContext'
import ModalCustom from 'src/core/ui/modal/ModalCustom'
import useGetUser from 'src/api/users/hooks/useGetUser'
import {useAuth} from 'src/core/auth/AuthContext'
import {UsersItemProps} from '../../UsersTypes'
import UsersForm from '../../form/UsersForm'

const CardStyled = styled(Card)(({theme}) => ({
  position: 'relative',
  overflow: 'visible',
  height: '100%',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    borderRadius: 'inherit',
    zIndex: 1,
    transition: `${theme.transitions.create(['box-shadow'])}`,
  },
  '&.Mui-selected::after': {
    boxShadow: `0 0 0 2px ${theme.colors.primary.main}`,
  },
}))

const UsersCardItem = ({user}: UsersItemProps) => {
  const {t} = useTranslation()
  const theme = useTheme()
  const mutationDelete = useDeleteUser()
  const {users, handleSelectOne, getTag} = useApp()
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [userEdit, setUserEdit] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [userDelete, setUserDelete] = useState<boolean>(false)
  const {user: authUser} = useAuth()
  const {data: currentUser} = useGetUser(authUser?.id)

  return (
    <>
      <CardStyled
        className={clsx({
          'Mui-selected': !!users.selected.find((item) => item.id === user.id),
        })}>
        <Box
          sx={{
            position: 'relative',
            zIndex: '2',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Box
            px={2}
            py={2}
            bgcolor={theme.colors.alpha.black[5]}
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between">
            {getTag(user.role.name)}
            {getTag(user.status.name)}
          </Box>
          <Divider
            sx={{
              mb: 0,
            }}
          />
          <Box p={2} display="flex" flexDirection="row" flex={1}>
            <Avatar
              sx={{
                width: 50,
                height: 50,
                mr: 2,
              }}
              alt={`${user.firstname} ${user.lastname}`}
              src={
                user.avatar
                  ? user.avatar.startsWith('https://')
                    ? user.avatar
                    : `${process.env.REACT_APP_API_URL}${user.avatar}`
                  : user.firstname
              }
            />
            <Box>
              <Box display="flex" flexWrap="wrap">
                <Link variant="h5" component={RouterLink} sx={{mr: 1}} to="#">
                  {user.firstname}
                </Link>
                <Typography component="span" variant="body1" fontWeight="bold">
                  ({user.lastname})
                </Typography>
              </Box>
              <Box width={140}>
                <Typography variant="body1" noWrap>
                  {user.email}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box
            pl={2}
            py={1}
            pr={1}
            bgcolor={theme.colors.alpha.black[5]}
            display="flex"
            height={58}
            alignItems="center"
            justifyContent={
              (currentUser?.datas.role.code === 'ADMIN' &&
                user?.role.code === 'USER') ||
              (currentUser?.datas.role.code === 'SUPER_ADMIN' &&
                currentUser?.datas.id !== user?.id)
                ? 'space-between'
                : 'flex-end'
            }>
            {(currentUser?.datas.role.code === 'ADMIN' &&
              user?.role.code === 'USER') ||
            (currentUser?.datas.role.code === 'SUPER_ADMIN' &&
              currentUser?.datas.id !== user?.id) ? (
              <Checkbox
                checked={!!users.selected.find((item) => item.id === user.id)}
                onChange={(_) => handleSelectOne(_, user, 'users')}
                value={users.selected.find((item) => item.id === user.id)}
              />
            ) : null}
            <Box>
              {currentUser?.datas.id === user?.id ||
              (currentUser?.datas.role.code === 'ADMIN' &&
                user?.role.code === 'USER') ||
              currentUser?.datas.role.code === 'SUPER_ADMIN' ? (
                <ButtonLoadingIcon
                  icon={<EditTwoToneIcon />}
                  loading={false}
                  tooltip={t('Edit')}
                  onClick={() => {
                    setUserEdit(true)
                    setOpenEdit(true)
                  }}
                />
              ) : null}
              {(currentUser?.datas.role.code === 'ADMIN' &&
                user?.role.code === 'USER') ||
              (currentUser?.datas.role.code === 'SUPER_ADMIN' &&
                currentUser?.datas.id !== user?.id) ? (
                <ButtonLoadingIcon
                  color="error"
                  icon={<DeleteTwoToneIcon />}
                  loading={false}
                  onClick={() => {
                    setUserDelete(true)
                    setOpenDelete(true)
                  }}
                  tooltip={t('Delete')}
                />
              ) : null}
            </Box>
          </Box>
        </Box>
      </CardStyled>

      {userEdit ? (
        <ModalCustom
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          title={t('edit', {value: t('user')})}
          subtitle={t('You can use this dialog window to {{ value }}.', {
            value: t('text.lowercase', {value: t('edit', {value: t('user')})}),
          })}>
          <Box pb={{xs: 4, lg: 0}}>
            <UsersForm user={user} setOpen={setOpenEdit} />
          </Box>
        </ModalCustom>
      ) : null}

      {userDelete ? (
        <ModalCustom
          open={openDelete}
          maxWidth="sm"
          onClose={() => setOpenDelete(false)}
          sx={{textAlign: 'center'}}>
          <>
            <Typography variant="h4" textAlign="center" sx={{mb: 3}}>
              {t('Do you want to permanently delete this user?')}
            </Typography>
            <Button
              color="error"
              size="large"
              variant="contained"
              sx={{
                display: {xs: 'block', sm: 'inline-flex'},
                mx: {xs: 'auto', sm: 2},
                mb: {xs: 2, sm: 0},
              }}
              startIcon={
                mutationDelete.isLoading ? (
                  <CircularProgress size="1rem" sx={{color: 'white'}} />
                ) : null
              }
              onClick={() =>
                mutationDelete.mutate(user, {
                  onSettled: async () => {
                    setOpenDelete(false)
                  },
                })
              }>
              {t('Delete')}
            </Button>
            <Button
              color="secondary"
              size="large"
              variant="outlined"
              sx={{
                display: {xs: 'block', sm: 'inline-flex'},
                mx: {xs: 'auto', sm: 2},
                mb: {xs: 0, sm: 0},
              }}
              onClick={() => setOpenDelete(false)}>
              {t('Cancel')}
            </Button>
          </>
        </ModalCustom>
      ) : null}
    </>
  )
}

UsersCardItem.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UsersCardItem
