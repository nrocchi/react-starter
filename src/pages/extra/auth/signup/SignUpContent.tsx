import {Card, Box, Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'
import Logo from 'src/core/ui/logo/Logo'
import ButtonBack from 'src/core/ui/buttons/ButtonBack'
import SignUpForm from './SignUpForm'

const SignUpContent = () => {
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
          {t('Fill in the fields below to create your account.')}
        </Typography>
      </Box>
      <SignUpForm />
      <ButtonBack
        size="small"
        variant="outlined"
        color="primary"
        sx={{mt: 3}}
      />
    </Card>
  )
}

export default SignUpContent
