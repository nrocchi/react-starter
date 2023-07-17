import {Container, Link, Typography} from '@mui/material'
import {Trans, useTranslation} from 'react-i18next'
import HelmetCustom from 'src/core/ui/helmet/HelmetCustom'
import InsertChartTwoToneIcon from '@mui/icons-material/InsertChartTwoTone'
import Header from 'src/core/components/header/Header'
import {useAuth} from 'src/core/auth/AuthContext'
import useGetUser from 'src/api/users/hooks/useGetUser'
import HeaderFilters from 'src/core/components/header/HeaderFilters'
import AlertCustom from 'src/core/ui/alert/AlertCustom'
import {APP_NAME} from 'src/core/constants/Constants'
import ExampleData from './ExampleData'

const Example = () => {
  const {t} = useTranslation()
  const {user: authUser} = useAuth()
  const {data: currentUser} = useGetUser(authUser?.id)

  return (
    <>
      <HelmetCustom title={t('Home')} />
      <Header
        title={t('Example')}
        subtitle={
          <>
            <Typography variant="subtitle2">
              <Trans i18nKey="example_subtitle">
                This is an example page using the user statistics API of my
                <Link
                  component="a"
                  href="https://github.com/nrocchi/expressjs-starter"
                  target="_blank">
                  expressjs-starter
                </Link>
                project.
              </Trans>
            </Typography>
          </>
        }
        icon={<InsertChartTwoToneIcon fontSize="large" />}
        button={<HeaderFilters />}
      />
      <Container maxWidth="xl">
        <ExampleData />
      </Container>
    </>
  )
}

export default Example
