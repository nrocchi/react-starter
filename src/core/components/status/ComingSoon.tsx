import {Box, Container, Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'

const ComingSoon = () => {
  const {t} = useTranslation()

  return (
    <Container maxWidth="md" sx={{height: '100%'}}>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        textAlign="center"
        justifyContent="center">
        <Box sx={{height: {xs: 120, sm: 180}}}>
          <img
            alt="coming-soon"
            height="100%"
            src="/images/pictures/coming-soon.svg"
          />
        </Box>

        <Typography
          variant="h2"
          sx={{
            my: 2,
          }}>
          {t('This feature is coming very soon.')}
        </Typography>
        <Typography variant="h4" color="text.secondary" fontWeight="normal">
          {t('We are working on implementing this feature before our launch!')}
        </Typography>
      </Box>
    </Container>
  )
}

export default ComingSoon
