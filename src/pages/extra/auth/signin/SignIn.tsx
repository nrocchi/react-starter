import {Box, Container} from '@mui/material'
import {useTranslation} from 'react-i18next'
import HelmetCustom from 'src/core/ui/helmet/HelmetCustom'
import SignInContent from './SignInContent'

const SignIn = () => {
  const {t} = useTranslation()

  return (
    <>
      <HelmetCustom title={t('Sign In')} />
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        justifyContent="center">
        <Container maxWidth="sm">
          <SignInContent />
        </Container>
      </Box>
    </>
  )
}

export default SignIn
