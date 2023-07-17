import {Box, Container} from '@mui/material'
import {useTranslation} from 'react-i18next'
import HelmetCustom from 'src/core/ui/helmet/HelmetCustom'
import CreatePasswordContent from './CreatePasswordContent'

const CreatePassword = () => {
  const {t} = useTranslation()

  return (
    <>
      <HelmetCustom title={t('Create a password')} />
      <Container maxWidth="sm" sx={{height: '100%'}}>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center">
          <CreatePasswordContent />
        </Box>
      </Container>
    </>
  )
}

export default CreatePassword
