import {Table, TableContainer} from '@mui/material'
import UsersTableHead from './UsersTableHead'
import UsersTableBody from './UsersTableBody'

const UsersTable = () => (
  <TableContainer>
    <Table>
      <UsersTableHead />
      <UsersTableBody />
    </Table>
  </TableContainer>
)

export default UsersTable
