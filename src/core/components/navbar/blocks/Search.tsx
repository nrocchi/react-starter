import {ChangeEvent, Fragment, useState} from 'react'
import {
  alpha,
  Box,
  Card,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Link,
  List,
  ListItem,
  styled,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'
import ContactSupportTwoToneIcon from '@mui/icons-material/ContactSupportTwoTone'
import RestoreTwoToneIcon from '@mui/icons-material/RestoreTwoTone'
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone'
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone'
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone'
import AppSettingsAltTwoToneIcon from '@mui/icons-material/AppSettingsAltTwoTone'
import KeyboardArrowRightTwoToneIcon from '@mui/icons-material/KeyboardArrowRightTwoTone'
import wait from 'src/core/utils/wait'
import {useTranslation} from 'react-i18next'
import ModalCustom from 'src/core/ui/modal/ModalCustom'
import {IconButtonStyled} from '../NavbarStyled'

const SearchInputWrapper = styled(InputBase)(
  ({theme}) => `
    font-size: ${theme.typography.pxToRem(18)};
    padding: ${theme.spacing(2)};
    width: 100%;
`,
)

const ListButton = styled(Box)(
  ({theme}) => `
      background-color: transparent;
      color:  ${theme.colors.alpha.black[100]};
      transition: ${theme.transitions.create(['all'])};
      border: ${theme.colors.alpha.black[10]} solid 1px;
      border-radius: ${theme.general.borderRadius};
      padding: ${theme.spacing(1)};
      margin: ${theme.spacing(1, 0)};
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;

      & > div > .MuiSvgIcon-root {
        color:  ${theme.colors.alpha.black[50]};
        transition: ${theme.transitions.create(['all'])};
      }

      &:hover {
        background-color: ${alpha(theme.colors.primary.main, 0.08)};
        color:  ${theme.colors.primary.main};
        border-color: ${alpha(theme.colors.primary.main, 0.3)};

        & > div > .MuiSvgIcon-root {
          color:  ${theme.colors.primary.main};
        }
      }
`,
)

const searchTerms: any = {
  dashboards: [
    {
      title: 'Home',
    },
  ],
  management: [
    {
      title: 'Users',
    },
  ],
}

const Search = () => {
  const {t} = useTranslation()
  const theme = useTheme()
  const [open, setOpen] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchLoading, setSearchLoading] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<boolean>(false)

  const submitSearch = async (event: any): Promise<void> => {
    event.preventDefault()
    setSearchResults(false)
    setSearchLoading(true)
    await wait(1500)
    setSearchLoading(false)
    setSearchResults(true)
  }

  const handleSearchChange = async (event: ChangeEvent<{value: unknown}>) => {
    event.preventDefault()

    if (event.target.value) {
      setSearchResults(false)
      setSearchValue(event.target.value as string)
      setSearchLoading(true)
      await wait(1500)
      setSearchLoading(false)
      setSearchResults(true)
    } else {
      setSearchValue('')
      setSearchResults(false)
    }
  }

  return (
    <>
      <Tooltip arrow title={t('Search')}>
        <IconButtonStyled
          sx={{
            ml: 0,
            mr: 1,
          }}
          color="primary"
          onClick={() => setOpen(true)}>
          <SearchTwoToneIcon fontSize="small" />
        </IconButtonStyled>
      </Tooltip>
      <ModalCustom
        maxWidth="sm"
        open={open}
        onClose={() => {
          setSearchResults(false)
          setOpen(false)
        }}
        title={
          <Box>
            <form onSubmit={submitSearch}>
              <Box display="flex" alignItems="center">
                <Box flexGrow={1} display="flex" alignItems="center">
                  <SearchTwoToneIcon
                    sx={{
                      ml: 2,
                      color: theme.colors.secondary.main,
                    }}
                  />
                  <SearchInputWrapper
                    value={searchValue}
                    onChange={handleSearchChange}
                    autoFocus
                    placeholder={t('Search here...')}
                    fullWidth
                  />
                </Box>
                <Card
                  sx={{
                    ml: 'auto',
                    mr: 2,
                    py: 0.5,
                    px: 1,
                    background: theme.colors.alpha.black[10],
                  }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight="bold">
                    esc
                  </Typography>
                </Card>
              </Box>
            </form>
          </Box>
        }
        sx={{p: 0}}>
        {!searchLoading && (
          <>
            {!searchResults && (
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  background: theme.colors.info.lighter,
                  color: theme.colors.info.main,
                  borderRadius: theme.general.borderRadius,
                  fontSize: theme.typography.pxToRem(13),
                  display: 'flex',
                  alignItems: 'center',
                  p: 1,
                  mx: 2,
                  my: 2,
                }}>
                <ContactSupportTwoToneIcon
                  sx={{
                    mr: 0.8,
                    fontSize: theme.typography.pxToRem(18),
                  }}
                />
                {t('Start typing to see the search results.')}
              </Typography>
            )}
          </>
        )}
        {searchLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              my: 5,
            }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {searchResults ? (
              Object.keys(searchTerms).map((type, index) => (
                <Box px={2} py={1} key={index}>
                  <Typography
                    sx={{
                      py: 1,
                    }}
                    variant="h5">
                    {t('text.capitalize', {value: t(type)})}
                  </Typography>
                  {searchTerms[type].map((result: any) => (
                    <Fragment key={result.title}>
                      <ListButton>
                        <Box display="flex" alignItems="flex-start">
                          <RestoreTwoToneIcon
                            sx={{
                              mr: 1,
                            }}
                            fontSize="small"
                          />
                          <Typography>{t(result.title)}</Typography>
                        </Box>
                        <KeyboardArrowRightTwoToneIcon fontSize="small" />
                      </ListButton>
                    </Fragment>
                  ))}
                </Box>
              ))
            ) : (
              <Box pb={2} px={2}>
                <Typography
                  sx={{
                    pb: 0.5,
                  }}
                  variant="h5">
                  {t('Recent searches')}
                </Typography>
                <ListButton>
                  <Box display="flex" alignItems="center">
                    <RestoreTwoToneIcon
                      sx={{
                        mr: 1,
                      }}
                      fontSize="small"
                    />
                    <Typography>{t('Home')}</Typography>
                  </Box>
                  <Box>
                    <Tooltip
                      placement="top"
                      arrow
                      title={t('Save this search')}>
                      <IconButton size="small" color="primary">
                        <StarTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      placement="top"
                      arrow
                      title={t('Remove this search from history')}>
                      <IconButton size="small" color="error">
                        <CloseTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListButton>
                <ListButton>
                  <Box display="flex" alignItems="center">
                    <RestoreTwoToneIcon
                      sx={{
                        mr: 1,
                      }}
                      fontSize="small"
                    />
                    <Typography>{t('Users')}</Typography>
                  </Box>
                  <Box>
                    <Tooltip
                      placement="top"
                      arrow
                      title={t('Save this search')}>
                      <IconButton size="small" color="primary">
                        <StarTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      placement="top"
                      arrow
                      title={t('Remove this search from history')}>
                      <IconButton size="small" color="error">
                        <CloseTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListButton>
                <Typography
                  sx={{
                    pt: 2,
                    pb: 0.5,
                  }}
                  variant="h5">
                  {t('Saved searches')}
                </Typography>
                <ListButton>
                  <Box display="flex" alignItems="center">
                    <StarTwoToneIcon
                      sx={{
                        mr: 1,
                      }}
                      fontSize="small"
                    />
                    <Typography>{t('Contact')}</Typography>
                  </Box>
                  <Box>
                    <Tooltip
                      placement="top"
                      arrow
                      title={t('Remove this search from favourites')}>
                      <IconButton size="small" color="error">
                        <CloseTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListButton>
                <Divider
                  sx={{
                    my: 4,
                  }}
                />
                <Typography variant="h5">{t('Popular searches')}</Typography>
                <Box p={4}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box
                        display="flex"
                        mb={1}
                        fontSize={13}
                        alignItems="center">
                        <DashboardTwoToneIcon
                          sx={{
                            color: theme.colors.primary.main,
                            fontSize: theme.typography.pxToRem(18),
                            mr: 1,
                          }}
                        />
                        <b>{t('text.capitalize', {value: t('dashboards')})}</b>
                      </Box>
                      <List disablePadding>
                        <ListItem
                          sx={{
                            pl: 3,
                            py: 0.4,
                          }}
                          disableGutters>
                          <Link href="#" color="primary" fontSize={13}>
                            {t('Home')}
                          </Link>
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        display="flex"
                        mb={1}
                        fontSize={13}
                        alignItems="center">
                        <AppSettingsAltTwoToneIcon
                          sx={{
                            color: theme.colors.primary.main,
                            fontSize: theme.typography.pxToRem(18),
                            mr: 1,
                          }}
                        />
                        <b>{t('text.capitalize', {value: t('management')})}</b>
                      </Box>
                      <List disablePadding>
                        <ListItem
                          sx={{
                            pl: 3,
                            py: 0.4,
                          }}
                          disableGutters>
                          <Link href="#" color="primary" fontSize={13}>
                            {t('Users')}
                          </Link>
                        </ListItem>
                        <ListItem
                          sx={{
                            pl: 3,
                            py: 0.4,
                          }}
                          disableGutters>
                          <Link href="#" color="primary" fontSize={13}>
                            {t('Help')}
                          </Link>
                        </ListItem>
                        <ListItem
                          sx={{
                            pl: 3,
                            py: 0.4,
                          }}
                          disableGutters>
                          <Link href="#" color="primary" fontSize={13}>
                            {t('Contact')}
                          </Link>
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            )}
          </>
        )}
      </ModalCustom>
    </>
  )
}

Search.propTypes = {}

export default Search
