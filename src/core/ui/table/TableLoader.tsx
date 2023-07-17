import {Box, CircularProgress, Typography} from '@mui/material'

const TableLoader = () => (
  <Box textAlign="center" py={10}>
    <CircularProgress size={32} />
    <Typography variant="h4" fontWeight="normal" color="text.secondary">
      Chargement en cours...
    </Typography>
  </Box>
)

export default TableLoader
