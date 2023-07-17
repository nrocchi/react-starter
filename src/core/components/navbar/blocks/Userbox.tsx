import {useCallback, useRef, useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  styled,
  useTheme,
  Tooltip,
  Skeleton,
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone'
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone'
import useGetUser from 'src/api/users/hooks/useGetUser'
import {useAuth} from 'src/core/auth/AuthContext'
import PopoverCustom from 'src/core/ui/popover/PopoverCustom'

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
        color: ${theme.palette.secondary.main};
        display: block;
`,
)

const UserBoxDescription = styled(Typography)(
  ({theme}) => `
        color: ${theme.palette.secondary.light}
`,
)

const Userbox = () => {
  const theme = useTheme()
  const {t} = useTranslation()
  const ref = useRef<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const {user: authUser, signOut} = useAuth()
  const {data, isLoading} = useGetUser(authUser?.id)

  const handleSignOut = useCallback(async (): Promise<void> => {
    signOut()
    navigate('/')
  }, [])

  return (
    <>
      {!authUser || isLoading ? (
        <Box
          sx={{
            minWidth: {xs: 'inherit', md: 200},
            minHeight: {xs: 'inherit', md: 59},
            padding: {xs: 0, md: 1},
            marginLeft: 1,
            display: 'flex',
            alignItems: 'center',
          }}>
          <Skeleton
            variant="rectangular"
            sx={{
              bgcolor: theme.colors.alpha.black[10],
              width: 36,
              height: 36,
              borderRadius: theme.general.borderRadius,
            }}
          />
          <Box
            sx={{
              display: {xs: 'none', md: 'block'},
              pl: 1,
            }}>
            <Skeleton
              variant="text"
              sx={{
                bgcolor: theme.colors.alpha.black[10],
                width: 104,
                height: 20,
              }}
            />
            <Skeleton
              variant="text"
              sx={{
                bgcolor: theme.colors.alpha.black[10],
                width: 104,
                height: 20,
              }}
            />
          </Box>
          <Skeleton
            variant="rectangular"
            sx={{
              display: {xs: 'none', md: 'block'},
              bgcolor: theme.colors.alpha.black[10],
              width: 24,
              height: 24,
              ml: 1,
              borderRadius: theme.general.borderRadiusMd,
            }}
          />
        </Box>
      ) : (
        <>
          <Tooltip arrow title={t('User menu')}>
            <Button
              color="secondary"
              sx={{
                minWidth: {xs: 'inherit', md: 200},
                minHeight: {xs: 'inherit', md: 59},
                padding: {xs: theme.spacing(0), md: theme.spacing(1)},
                marginLeft: theme.spacing(1),
              }}
              ref={ref}
              onClick={() => setOpen(true)}>
              <Avatar
                sx={{width: {xs: 32, md: 36}, height: {xs: 32, md: 36}}}
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
              <Box
                component="span"
                sx={{
                  display: {xs: 'none', md: 'inline-block'},
                }}>
                <UserBoxText>
                  <UserBoxLabel variant="body1">
                    {data?.datas.firstname} {data?.datas.lastname}
                  </UserBoxLabel>
                  <UserBoxDescription variant="body2">
                    {t(data?.datas.role?.name)}
                  </UserBoxDescription>
                </UserBoxText>
              </Box>
              <Box
                component="span"
                sx={{
                  display: {xs: 'none', md: 'flex'},
                }}>
                <ExpandMoreTwoToneIcon
                  sx={{
                    ml: 1,
                  }}
                />
              </Box>
            </Button>
          </Tooltip>
        </>
      )}
      <PopoverCustom
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={() => setOpen(false)}
        open={open}
        anchorEl={ref.current}>
        <MenuUserBox
          sx={{
            minWidth: 230,
          }}
          display="flex">
          <Avatar
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
            <UserBoxLabel variant="body1">{data?.datas.firstname}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {t(data?.datas.role?.name)}
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
        <Box p={1} bgcolor={theme.colors.alpha.black[5]}>
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
    </>
  )
}

export default Userbox
