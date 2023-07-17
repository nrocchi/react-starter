import {Box, Container} from '@mui/material'
import {useTranslation} from 'react-i18next'
import HelmetCustom from 'src/core/ui/helmet/HelmetCustom'
import ResetPasswordContent from './ResetPasswordContent'

const ResetPassword = () => {
  const {t} = useTranslation()

  return (
    <>
      <HelmetCustom title={t('Reset a password')} />
      <Container maxWidth="sm" sx={{height: '100%'}}>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center">
          <ResetPasswordContent />
        </Box>
      </Container>
    </>
  )
}

export default ResetPassword
