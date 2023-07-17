import {Container} from '@mui/material'
import {useTranslation} from 'react-i18next'
import HelmetCustom from 'src/core/ui/helmet/HelmetCustom'
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone'
import Header from 'src/core/components/header/Header'
import {useAuth} from 'src/core/auth/AuthContext'
import useGetUser from 'src/api/users/hooks/useGetUser'
import HeaderFilters from 'src/core/components/header/HeaderFilters'
import AlertCustom from 'src/core/ui/alert/AlertCustom'
import {APP_NAME} from 'src/core/constants/Constants'

const Home = () => {
  const {t} = useTranslation()
  const {user: authUser} = useAuth()
  const {data: currentUser} = useGetUser(authUser?.id)

  return (
    <>
      <HelmetCustom title={t('Home')} />
      <Header
        title={
          currentUser?.datas.firstname
            ? t('Hello, {{ value }!', {value: currentUser?.datas.firstname})
            : t('Hello!')
        }
        subtitle={t('Build your dashboard.')}
        icon={<HomeTwoToneIcon fontSize="large" />}
        button={<HeaderFilters />}
      />
      <Container maxWidth="xl">
        <AlertCustom
          title={t('welcome', {value: APP_NAME})}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum"
        />
      </Container>
    </>
  )
}

export default Home
