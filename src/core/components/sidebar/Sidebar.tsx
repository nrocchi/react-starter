import {memo} from 'react'
import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  darken,
  Badge,
  Skeleton,
} from '@mui/material'
import Logo from 'src/core/ui/logo/Logo'
import {Link as RouterLink} from 'react-router-dom'
import Scrollbar from 'src/core/ui/scrollbar/Scrollbar'
import {BADGE_NAME, LOGO_WHITE_URL} from 'src/core/constants/Constants'
import {useAuth} from 'src/core/auth/AuthContext'
import SidebarTopSection from './SidebarTopSection'
import SidebarMenu from './SidebarMenu'
import SidebarFooter from './SidebarFooter'
import {useSidebar} from './SidebarContext'

const SidebarWrapper = styled(Box)(
  ({theme}) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 1302;
        height: 100%;
        padding-bottom: 70px;
`,
)

const Sidebar = () => {
  const {sidebarToggle, toggleSidebar} = useSidebar()
  const closeSidebar = () => toggleSidebar()
  const theme = useTheme()
  const {user: authUser} = useAuth()

  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block',
          },
          position: 'fixed',
          left: 0,
          top: 0,
          background:
            theme.palette.mode === 'dark'
              ? alpha(theme.header.background, 0.9)
              : darken(theme.colors.primary.dark, 0.8),
          boxShadow: theme.sidebar.boxShadow,
        }}>
        <Scrollbar autoHeight={false}>
          <Box mt={1.5}>
            <Box
              mx="auto"
              component={RouterLink}
              to="/"
              sx={{
                width: 200,
              }}>
              <Box display="flex" justifyContent="center" mb={1.5}>
                <Logo
                  width={theme.header.widthLogo}
                  height={theme.header.heightLogo}
                  src={LOGO_WHITE_URL}
                  sx={{ml: 0.5}}
                />
                <Badge
                  color="success"
                  badgeContent={BADGE_NAME}
                  sx={{mt: 1, ml: 0.5}}
                />
              </Box>
            </Box>
          </Box>
          <Divider
            sx={{
              mb: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10],
            }}
          />
          <SidebarTopSection />
          <Divider
            sx={{
              mt: theme.spacing(3),
              mb: theme.spacing(1),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10],
            }}
          />
          <SidebarMenu role={authUser?.role.code} />
        </Scrollbar>
        <Divider
          sx={{
            background: theme.colors.alpha.trueWhite[10],
          }}
        />
        <SidebarFooter />
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`,
          zIndex: 1301,
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}>
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === 'dark'
                ? darken(theme.colors.primary.light, 0.5)
                : darken(theme.colors.primary.dark, 0.8),
          }}>
          <Scrollbar autoHeight={false}>
            <Box mt={1.5}>
              <Box
                component={RouterLink}
                to="/"
                onClick={() => {
                  closeSidebar()
                }}
                mx="auto"
                sx={{
                  width: 200,
                }}>
                <Box display="flex" justifyContent="center" mb={1.5}>
                  <Logo
                    width={theme.header.widthLogo}
                    height={theme.header.heightLogo}
                    src={LOGO_WHITE_URL}
                    sx={{ml: 0.5}}
                  />
                  <Badge
                    color="success"
                    badgeContent={BADGE_NAME}
                    sx={{mt: 1, ml: 0.5}}
                  />
                </Box>
              </Box>
            </Box>
            <Divider
              sx={{
                mb: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10],
              }}
            />
            <SidebarTopSection />
            <Divider
              sx={{
                mt: theme.spacing(3),
                mb: theme.spacing(1),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10],
              }}
            />
            {/* {!authUser || (isLoading && !isFetched) ? ( */}
            {!authUser ? (
              <Box p={2}>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    bgcolor: theme.colors.alpha.trueWhite[10],
                    width: '100%',
                    height: 43,
                    borderRadius: theme.general.borderRadiusMd,
                  }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{
                    bgcolor: theme.colors.alpha.trueWhite[10],
                    width: '50%',
                    height: 17,
                    borderRadius: theme.general.borderRadiusMd,
                    mt: 3,
                  }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{
                    bgcolor: theme.colors.alpha.trueWhite[10],
                    width: '100%',
                    height: 43,
                    borderRadius: theme.general.borderRadiusMd,
                    mt: 1,
                    mb: 0.5,
                  }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{
                    bgcolor: theme.colors.alpha.trueWhite[10],
                    width: '100%',
                    height: 43,
                    borderRadius: theme.general.borderRadiusMd,
                  }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{
                    bgcolor: theme.colors.alpha.trueWhite[10],
                    width: '50%',
                    height: 17,
                    borderRadius: theme.general.borderRadiusMd,
                    mt: 3,
                  }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{
                    bgcolor: theme.colors.alpha.trueWhite[10],
                    width: '100%',
                    height: 43,
                    borderRadius: theme.general.borderRadiusMd,
                    mt: 1,
                    mb: 0.5,
                  }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{
                    bgcolor: theme.colors.alpha.trueWhite[10],
                    width: '100%',
                    height: 43,
                    borderRadius: theme.general.borderRadiusMd,
                  }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{
                    bgcolor: theme.colors.alpha.trueWhite[10],
                    width: '50%',
                    height: 17,
                    borderRadius: theme.general.borderRadiusMd,
                    mt: 3,
                  }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{
                    bgcolor: theme.colors.alpha.trueWhite[10],
                    width: '100%',
                    height: 43,
                    borderRadius: theme.general.borderRadiusMd,
                    mt: 1,
                    mb: 0.5,
                  }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{
                    bgcolor: theme.colors.alpha.trueWhite[10],
                    width: '100%',
                    height: 43,
                    borderRadius: theme.general.borderRadiusMd,
                    my: 0.5,
                  }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{
                    bgcolor: theme.colors.alpha.trueWhite[10],
                    width: '100%',
                    height: 43,
                    borderRadius: theme.general.borderRadiusMd,
                    my: 0.5,
                  }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{
                    bgcolor: theme.colors.alpha.trueWhite[10],
                    width: '100%',
                    height: 43,
                    borderRadius: theme.general.borderRadiusMd,
                  }}
                />
              </Box>
            ) : (
              <>
                {/* <SidebarMenu role={currentUser?.datas.role.code} /> */}
                <SidebarMenu role={authUser?.role.code} />
              </>
            )}
          </Scrollbar>
          <Divider
            sx={{
              background: theme.colors.alpha.trueWhite[10],
            }}
          />
          <SidebarFooter />
        </SidebarWrapper>
      </Drawer>
    </>
  )
}

export default memo(Sidebar)
