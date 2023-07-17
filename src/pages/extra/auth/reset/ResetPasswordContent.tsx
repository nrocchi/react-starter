import {Card, Box, Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'
import ButtonBack from 'src/core/ui/buttons/ButtonBack'
import Logo from 'src/core/ui/logo/Logo'
import ResetPasswordForm from './ResetPasswordForm'

const ResetPasswordContent = () => {
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
          {t('Reset a password')}
        </Typography>
        <Typography
          variant="h4"
          color="text.secondary"
          fontWeight="normal"
          textAlign="center"
          sx={{
            mb: 3,
          }}>
          {t('Fill in the fields below to reset your password.')}
        </Typography>
      </Box>
      <Box minHeight={82}>
        <ResetPasswordForm />
      </Box>
      <ButtonBack
        size="small"
        variant="outlined"
        color="primary"
        to="/"
        sx={{mt: 3}}
      />
    </Card>
  )
}

export default ResetPasswordContent
