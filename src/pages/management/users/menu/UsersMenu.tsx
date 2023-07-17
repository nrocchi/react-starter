import {Box, Skeleton, useTheme} from '@mui/material'
import {useApp} from 'src/core/store/AppContext'
import useGetUserRoles from 'src/api/users/hooks/useGetUserRoles'
import ButtonToggle from 'src/core/ui/buttons/ButtonToggle'
import useGetUsers from 'src/api/users/hooks/useGetUsers'
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
              width: 95,
              height: 48,
              borderRadius: theme.general.borderRadiusMd,
            }}
          />
        </Box>
      ) : (
        <ButtonToggle type="users" state={users} />
      )}
    </Box>
  )
}
export default UsersMenu
