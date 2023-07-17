import {Card, Box, Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'
import Logo from 'src/core/ui/logo/Logo'
import ButtonBack from 'src/core/ui/buttons/ButtonBack'
import ForgotPasswordForm from './ForgotPasswordForm'

const ForgotPasswordContent = () => {
  const {t} = useTranslation()

  return (
    <Card
      sx={{
        px: {xs: 2, sm: 4},
        pt: 2,
        pb: 3,
      }}>
      <Box>
        <Box textAlign="center" mb={3} mt={1}>
          <Logo width={250} height={50} />
        </Box>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{
            mb: 1,
          }}>
          {t('Lost password?')}
        </Typography>

        <Typography
          variant="h4"
          color="text.secondary"
          fontWeight="normal"
          textAlign="center"
          sx={{
            mb: 3,
          }}>
          {t('Fill in the field below to recover your password.')}
        </Typography>
      </Box>
      <ForgotPasswordForm />
      <ButtonBack
        size="small"
        variant="outlined"
        color="primary"
        sx={{mt: 3}}
      />
    </Card>
  )
}

export default ForgotPasswordContent
