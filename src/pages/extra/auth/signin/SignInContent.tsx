import {Card, Box, Typography, Link, Alert, Tooltip} from '@mui/material'
import {useTranslation} from 'react-i18next'
import Logo from 'src/core/ui/logo/Logo'
import {Link as RouterLink} from 'react-router-dom'
import SignInForm from './SignInForm'

const SignInContent = () => {
  const {t} = useTranslation()

  return (
    <Card
      sx={{
        px: {xs: 2, sm: 4},
        pt: 2,
        pb: 3,
      }}>
      <Box>
        <Box textAlign="center" mb={{xs: 1, sm: 3}} mt={1}>
          <Logo width={{xs: 200, sm: 250}} height={50} />
        </Box>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{
            mb: 1,
          }}>
          {t('Welcome')}
        </Typography>
        <Typography
          variant="h4"
          color="text.secondary"
          fontWeight="normal"
          textAlign="center"
          sx={{
            mb: 3,
          }}>
          {t('Fill in the fields below to sign into your account.')}
        </Typography>
      </Box>
      <SignInForm />
      <Box my={4} textAlign="center">
        <Typography component="span" variant="h5" color="text.primary">
          {t("Don't have an account, yet?")}
        </Typography>{' '}
        <Link component={RouterLink} to="signup">
          <b>{t('Sign up here')}</b>
        </Link>
      </Box>
    </Card>
  )
}

export default SignInContent
