import axios from 'src/api/axiosAPI'
import {
  API_ROUTE_USERS,
  API_ROUTE_USER_ROLE,
} from 'src/core/constants/Constants'
import {FileCustom} from 'src/core/ui/form/FormTypes'
import wait from 'src/core/utils/wait'
import {
  User,
  UserArray,
  UserData,
  UserRoleArray,
  UserStatusArray,
  UserRoleData,
  UserStats,
} from './UsersModel'
import {API_ROUTE_USER_STATUS} from '../../core/constants/Constants'
import {PeriodData} from '../periods/PeriodModel'

export const getUsers = async (
  page: number,
  limit: number,
  orderBy: keyof UserData,
  order: 'asc' | 'desc',
  filters: Record<keyof UserData, string | null>,
  query: string,
): Promise<UserArray> => {
  const {data} = await axios.get<UserArray>(
    `${API_ROUTE_USERS}?page=${page + 1}&limit=${limit}${
      filters?.role ? `&role_id=${filters.role}` : ''
    }${filters?.status ? `&status_id=${filters.status}` : ''}${
      query ? `&search=${query}` : ''
    }${orderBy ? `&order=${orderBy}&orderby=${order}` : ''}`,
  )
  await wait(1000)
  return data
}

export const getUserStats = async (period: PeriodData): Promise<UserStats> => {
  const {data} = await axios.get<UserStats>(
    `${API_ROUTE_USERS}/stats?period=${period.code}`,
  )
  await wait(1000)
  return data
}

export const getUser = async (id: number): Promise<User> => {
  const {data} = await axios.get<User>(`${API_ROUTE_USERS}/${id}`, {
    data: id,
  })
  return data
}

export const getUserRoles = async (): Promise<UserRoleArray> => {
  const {data} = await axios.get<UserRoleArray>(API_ROUTE_USER_ROLE)
  return data
}

export const getUserStatus = async (): Promise<UserStatusArray> => {
  const {data} = await axios.get<UserStatusArray>(API_ROUTE_USER_STATUS)
  return data
}

export const postUser = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  passwordConfirm: string,
  role: UserRoleData,
  avatar?: string,
  companyId?: number,
  files?: Array<FileCustom>,
): Promise<User> => {
  const {data} = await axios.post<User>(API_ROUTE_USERS, {
    firstname,
    lastname,
    email,
    password,
    passwordConfirm,
    role_id: role.id,
    avatar,
    status_id: 1,
    company_id: 1,
    files,
  })
  await wait(1000)
  return data
}

export const postInviteUser = async (
  firstname: string,
  lastname: string,
  email: string,
  role: UserRoleData,
  avatar?: string,
  companyId?: number,
  files?: Array<FileCustom>,
): Promise<User> => {
  const {data} = await axios.post<User>(`${API_ROUTE_USERS}/invite`, {
    firstname,
    lastname,
    email,
    role_id: role.id,
    avatar,
    status_id: 3,
    company_id: 1,
    files,
  })
  await wait(1000)
  return data
}

export const patchUser = async (
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  avatar?: string,
  role?: UserRoleData,
  companyId?: number,
  files?: Array<FileCustom>,
  active?: boolean,
): Promise<User> => {
  const {data} = await axios.put<User>(`${API_ROUTE_USERS}/${id}`, {
    id,
    firstname,
    lastname,
    email,
    avatar,
    role_id: role.id,
    status_id: active ? 1 : 2,
    files,
  })
  await wait(1000)
  return data
}

export const patchUserPassword = async (
  id: number,
  password: string,
  newPassword: string,
  passwordConfirm: string,
): Promise<User> => {
  const {data} = await axios.put<User>(`${API_ROUTE_USERS}/${id}/password`, {
    id,
    password,
    newPassword,
    passwordConfirm,
  })
  await wait(1000)
  return data
}

export const deleteUser = async (user: UserData): Promise<User> => {
  const {data} = await axios.delete<User>(`${API_ROUTE_USERS}/${user.id}`, {
    data: {
      id: user.id,
    },
  })
  await wait(1000)
  return data
}
