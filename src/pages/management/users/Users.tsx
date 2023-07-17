import {Button, Container} from '@mui/material'
import {useTranslation} from 'react-i18next'
import HelmetCustom from 'src/core/ui/helmet/HelmetCustom'
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import {useEffect, useState} from 'react'
import ModalCustom from 'src/core/ui/modal/ModalCustom'
import {useApp} from 'src/core/store/AppContext'
import useGetUsers from 'src/api/users/hooks/useGetUsers'
import useGetUser from 'src/api/users/hooks/useGetUser'
import {useNavigate} from 'react-router'
import Header from 'src/core/components/header/Header'
import {useAuth} from 'src/core/auth/AuthContext'
import UsersForm from './form/UsersForm'
import UsersMenu from './menu/UsersMenu'
import UsersData from './data/UsersData'

const Users = () => {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)
  const [modal, setModal] = useState<string>('')
  const {users} = useApp()
  const {error, isError} = useGetUsers(
    users.page,
    users.limit,
    users.orderBy,
    users.order,
    users.filters,
    users.query,
  )
  const {user: authUser} = useAuth()
  const {data: currentUser} = useGetUser(authUser?.id)

  // HANDLE USER RIGHTS FOR THE ROUTER
  // Restricted route based on the current user role
  // When typing the url route directly in the browser
  // We redirect to the base url if the user is not Super Admin
  useEffect(() => {
    if (isError && error?.status === 403) {
      if (isError) {
        navigate('/')
      }
    }
  }, [error])

  return (
    <>
      <HelmetCustom title={t('Users')} />
      <Header
        title={t('Users')}
        subtitle={t('page_subtitle_list', {
          value: t('users'),
        })}
        icon={<ManageAccountsTwoToneIcon fontSize="large" />}
        button={
          <>
            {currentUser?.datas.role.code === 'SUPER_ADMIN' ? (
              <Button
                sx={{
                  mb: {xs: 2, sm: 0},
                  mr: 2,
                }}
                onClick={() => {
                  setOpen(true)
                  setModal('create')
                }}
                variant="contained"
                startIcon={<AddTwoToneIcon fontSize="small" />}>
                {t('create', {value: t('user')})}
              </Button>
            ) : null}
            {currentUser?.datas.role.code !== 'USER' ? (
              <Button
                sx={{
                  mb: {xs: 2, sm: 0},
                }}
                onClick={() => {
                  setOpen(true)
                  setModal('invite')
                }}
                variant="contained"
                startIcon={<AddTwoToneIcon fontSize="small" />}>
                {t('invite', {value: t('user')})}
              </Button>
            ) : null}
          </>
        }
      />
      <Container maxWidth="xl">
        <UsersMenu />
        <UsersData />
      </Container>

      <ModalCustom
        disableAutoFocus={true}
        open={open}
        onClose={() => setOpen(false)}
        title={t(modal, {value: t('user')})}
        subtitle={t('You can use this dialog window to {{ value }}.', {
          value: t('text.lowercase', {value: t(modal, {value: t('user')})}),
        })}>
        <UsersForm user={null} setOpen={setOpen} modal={modal} />
      </ModalCustom>
    </>
  )
}

export default Users
