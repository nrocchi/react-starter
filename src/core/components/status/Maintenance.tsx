import {Box, Container, Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'

const Maintenance = () => {
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
            alt="maintenance"
            height="100%"
            src="/images/pictures/maintenance.svg"
          />
        </Box>
        <Typography
          variant="h2"
          sx={{
            my: 2,
          }}>
          {t('This page is currently down for maintenance.')}
        </Typography>
        <Typography variant="h4" color="text.secondary" fontWeight="normal">
          {t('We apologize for any inconveniences caused.')}
        </Typography>
      </Box>
    </Container>
  )
}

export default Maintenance
