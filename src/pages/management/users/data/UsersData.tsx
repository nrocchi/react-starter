import {Card, Divider} from '@mui/material'
import {useApp} from 'src/core/store/AppContext'
import TableEmptyView from 'src/core/ui/table/TableEmptyView'
import UsersFilters from './UsersFilters'
import UsersTable from './table/UsersTable'
import UsersGrid from './grid/UsersGrid'
import UsersPagination from './UsersPagination'

const UsersData = () => {
  const {users} = useApp()

  return (
    <>
      {users.toggleView === 'table' ? (
        <Card>
          <UsersFilters />
          <Divider />
          <UsersTable />
          <UsersPagination />
        </Card>
      ) : users.toggleView === 'grid' ? (
        <>
          <Card
            sx={{
              mb: 3,
            }}>
            <UsersFilters />
          </Card>
          <UsersGrid />
          <Card
            sx={{
              mt: 3,
            }}>
            <UsersPagination />
          </Card>
        </>
      ) : (
        <TableEmptyView type="users" />
      )}
    </>
  )
}

export default UsersData
