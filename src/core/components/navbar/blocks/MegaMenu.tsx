import {useRef, useState} from 'react'
import {
  alpha,
  Box,
  Button,
  Divider,
  Link,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material'
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone'
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone'
import {useTranslation} from 'react-i18next'
import Scrollbar from 'src/core/ui/scrollbar/Scrollbar'
import PopoverCustom from 'src/core/ui/popover/PopoverCustom'

const LabelWrapper = styled(Box)(
  ({theme}) => `
  font-size: ${theme.typography.pxToRem(10)};
  font-weight: bold;
  text-transform: uppercase;
  border-radius: ${theme.general.borderRadiusSm};
  padding: ${theme.spacing(0.5, 1, 0.4)};
`,
)

const MenuListWrapperSecondary = styled(MenuList)(
  ({theme}) => `
  padding: ${theme.spacing(3)};

  & .MuiMenuItem-root {
      border-radius: 50px;
      padding: ${theme.spacing(1, 1, 1, 2.5)};
      min-width: 200px;
      margin-bottom: 2px;
      position: relative;
      color: ${theme.colors.alpha.black[70]};

      &.Mui-selected,
      &:hover,
      &.MuiButtonBase-root:active {
          background: ${theme.colors.alpha.black[10]};
          color: ${theme.colors.alpha.black[100]};
      }

      &:last-child {
          margin-bottom: 0;
      }
    }
`,
)

const MenuListWrapperSuccess = styled(MenuList)(
  ({theme}) => `
  padding: ${theme.spacing(3)};

  & .MuiMenuItem-root {
      border-radius: 50px;
      padding: ${theme.spacing(1, 1, 1, 2.5)};
      min-width: 200px;
      margin-bottom: 2px;
      position: relative;
      color: ${theme.colors.primary.main};

      &.Mui-selected,
      &:hover,
      &.MuiButtonBase-root:active {
          background: ${theme.colors.primary.lighter};
          color: ${theme.colors.primary.dark};
      }

      &:last-child {
          margin-bottom: 0;
      }
    }
`,
)

const DotLegend = styled('span')(
  ({theme}) => `
    border-radius: 22px;
    width: ${theme.spacing(1.4)};
    height: ${theme.spacing(1.45)};
    display: inline-block;
    border: ${theme.colors.alpha.white[100]} solid 2px;
`,
)

const MegaMenu = () => {
  const {t} = useTranslation()
  const theme = useTheme()
  const ref = useRef<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Box>
        <Button
          ref={ref}
          onClick={() => setOpen(true)}
          endIcon={<KeyboardArrowDownTwoToneIcon />}
          color="secondary"
          size="small"
          sx={{
            lineHeight: 0,
            px: 2,
            backgroundColor: `${theme.colors.primary.lighter}`,
            color: `${theme.colors.primary.dark}`,

            '.MuiSvgIcon-root': {
              color: `${theme.colors.primary.dark}`,
              transition: `${theme.transitions.create(['color'])}`,
            },

            '&:hover': {
              backgroundColor: `${theme.colors.primary.main}`,
              color: `${theme.palette.getContrastText(
                theme.colors.primary.main,
              )}`,

              '.MuiSvgIcon-root': {
                color: `${theme.palette.getContrastText(
                  theme.colors.primary.main,
                )}`,
              },
            },
          }}>
          {t('Help')}
        </Button>
      </Box>
      <PopoverCustom
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={() => setOpen(false)}
        open={open}
        anchorEl={ref.current}>
        <Box sx={{overflowY: 'hidden'}}>
          <Box
            sx={{
              p: 2,
              background: theme.colors.alpha.black[5],
            }}
            display="flex"
            alignItems="center"
            justifyContent="space-between">
            <Box>
              <Typography
                sx={{
                  pb: 0.5,
                }}
                variant="h4">
                {t('Help')}
              </Typography>
              <Typography noWrap variant="subtitle2">
                {t('This is an example for custom menus')}
              </Typography>
            </Box>
            <Link
              href="#"
              variant="subtitle2"
              sx={{
                textTransform: 'none',
                display: {xs: 'none', lg: 'inline-block'},
              }}>
              {t('View all')}
            </Link>
          </Box>
          <Divider />
          <Scrollbar autoHeightMax="70vh">
            <Stack
              direction={{xs: 'column', sm: 'row'}}
              divider={<Divider orientation="vertical" flexItem />}
              justifyContent="stretch"
              alignItems="stretch"
              spacing={0}>
              <MenuListWrapperSecondary disablePadding>
                <MenuItem selected>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('FAQ')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Technical Support')}
                  />
                  <Box display="flex" alignItems="center">
                    <DotLegend
                      style={{
                        background: `${theme.colors.success.main}`,
                      }}
                    />
                    <ChevronRightTwoToneIcon
                      sx={{
                        ml: 1,
                        color: `${theme.colors.alpha.black[30]}`,
                        opacity: 0.8,
                      }}
                    />
                  </Box>
                </MenuItem>
                <MenuItem disabled>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Commercial Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Customer Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Admin Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
              </MenuListWrapperSecondary>
              <MenuListWrapperSuccess disablePadding>
                <MenuItem selected>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('FAQ')}
                  />
                  <Box display="flex" alignItems="center">
                    <LabelWrapper
                      component="span"
                      sx={{
                        background: `${theme.colors.primary.main}`,
                        color: `${theme.palette.getContrastText(
                          theme.colors.primary.dark,
                        )}`,
                      }}>
                      {t('New')}
                    </LabelWrapper>
                    <ChevronRightTwoToneIcon
                      sx={{
                        ml: 1,
                        color: `${theme.colors.alpha.black[30]}`,
                        opacity: 0.8,
                      }}
                    />
                  </Box>
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Technical Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      ml: 1,
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
                <MenuItem disabled>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Commercial Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Customer Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Admin Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
              </MenuListWrapperSuccess>
            </Stack>
            <Stack
              direction={{xs: 'column', sm: 'row'}}
              divider={<Divider orientation="vertical" flexItem />}
              justifyContent="stretch"
              alignItems="stretch"
              spacing={0}>
              <MenuListWrapperSecondary disablePadding>
                <MenuItem selected>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('FAQ')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Technical Support')}
                  />
                  <Box display="flex" alignItems="center">
                    <DotLegend
                      style={{
                        background: `${theme.colors.success.main}`,
                      }}
                    />
                    <ChevronRightTwoToneIcon
                      sx={{
                        ml: 1,
                        color: `${theme.colors.alpha.black[30]}`,
                        opacity: 0.8,
                      }}
                    />
                  </Box>
                </MenuItem>
                <MenuItem disabled>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Commercial Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Customer Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Admin Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
              </MenuListWrapperSecondary>
              <MenuListWrapperSuccess disablePadding>
                <MenuItem selected>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('FAQ')}
                  />
                  <Box display="flex" alignItems="center">
                    <LabelWrapper
                      component="span"
                      sx={{
                        background: `${theme.colors.primary.main}`,
                        color: `${theme.palette.getContrastText(
                          theme.colors.primary.dark,
                        )}`,
                      }}>
                      {t('New')}
                    </LabelWrapper>
                    <ChevronRightTwoToneIcon
                      sx={{
                        ml: 1,
                        color: `${theme.colors.alpha.black[30]}`,
                        opacity: 0.8,
                      }}
                    />
                  </Box>
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Technical Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      ml: 1,
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
                <MenuItem disabled>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Commercial Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Customer Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Admin Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
              </MenuListWrapperSuccess>
            </Stack>
            <Stack
              direction={{xs: 'column', sm: 'row'}}
              divider={<Divider orientation="vertical" flexItem />}
              justifyContent="stretch"
              alignItems="stretch"
              spacing={0}>
              <MenuListWrapperSecondary disablePadding>
                <MenuItem selected>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('FAQ')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Technical Support')}
                  />
                  <Box display="flex" alignItems="center">
                    <DotLegend
                      style={{
                        background: `${theme.colors.success.main}`,
                      }}
                    />
                    <ChevronRightTwoToneIcon
                      sx={{
                        ml: 1,
                        color: `${theme.colors.alpha.black[30]}`,
                        opacity: 0.8,
                      }}
                    />
                  </Box>
                </MenuItem>
                <MenuItem disabled>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Commercial Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Customer Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Admin Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
              </MenuListWrapperSecondary>
              <MenuListWrapperSuccess disablePadding>
                <MenuItem selected>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('FAQ')}
                  />
                  <Box display="flex" alignItems="center">
                    <LabelWrapper
                      component="span"
                      sx={{
                        background: `${theme.colors.primary.main}`,
                        color: `${theme.palette.getContrastText(
                          theme.colors.primary.dark,
                        )}`,
                      }}>
                      {t('New')}
                    </LabelWrapper>
                    <ChevronRightTwoToneIcon
                      sx={{
                        ml: 1,
                        color: `${theme.colors.alpha.black[30]}`,
                        opacity: 0.8,
                      }}
                    />
                  </Box>
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Technical Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      ml: 1,
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
                <MenuItem disabled>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Commercial Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Customer Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                    }}
                    primary={t('Admin Support')}
                  />
                  <ChevronRightTwoToneIcon
                    sx={{
                      color: `${theme.colors.alpha.black[30]}`,
                      opacity: 0.8,
                    }}
                  />
                </MenuItem>
              </MenuListWrapperSuccess>
            </Stack>
          </Scrollbar>
          <Divider />
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              background: theme.colors.alpha.black[5],
            }}>
            <Button size="small" color="primary">
              {t('Contact Support')}
            </Button>
          </Box>
        </Box>
      </PopoverCustom>
    </>
  )
}

MegaMenu.propTypes = {}

export default MegaMenu
