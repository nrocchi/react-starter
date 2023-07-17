import {TablePagination} from '@mui/material'
import {useTranslation} from 'react-i18next'
import useGetUsers from 'src/api/users/hooks/useGetUsers'
import {useApp} from 'src/core/store/AppContext'

const UsersPagination = () => {
  const {t} = useTranslation()
  const {users, handleLimitChange, handlePageChange} = useApp()
  const {data, isLoading, isRefetching} = useGetUsers(
    users.page,
    users.limit,
    users.orderBy,
    users.order,
    users.filters,
    users.query,
  )

  return !isLoading ? (
    <TablePagination
      component="div"
      count={data?.total || 0}
      onPageChange={(event, newPage) =>
        handlePageChange(event, newPage, 'users')
      }
      onRowsPerPageChange={(event) =>
        handleLimitChange(event, data?.total, 'users')
      }
      page={users.page}
      rowsPerPage={users.limit}
      rowsPerPageOptions={users.rowsPerPageOptions}
      labelRowsPerPage={t('Rows per page:')}
      labelDisplayedRows={({from, to, count}) =>
        t('{{ from }}-{{ to }} of {{ count}}', {from, to, count})
      }
    />
  ) : null
}

export default UsersPagination
