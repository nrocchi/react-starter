import {TableBody, TableCell, TableRow} from '@mui/material'
import useGetUsers from 'src/api/users/hooks/useGetUsers'
import {useApp} from 'src/core/store/AppContext'
import {UserData} from 'src/api/users/UsersModel'
import EmptyData from 'src/core/ui/empty/EmptyData'
import TableLoader from 'src/core/ui/table/TableLoader'
import UsersTableItem from './UsersTableItem'

const UsersTableBody = () => {
  const {users} = useApp()
  const {data, isLoading, isRefetching} = useGetUsers(
    users.page,
    users.limit,
    users.orderBy,
    users.order,
    users.filters,
    users.query,
  )

  return (
    <TableBody>
      {isLoading || (isRefetching && users.query !== '') ? (
        <TableRow>
          <TableCell colSpan={7}>
            <TableLoader />
          </TableCell>
        </TableRow>
      ) : !data?.datas.length ? (
        <TableRow>
          <TableCell colSpan={7}>
            <EmptyData type="no_result" value="user" sx={{py: 10}} />
          </TableCell>
        </TableRow>
      ) : (
        <>
          {data?.datas.map((user: UserData, index: number) => (
            <UsersTableItem key={index} user={user} />
          ))}
        </>
      )}
    </TableBody>
  )
}

export default UsersTableBody
