import {
  Box,
  Checkbox,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Tooltip,
  useTheme,
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import useGetUsers from 'src/api/users/hooks/useGetUsers'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'
import TableBulkActions from 'src/core/ui/table/TableBulkActions'
import useDeleteUser from 'src/api/users/hooks/useDeleteUser'
import {useApp} from 'src/core/store/AppContext'
import {UserData, UserStatusData} from 'src/api/users/UsersModel'
import useGetUserStatus from 'src/api/users/hooks/useGetUserStatus'
import useGetUser from 'src/api/users/hooks/useGetUser'
import ButtonLoadingIcon from 'src/core/ui/buttons/ButtonLoadingIcon'
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone'
import {useAuth} from 'src/core/auth/AuthContext'

const UsersFilters = () => {
  const {t} = useTranslation()
  const theme = useTheme()
  const {
    dispatch,
    users,
    handleFilters,
    handleQueryChange,
    handleSelectAll,
    handleReset,
  } = useApp()
  const {data} = useGetUsers(
    users.page,
    users.limit,
    users.orderBy,
    users.order,
    users.filters,
    users.query,
  )
  const {user: authUser} = useAuth()
  const {data: currentUser} = useGetUser(authUser?.id)
  const {data: userStatus, isLoading, isError} = useGetUserStatus()

  const mutationDelete = useDeleteUser()

  return (
    <Box display="flex" alignItems="center">
      {users.toggleView === 'grid' && (
        <Tooltip arrow placement="bottom" title={t('Select all')}>
          <Checkbox
            checked={
              !users.selected.length
                ? false
                : currentUser?.datas.role.code === 'ADMIN'
                ? users.selected.length ===
                  data?.datas.filter(
                    (item: UserData) =>
                      item.role.code === 'USER' &&
                      item.id !== currentUser?.datas.id,
                  ).length
                : currentUser?.datas.role.code === 'SUPER_ADMIN'
                ? users.selected.length ===
                  data?.datas.filter(
                    (item: UserData) => item.id !== currentUser?.datas.id,
                  ).length
                : false
            }
            disabled={!data?.datas.length}
            indeterminate={
              !data?.datas.length ||
              (currentUser?.datas.role.code === 'ADMIN'
                ? users.selected.length > 0 &&
                  users.selected.length <
                    data?.datas.filter(
                      (item: UserData) =>
                        item.role.code === 'USER' &&
                        item.id !== currentUser?.datas.id,
                    ).length
                : currentUser?.datas.role.code === 'SUPER_ADMIN'
                ? users.selected.length > 0 &&
                  users.selected.length <
                    data?.datas.filter(
                      (item: UserData) => item.id !== currentUser?.datas.id,
                    ).length
                : false)
            }
            onChange={handleSelectAll(
              currentUser?.datas.role.code === 'ADMIN'
                ? data?.datas.filter(
                    (item: UserData) =>
                      item.role.code === 'USER' &&
                      item.id !== currentUser?.datas.id,
                  )
                : currentUser?.datas.role.code === 'SUPER_ADMIN'
                ? data?.datas.filter(
                    (item: UserData) => item.id !== currentUser?.datas.id,
                  )
                : null,
              'users',
            )}
            sx={{ml: 2}}
          />
        </Tooltip>
      )}
      {users.selected.length > 0 && (
        <TableBulkActions
          data={users.selected}
          mutation={mutationDelete}
          onSuccess={() => {
            dispatch({
              type: 'RESET',
              payload: {
                filters: {
                  role: null,
                  status: null,
                },
                limit: 10,
                query: '',
                order: 'desc',
                orderBy: 'updated_at',
                page: 0,
                selected: [],
                type: 'users',
              },
            })
          }}
          toggleView={users.toggleView}
        />
      )}
      {!users.selected.length && (
        <Box
          display="flex"
          flex={1}
          justifyContent="space-between"
          flexWrap="wrap"
          pt={3}
          pb={1}
          pl={users.toggleView === 'grid' ? 1 : 3}
          pr={3}>
          <Box display="flex" mr={{xs: 0, sm: 2}} mb={2}>
            <TextField
              fullWidth
              size="small"
              onChange={(event) => handleQueryChange(event, 'users')}
              value={users.query}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                ),
              }}
              placeholder={t('search', {value: t('user')})}
            />
          </Box>
          <Box display="flex" alignItems="center" flexWrap="wrap">
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                sx={{
                  bgcolor: theme.colors.alpha.black[10],
                  width: 150,
                  height: 37,
                  borderRadius: theme.general.borderRadiusMd,
                  marginRight: 1,
                  marginBottom: 2,
                }}
              />
            ) : !isError ? (
              <Box width={150} mb={2} mr={1}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>{t('Status')}</InputLabel>
                  <Select
                    size="small"
                    value={users.filters?.status || 'all'}
                    onChange={handleFilters('status', 'users')}
                    label={t('Status')}
                    autoWidth>
                    <MenuItem value="all">{t('All')}</MenuItem>
                    {userStatus?.datas.map(
                      (item: UserStatusData, index: number) => (
                        <MenuItem key={index} value={item.id}>
                          {t(item.name)}
                        </MenuItem>
                      ),
                    )}
                  </Select>
                </FormControl>
              </Box>
            ) : null}
            <ButtonLoadingIcon
              color="secondary"
              icon={<ClearTwoToneIcon />}
              loading={false}
              sx={{mb: 2}}
              onClick={() => {
                handleReset('users')
              }}
              tooltip={t('Reset filters')}
            />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default UsersFilters
