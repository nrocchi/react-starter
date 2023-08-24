import {Box, Skeleton, useTheme} from '@mui/material'
import {useApp} from 'src/core/store/AppContext'
import useGetUserRoles from 'src/api/users/hooks/useGetUserRoles'
import ButtonToggle from 'src/core/ui/buttons/ButtonToggle'
import useGetUsers from 'src/api/users/hooks/useGetUsers'
import {USERS_TABLE_COLUMNS} from 'src/core/constants/Constants'
import ButtonColumns from 'src/core/ui/buttons/ButtonColumns'
import UsersTabs from './UsersTabs'

const UsersMenu = () => {
  const theme = useTheme()
  const {users} = useApp()
  const {isLoading: isLoadingUserRoles, isError: isErrorUserRoles} =
    useGetUserRoles()
  const {isLoading: isLoadingUsers} = useGetUsers(
    users.page,
    users.limit,
    users.orderBy,
    users.order,
    users.filters,
    users.query,
  )

  return (
    <Box
      display={{xs: 'block', sm: 'flex'}}
      alignItems="center"
      flexDirection={{xs: 'column', sm: 'row'}}
      justifyContent={
        !isErrorUserRoles ? {xs: 'flex-start', sm: 'space-between'} : 'flex-end'
      }
      flexWrap="wrap">
      {isLoadingUserRoles ? (
        <Skeleton
          variant="rectangular"
          sx={{
            bgcolor: theme.colors.alpha.black[10],
            width: {xs: '100%', sm: 512},
            height: 38,
            borderRadius: theme.general.borderRadiusMd,
            marginRight: 1,
            marginBottom: 3,
          }}
        />
      ) : !isErrorUserRoles ? (
        <UsersTabs />
      ) : null}
      {isLoadingUsers ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent={
            !isErrorUserRoles
              ? {xs: 'flex-start', sm: 'space-between'}
              : 'flex-start'
          }
          mb={3}>
          <Skeleton
            variant="rectangular"
            sx={{
              bgcolor: theme.colors.alpha.black[10],
              width: 48,
              height: 48,
              borderRadius: theme.general.borderRadiusMd,
              mr: 1,
            }}
          />
          <Skeleton
            variant="rectangular"
            sx={{
              bgcolor: theme.colors.alpha.black[10],
              width: 95,
              height: 48,
              borderRadius: theme.general.borderRadiusMd,
            }}
          />
        </Box>
      ) : (
        <Box display="flex" alignItems="center" mb={3}>
          <ButtonColumns
            datas={USERS_TABLE_COLUMNS}
            state={users}
            type="users"
          />
          <ButtonToggle type="users" state={users} />
        </Box>
      )}
    </Box>
  )
}
export default UsersMenu
