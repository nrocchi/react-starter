import PropTypes from 'prop-types'
import {memo} from 'react'
import {Box, Tooltip, useTheme} from '@mui/material'
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone'
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone'
import Logo from 'src/core/ui/logo/Logo'
import {Link as RouterLink} from 'react-router-dom'
import {LanguageProvider} from 'src/core/language/LanguageContext'
import {useTranslation} from 'react-i18next'
import {useAuth} from 'src/core/auth/AuthContext'
import Language from './blocks/Language'
import DarkMode from './blocks/DarkMode'
import Notifications from './notifications/Notifications'
import {IconButtonStyled, NavbarStyled} from './NavbarStyled'
import {NavbarProps} from './NavbarTypes'
import {useSidebar} from '../sidebar/SidebarContext'
import Search from './blocks/Search'
import MegaMenu from './blocks/MegaMenu'
import Userbox from './blocks/Userbox'
import Messenger from './blocks/Messenger'
import {NotificationsProvider} from './notifications/NotificationsContext'

const Navbar = ({
  sidebar = +false,
  logo = +false,
  search = +false,
  megamenu = +false,
  messenger = +false,
  darkmode = +false,
  notifications = +false,
  language = +false,
  userbox = +false,
  toggle = +false,
}: NavbarProps) => {
  const {sidebarToggle, toggleSidebar} = useSidebar()
  const theme = useTheme()
  const {t} = useTranslation()
  const {isAuthenticated} = useAuth()

  return (
    <>
      <NavbarStyled
        display={{xs: 'block', sm: 'flex'}}
        justifyContent={{
          xs: 'center',
          sm: 'space-between',
        }}
        alignItems="center"
        textAlign="center"
        sidebar={sidebar}>
        <Box display={{xs: 'block', sm: 'flex'}}>
          {logo ? (
            <Box component={RouterLink} to="/">
              <Logo
                sx={{
                  mr: {xs: 0, sm: 2},
                  display: {
                    xs: 'inline',
                    sm: 'flex',
                    lg: logo ? (sidebar ? 'none' : 'flex') : 'none',
                  },
                  mt: {xs: 1, sm: 1.5},
                  mb: {xs: 0, sm: 1.5},
                }}
                width={theme.header.widthLogo}
                height={theme.header.heightLogo}
              />
            </Box>
          ) : null}
          {search || megamenu ? (
            <Box
              display={{xs: 'flex', sm: 'flex'}}
              alignItems="center"
              justifyContent={{xs: 'center', sm: 'space-between'}}
              pt={{xs: 1, sm: 2}}
              pb={{xs: 1, sm: 2}}>
              {search ? <Search /> : null}
              {megamenu ? <MegaMenu /> : null}
            </Box>
          ) : null}
        </Box>
        {(darkmode ||
          notifications ||
          messenger ||
          language ||
          userbox ||
          toggle) && (
          <Box
            display={{xs: 'flex', sm: 'flex'}}
            alignItems="center"
            justifyContent="center"
            pt={{xs: 1, sm: 2}}
            pb={{xs: 1, sm: 2}}>
            {darkmode ? <DarkMode /> : null}
            {messenger ? <Messenger /> : null}
            {isAuthenticated ? (
              notifications ? (
                <NotificationsProvider>
                  <Notifications />
                </NotificationsProvider>
              ) : null
            ) : null}
            {language ? (
              <LanguageProvider>
                <Language />
              </LanguageProvider>
            ) : null}
            {userbox ? <Userbox /> : null}
            {toggle ? (
              <Box
                component="span"
                sx={{
                  display: {lg: 'none', xs: 'inline-block'},
                }}>
                <Tooltip arrow title={t('Toggle menu')}>
                  <IconButtonStyled
                    color="primary"
                    onClick={toggleSidebar}
                    sx={{
                      marginLeft: theme.spacing(1),
                    }}>
                    {!sidebarToggle ? (
                      <MenuTwoToneIcon />
                    ) : (
                      <CloseTwoToneIcon />
                    )}
                  </IconButtonStyled>
                </Tooltip>
              </Box>
            ) : null}
          </Box>
        )}
      </NavbarStyled>
    </>
  )
}

Navbar.propTypes = {
  sidebar: PropTypes.number,
  logo: PropTypes.number,
  search: PropTypes.number,
  megamenu: PropTypes.number,
  darkmode: PropTypes.number,
  notifications: PropTypes.number,
  messenger: PropTypes.number,
  language: PropTypes.number,
  userbox: PropTypes.number,
  toggle: PropTypes.number,
}

export default memo(Navbar)
