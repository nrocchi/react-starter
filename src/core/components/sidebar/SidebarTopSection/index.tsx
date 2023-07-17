import {useRef, useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Divider,
  alpha,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  styled,
  useTheme,
  Skeleton,
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import UnfoldMoreTwoToneIcon from '@mui/icons-material/UnfoldMoreTwoTone'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone'
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone'
import {useAuth} from 'src/core/auth/AuthContext'
import PopoverCustom from 'src/core/ui/popover/PopoverCustom'
import useGetUser from 'src/api/users/hooks/useGetUser'
import {useSidebar} from '../SidebarContext'

const MenuUserBox = styled(Box)(
  ({theme}) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(2)};
`,
)

const UserBoxText = styled(Box)(
  ({theme}) => `
    text-align: left;
    padding-left: ${theme.spacing(1)};
`,
)

const UserBoxLabel = styled(Typography)(
  ({theme}) => `
    font-weight: ${theme.typography.fontWeightBold};
    color: ${theme.sidebar.menuItemColor};
    display: block;

    &.popoverTypo {
      color: ${theme.palette.secondary.main};
    }
`,
)

const UserBoxDescription = styled(Typography)(
  ({theme}) => `
    color: ${alpha(theme.sidebar.menuItemColor, 0.6)};

    &.popoverTypo {
      color: ${theme.palette.secondary.light};
    }
`,
)

const SidebarTopSection = () => {
  const {t} = useTranslation()
  const theme = useTheme()
  const ref = useRef<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const {closeSidebar} = useSidebar()
  const navigate = useNavigate()
  const {user: authUser, signOut} = useAuth()
  const {data, isLoading} = useGetUser(authUser?.id)

  const handleSignOut = (): void => {
    setOpen(false)
    signOut()
    navigate('/')
  }

  return (
    <Box
      sx={{
        textAlign: 'center',
        mx: 2,
        pt: 1,
        mt: 3,
        position: 'relative',
      }}>
      {!authUser || isLoading ? (
        <>
          <Skeleton
            variant="circular"
            sx={{
              bgcolor: theme.colors.alpha.trueWhite[10],
              width: 70,
              height: 70,
              mb: 2,
              mx: 'auto',
            }}
          />
          <Skeleton
            variant="text"
            sx={{
              bgcolor: theme.colors.alpha.trueWhite[10],
              mx: 'auto',
            }}>
            <Typography variant="h4">Nicolas Rocchi</Typography>
          </Skeleton>
          <Skeleton
            variant="text"
            sx={{
              bgcolor: theme.colors.alpha.trueWhite[10],
              mx: 'auto',
            }}>
            <Typography variant="subtitle1">Administrator</Typography>
          </Skeleton>
          <Skeleton
            variant="rectangular"
            sx={{
              bgcolor: theme.colors.alpha.trueWhite[10],
              position: 'absolute',
              width: 28,
              height: 28,
              right: theme.spacing(0),
              top: theme.spacing(0),
              borderRadius: theme.general.borderRadiusMd,
            }}
          />
        </>
      ) : (
        <>
          <Avatar
            sx={{
              width: 70,
              height: 70,
              fontSize: 25,
              mb: 2,
              mx: 'auto',
              backgroundColor: 'primary.main',
            }}
            alt={`${data?.datas.firstname} ${data?.datas.lastname}`}
            src={
              data?.datas.avatar
                ? data?.datas.avatar.startsWith('https://')
                  ? data?.datas.avatar
                  : `${process.env.REACT_APP_API_URL}${data?.datas.avatar}`
                : data?.datas.firstname
            }
          />
          <Typography
            variant="h4"
            sx={{
              color: `${theme.colors.alpha.trueWhite[100]}`,
            }}>
            {data?.datas?.firstname} {data?.datas.lastname}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: `${theme.colors.alpha.trueWhite[70]}`,
            }}>
            {t(data?.datas.role.name)}
          </Typography>
          <IconButton
            size="small"
            sx={{
              position: 'absolute',
              right: theme.spacing(0),
              color: theme.colors.alpha.trueWhite[70],
              top: theme.spacing(0),
              background: theme.colors.alpha.trueWhite[10],

              '&:hover': {
                color: theme.colors.alpha.trueWhite[100],
                background: alpha(theme.colors.alpha.trueWhite[100], 0.2),
              },
            }}
            ref={ref}
            onClick={() => setOpen(true)}>
            <UnfoldMoreTwoToneIcon fontSize="small" />
          </IconButton>
        </>
      )}
      <PopoverCustom
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={() => setOpen(false)}
        open={open}
        anchorEl={ref.current}>
        <MenuUserBox
          sx={{
            minWidth: 210,
          }}
          display="flex">
          <Avatar
            sx={{
              backgroundColor: theme.colors.primary.main,
            }}
            variant="rounded"
            alt={`${data?.datas.firstname} ${data?.datas.lastname}`}
            src={
              data?.datas.avatar
                ? data?.datas.avatar.startsWith('https://')
                  ? data?.datas.avatar
                  : `${process.env.REACT_APP_API_URL}${data?.datas.avatar}`
                : data?.datas.firstname
            }
          />
          <UserBoxText>
            <UserBoxLabel className="popoverTypo" variant="body1">
              {data?.datas.firstname} {data?.datas.lastname}
            </UserBoxLabel>
            <UserBoxDescription className="popoverTypo" variant="body2">
              {t(data?.datas.role.name)}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider
          sx={{
            mb: 0,
          }}
        />
        <List
          sx={{
            p: 1,
          }}
          component="nav">
          <ListItem
            onClick={() => {
              closeSidebar()
              setOpen(false)
            }}
            button
            to="edit-profile"
            component={NavLink}>
            <FaceTwoToneIcon fontSize="small" />
            <ListItemText primary={t('Edit my profile')} />
          </ListItem>
          <ListItem
            onClick={() => {
              closeSidebar()
              setOpen(false)
            }}
            button
            to="edit-password"
            component={NavLink}>
            <VpnKeyIcon fontSize="small" />
            <ListItemText primary={t('Edit my password')} />
          </ListItem>
        </List>
        <Divider />
        <Box m={1}>
          <Button color="primary" fullWidth onClick={handleSignOut}>
            <LockOpenTwoToneIcon
              sx={{
                mr: 1,
              }}
            />
            {t('Sign Out')}
          </Button>
        </Box>
      </PopoverCustom>
    </Box>
  )
}

export default SidebarTopSection
