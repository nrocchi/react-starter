import {Box, Typography} from '@mui/material'
import {FOOTER_YEAR, APP_NAME} from 'src/core/constants/Constants'

const FooterCopyright = () => (
  <Box>
    <Typography variant="subtitle1">
      &copy; {FOOTER_YEAR} - {APP_NAME}
    </Typography>
  </Box>
)

export default FooterCopyright
