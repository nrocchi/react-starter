import {Tabs, Tab} from '@mui/material'
import {useTranslation} from 'react-i18next'
import useGetUserRoles from 'src/api/users/hooks/useGetUserRoles'
import {useApp} from 'src/core/store/AppContext'
import {UserRoleData} from 'src/api/users/UsersModel'
import useGetUser from 'src/api/users/hooks/useGetUser'
import {useAuth} from 'src/core/auth/AuthContext'

const UsersTabs = () => {
  const {t} = useTranslation()
  const {users, handleTabsChange} = useApp()
  const {data} = useGetUserRoles()
  const {user: authUser} = useAuth()
  const {data: currentUser} = useGetUser(authUser?.id)

  return (
    <Tabs
      onChange={handleTabsChange('role', 'users')}
      textColor="secondary"
      value={users.filters?.role || 'all'}
      variant="scrollable"
      scrollButtons="auto"
      sx={{mb: 3, mr: 1}}
      allowScrollButtonsMobile>
      <Tab value="all" label={t('All')} />
      {data?.datas.map((item: UserRoleData, index: number) =>
        item.priority >= currentUser?.datas.role.priority ? (
          <Tab key={index} value={item.id} label={t(item.name)} />
        ) : null,
      )}
    </Tabs>
  )
}

export default UsersTabs
