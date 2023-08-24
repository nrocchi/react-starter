import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import useGetUsers from 'src/api/users/hooks/useGetUsers'
import {visuallyHidden} from '@mui/utils'
import {useApp} from 'src/core/store/AppContext'
import useGetUser from 'src/api/users/hooks/useGetUser'
import {UserData} from 'src/api/users/UsersModel'
import {useAuth} from 'src/core/auth/AuthContext'

const UsersTableHead = () => {
  const {t} = useTranslation()
  const {users, handleSelectAll, handleSort} = useApp()
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

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {currentUser?.datas.role.code !== 'USER' ? (
            <Tooltip arrow placement="bottom" title={t('Select all')}>
              <Checkbox
                color="primary"
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
              />
            </Tooltip>
          ) : null}
        </TableCell>
        {users.columns.find((item) => item.code === 'lastname') ? (
          <TableCell>
            <TableSortLabel
              active={users.orderBy === 'lastname'}
              direction={users.orderBy === 'lastname' ? users.order : 'asc'}
              onClick={handleSort('lastname', 'users')}>
              {t('Name')}
              {users.orderBy === 'lastname' ? (
                <Box component="span" sx={visuallyHidden}>
                  {users.order === 'desc'
                    ? 'sorted descending'
                    : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ) : null}
        {users.columns.find((item) => item.code === 'email') ? (
          <TableCell>
            <TableSortLabel
              active={users.orderBy === 'email'}
              direction={users.orderBy === 'email' ? users.order : 'asc'}
              onClick={handleSort('email', 'users')}>
              {t('Email')}
              {users.orderBy === 'email' ? (
                <Box component="span" sx={visuallyHidden}>
                  {users.order === 'desc'
                    ? 'sorted descending'
                    : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ) : null}
        {users.columns.find((item) => item.code === 'role') ? (
          <TableCell>{t('Role')}</TableCell>
        ) : null}
        {users.columns.find((item) => item.code === 'status') ? (
          <TableCell>{t('Status')}</TableCell>
        ) : null}
        <TableCell>{t('Actions')}</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default UsersTableHead
