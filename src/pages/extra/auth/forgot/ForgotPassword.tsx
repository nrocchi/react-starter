import {Box, Container} from '@mui/material'
import {useTranslation} from 'react-i18next'
import HelmetCustom from 'src/core/ui/helmet/HelmetCustom'
import ForgotPasswordContent from './ForgotPasswordContent'

const ForgotPassword = () => {
  const {t} = useTranslation()

  return (
    <>
      <HelmetCustom title={t('Forgot Password')} />
      <Container maxWidth="sm" sx={{height: '100%'}}>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center">
          <ForgotPasswordContent />
        </Box>
      </Container>
    </>
  )
}

export default ForgotPassword
