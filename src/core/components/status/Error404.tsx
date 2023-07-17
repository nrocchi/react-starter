import {Box, Container, Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'
import ButtonBack from 'src/core/ui/buttons/ButtonBack'

const Error404 = () => {
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
            <img alt="404" height="100%" src="/images/pictures/404.svg" />
          </Box>
          <Typography
            variant="h2"
            sx={{
              my: 2,
            }}>
            {t("The page you were looking for doesn't exist.")}
          </Typography>
          <Typography
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
            sx={{
              mb: 4,
            }}>
            {t("It's on us, we moved the content to a different page.")}
          </Typography>
          <ButtonBack
            variant="contained"
            color="primary"
            to="/"
            page={t('Home')}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default Error404
