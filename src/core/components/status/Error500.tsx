import {Box, Container, Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'
import ButtonBack from 'src/core/ui/buttons/ButtonBack'

const Error500 = () => {
  const {t} = useTranslation()

  return (
    <Container maxWidth="md" sx={{height: '100%'}}>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        textAlign="center"
        justifyContent="center">
        <Box>
          <Box sx={{height: {xs: 120, sm: 180}}}>
            <img alt="500" height="100%" src="/images/pictures/500.svg" />
          </Box>
          <Typography
            variant="h2"
            sx={{
              my: 2,
            }}>
            {t('A server error is occured.')}
          </Typography>
          <Typography
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
            sx={{
              mb: 4,
            }}>
            {t(
              'The server encountered an internal error, please try again later.',
            )}
          </Typography>
          <Box>
            <ButtonBack size="small" variant="outlined" color="primary" />
          </Box>
          <Box>
            <ButtonBack
              variant="contained"
              color="primary"
              to="/"
              page={t('Home')}
              sx={{mt: 3}}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Error500
