import {Grid} from '@mui/material'
import useGetUsers from 'src/api/users/hooks/useGetUsers'
import {useApp} from 'src/core/store/AppContext'
import {UserData} from 'src/api/users/UsersModel'
import EmptyData from 'src/core/ui/empty/EmptyData'
import TableLoader from 'src/core/ui/table/TableLoader'
import UsersGridItem from './UsersGridItem'

const UsersGrid = () => {
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
    <>
      {isLoading || (isRefetching && users.query !== '') ? (
        <TableLoader />
      ) : !data?.datas.length ? (
        <EmptyData type="no_result" value="user" sx={{py: 10}} />
      ) : (
        <>
          <Grid container spacing={3}>
            {data?.datas.map((user: UserData, index: number) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                <UsersGridItem key={index} user={user} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  )
}

export default UsersGrid
