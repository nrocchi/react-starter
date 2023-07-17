import {Box, Container} from '@mui/material'
import {useTranslation} from 'react-i18next'
import HelmetCustom from 'src/core/ui/helmet/HelmetCustom'
import SignUpContent from './SignUpContent'

const SignUp = () => {
  const {t} = useTranslation()

  return (
    <>
      <HelmetCustom title={t('Sign Up')} />
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        justifyContent="center">
        <Container maxWidth="sm">
          <SignUpContent />
        </Container>
      </Box>
    </>
  )
}

export default SignUp
