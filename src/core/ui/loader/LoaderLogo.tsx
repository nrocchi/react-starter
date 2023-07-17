import {useEffect} from 'react'
import NProgress from 'nprogress'
import {Box, CircularProgress, useTheme} from '@mui/material'
import Logo from '../logo/Logo'

const LoaderLogo = () => {
  const theme = useTheme()

  useEffect(() => {
    NProgress.start()

    return () => {
      NProgress.done()
    }
  }, [])

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      width="100%"
      height="100%"
      bgcolor={theme.palette.background.default}>
      {/* <Box
        height="80%"
        display="flex"
        alignItems="center"
        justifyContent="center">
        <Logo width={300} height={50} />
      </Box> */}
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center">
        <Logo width={50} height={50} />
      </Box>
      <Box
        sx={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
        }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
        <CircularProgress size={64} disableShrink thickness={3} />
      </Box>
    </Box>
  )
}

export default LoaderLogo
