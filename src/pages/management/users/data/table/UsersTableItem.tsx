import PropTypes from 'prop-types'
import {
  TableRow,
  TableCell,
  Checkbox,
  Box,
  Typography,
  Avatar,
  Link,
  Button,
  CircularProgress,
} from '@mui/material'
import {Link as RouterLink} from 'react-router-dom'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import ButtonLoadingIcon from 'src/core/ui/buttons/ButtonLoadingIcon'
import {useTranslation} from 'react-i18next'
import useDeleteUser from 'src/api/users/hooks/useDeleteUser'
import {useApp} from 'src/core/store/AppContext'
import {useState} from 'react'
import ModalCustom from 'src/core/ui/modal/ModalCustom'
import useGetUser from 'src/api/users/hooks/useGetUser'
import {useAuth} from 'src/core/auth/AuthContext'
import {UsersItemProps} from 'src/pages/management/users/UsersTypes'
import UsersForm from 'src/pages/management/users/form/UsersForm'

const UsersTableItem = ({user}: UsersItemProps) => {
  const {t} = useTranslation()
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
      <TableRow
        hover
        key={user.id}
        selected={!!users.selected.find((item) => item.id === user.id)}>
        <TableCell padding="checkbox">
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
        </TableCell>
        {users.columns.find((item) => item.code === 'lastname') ? (
          <TableCell>
            <Box display="flex" alignItems="center">
              <Avatar
                sx={{
                  mr: 1,
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
                <Link
                  variant="body1"
                  fontWeight="bold"
                  component={RouterLink}
                  to="#">
                  {user.firstname} {user.lastname}
                </Link>
              </Box>
            </Box>
          </TableCell>
        ) : null}
        {users.columns.find((item) => item.code === 'email') ? (
          <TableCell>
            <Typography variant="body1" noWrap>
              {user.email}
            </Typography>
          </TableCell>
        ) : null}
        {users.columns.find((item) => item.code === 'role') ? (
          <TableCell>{getTag(user.role.name)}</TableCell>
        ) : null}
        {users.columns.find((item) => item.code === 'status') ? (
          <TableCell>{getTag(user.status.name)}</TableCell>
        ) : null}
        <TableCell>
          <Box display="flex">
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
            ) : (
              <Box width={40} height={40}></Box>
            )}
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
            ) : (
              <Box width={30} height={40}></Box>
            )}
          </Box>
        </TableCell>
      </TableRow>

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

UsersTableItem.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UsersTableItem
