import {Box, useTheme} from '@mui/material'
import {Outlet} from 'react-router-dom'
import {LayoutDashboardStyled} from './LayoutStyled'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'

const LayoutDashboard = () => {
  const theme = useTheme()

  return (
    <>
      <Sidebar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          [theme.breakpoints.up('lg')]: {
            marginLeft: theme.sidebar.width,
          },
        }}>
        <Navbar
          sidebar={+true}
          logo={+true}
          darkmode={+true}
          notifications={+true}
          language={+true}
          toggle={+true}
          megamenu={+true}
          search={+true}
          messenger={+true}
        />
        <LayoutDashboardStyled
          logo={+true}
          darkmode={+true}
          notifications={+true}
          language={+true}
          toggle={+true}
          megamenu={+true}
          search={+true}
          messenger={+true}>
          <Outlet />
        </LayoutDashboardStyled>
        <Footer />
      </Box>
    </>
  )
}

export default LayoutDashboard
