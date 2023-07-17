import {Fragment, useRef, useState} from 'react'
import {
  Tooltip,
  Badge,
  alpha,
  useTheme,
  Box,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  List,
} from '@mui/material'
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone'
import MarkChatReadTwoToneIcon from '@mui/icons-material/MarkChatReadTwoTone'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone'
import {useTranslation} from 'react-i18next'
import Scrollbar from 'src/core/ui/scrollbar/Scrollbar'
import PopoverCustom from 'src/core/ui/popover/PopoverCustom'
import {
  AvatarGradientStyled,
  BadgeStyled,
  IconButtonStyled,
  OutlinedInputStyled,
} from '../NavbarStyled'

const Messenger = () => {
  const ref = useRef<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const theme = useTheme()
  const {t} = useTranslation()

  const items = [
    {
      id: 1,
      name: 'Munroe Dacks',
      avatar: '/images/avatars/1.jpg',
      status: 'online',
    },
    {
      id: 2,
      name: 'Gunilla Canario',
      avatar: '/images/avatars/2.jpg',
      status: 'offline',
    },
    {
      id: 3,
      name: 'Rowena Geistmann',
      avatar: '/images/avatars/3.jpg',
      status: 'online',
    },
    {
      id: 4,
      name: 'Ede Stoving',
      avatar: '/images/avatars/4.jpg',
      status: 'offline',
    },
    {
      id: 5,
      name: 'Crissy Spere',
      avatar: '/images/avatars/5.jpg',
      status: 'online',
    },
  ]

  return (
    <>
      <Tooltip arrow title={t('Messenger')}>
        <BadgeStyled
          badgeContent={5}
          color="success"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}>
          <Badge
            color="error"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
            overlap="circular">
            <IconButtonStyled
              color="info"
              ref={ref}
              onClick={() => setOpen(true)}
              sx={{
                background: alpha(theme.colors.info.main, 0.1),
                '&:hover': {
                  background: alpha(theme.colors.info.main, 0.2),
                },
              }}>
              <ForumTwoToneIcon fontSize="small" />
            </IconButtonStyled>
          </Badge>
        </BadgeStyled>
      </Tooltip>
      <PopoverCustom
        anchorEl={ref.current}
        onClose={() => setOpen(false)}
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}>
        <Box width={{xs: 270, sm: 360}} sx={{overflowY: 'hidden'}}>
          <Box
            p={1}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              background: theme.colors.alpha.black[5],
            }}>
            <Button
              size="small"
              color="primary"
              startIcon={<MarkChatReadTwoToneIcon />}
              sx={{
                fontSize: theme.typography.pxToRem(12),
              }}>
              {t('Mark all as read')}
            </Button>
            <Badge
              color="error"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              variant="dot"
              overlap="circular">
              <AvatarGradientStyled
                sx={{
                  fontWeight: 'normal',
                  fontSize: theme.typography.pxToRem(12),
                }}>
                NR
              </AvatarGradientStyled>
            </Badge>
          </Box>
          <Divider />
          <Box>
            <FormControl variant="outlined" fullWidth>
              <OutlinedInputStyled
                type="text"
                placeholder={t('Search a user...')}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Divider />
          <Scrollbar autoHeightMax="250px" autoHeight>
            <List disablePadding>
              {items.map((item) => (
                <Fragment key={item.id}>
                  <ListItem
                    sx={{
                      py: 1.5,
                      '&:hover': {
                        background: `${theme.colors.alpha.black[5]}`,
                      },
                      flexWrap: 'wrap',
                    }}
                    secondaryAction={
                      <Button
                        size="small"
                        variant="text"
                        color="secondary"
                        sx={{
                          alignSelf: 'center',
                          padding: `${theme.spacing(0.5, 1.5)}`,
                          backgroundColor: `${theme.colors.secondary.lighter}`,
                          textTransform: 'uppercase',
                          fontSize: `${theme.typography.pxToRem(11)}`,
                          '&:hover': {
                            backgroundColor: `${theme.colors.secondary.main}`,
                            color: `${theme.palette.getContrastText(
                              theme.colors.secondary.main,
                            )}`,
                          },
                        }}>
                        {t('Chat')}
                      </Button>
                    }>
                    <ListItemAvatar
                      sx={{
                        minWidth: 38,
                        mr: 1,
                      }}>
                      <Avatar
                        sx={{
                          width: 38,
                          height: 38,
                        }}
                        alt={item.name}
                        src={item.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{
                        flexGrow: 0,
                        maxWidth: '50%',
                        flexBasis: '50%',
                      }}
                      disableTypography
                      primary={
                        <Typography
                          sx={{
                            pb: 0.6,
                          }}
                          color="text.primary"
                          variant="h5">
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          {item.status === 'online' ? (
                            <Box display="flex" alignItems="center">
                              <Box
                                component="span"
                                sx={{
                                  borderRadius: '50%',
                                  width: 10,
                                  height: 10,
                                  background: theme.colors.success.main,
                                  marginRight: 0.5,
                                }}
                              />
                              <Typography
                                component="span"
                                color="success.main"
                                sx={{
                                  fontSize: theme.typography.pxToRem(11),
                                  lineHeight: 1,
                                }}
                                variant="body1">
                                {t('online')}
                              </Typography>
                            </Box>
                          ) : (
                            <Box display="flex" alignItems="center">
                              <Box
                                component="span"
                                sx={{
                                  borderRadius: '50%',
                                  width: 10,
                                  height: 10,
                                  background: theme.colors.error.main,
                                  marginRight: 0.5,
                                }}
                              />
                              <Typography
                                component="span"
                                color="error.main"
                                sx={{
                                  fontSize: theme.typography.pxToRem(11),
                                  lineHeight: 1,
                                }}
                                variant="body1">
                                {t('offline')}
                              </Typography>
                            </Box>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                  <Divider />
                </Fragment>
              ))}
            </List>
          </Scrollbar>
          <Divider />
          <Box
            sx={{
              background: theme.colors.alpha.black[5],
              textAlign: 'center',
            }}
            p={2}>
            <Button
              size="small"
              color="primary"
              variant="contained"
              sx={{fontWeight: 400}}
              endIcon={<ArrowForwardTwoToneIcon />}>
              {t('View all participants')}
            </Button>
          </Box>
        </Box>
      </PopoverCustom>
    </>
  )
}

Messenger.propTypes = {}

export default Messenger
