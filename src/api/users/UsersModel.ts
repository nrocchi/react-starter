import {FileCustom} from 'src/core/ui/form/FormTypes'
import {VariantType} from 'notistack'

export interface User {
  id?: number
  status: VariantType
  message: string
  datas: UserData
  pagination?: Pagination
  total?: number
}

export interface UserStats {
  status: VariantType
  message: string
  datas: UserStatsData
}

export interface UserStatsData {
  total: UserStatsDataTotal
  active: UserStatsDataTotalPercent
  pending: UserStatsDataTotalPercent
  inactive: UserStatsDataTotalPercent
  superadmin: UserStatsDataTotalPercent
  admin: UserStatsDataTotalPercent
  user: UserStatsDataTotalPercent
  charts: UserStatsDataCharts
  current: UserStatsDataUsers
  previous: UserStatsDataUsers
}

export interface UserStatsDataTotal {
  current: number
  previous: number
  variation: number
}

export interface UserStatsDataTotalPercent {
  total: UserStatsDataTotal
  percent: UserStatsDataTotal
}

export interface UserStatsDataUsers {
  datas: Array<UserData>
  total: number
}

export interface UserStatsDataCharts {
  periods: Array<string>
  datas: UserStatsDataChartsData
}

export interface UserStatsDataChartsData {
  status: UserStatsDataChartsDataStatus
  role: UserStatsDataChartsDataRole
}

export interface UserStatsDataChartsDataStatus {
  active: Array<number>
  pending: Array<number>
  inactive: Array<number>
}

export interface UserStatsDataChartsDataRole {
  superadmin: Array<number>
  admin: Array<number>
  user: Array<number>
}

export interface UserArray {
  status: string
  message: string
  datas: Array<UserData>
  pagination: Pagination
  total: number
}

export interface UserData {
  id: number
  avatar?: string
  email: string
  username: string
  firstname: string
  lastname: string
  job: string
  password?: string
  created_at: string
  updated_at: string
  role: UserRoleData
  status: UserStatusData
  company: UserCompanyData
  files?: Array<FileCustom>
  [key: string]: any
}

export interface Pagination {
  current: number
  total: number
}

export interface UserRole {
  status: string
  message: string
  datas: UserRoleData
  pagination: Pagination
  total: number
}

export interface UserRoleArray {
  status: string
  message: string
  datas: Array<UserRoleData>
  pagination: Pagination
  total: number
}

export interface UserRoleData {
  id: number
  code: 'SUPER_ADMIN' | 'ADMIN' | 'USER'
  name: 'Super administrator' | 'Administrator' | 'User'
  priority: number
  created_at: string
  updated_at: string
}

export interface UserStatus {
  status: string
  message: string
  datas: UserStatusData
  pagination: Pagination
  total: number
}

export interface UserStatusArray {
  status: string
  message: string
  datas: Array<UserStatusData>
  pagination: Pagination
  total: number
}

export interface UserStatusData {
  id: number
  code: 'ACTIVE' | 'INACTIVE' | 'PENDING'
  name: 'Active' | 'Inactive' | 'Pending'
  created_at: string
  updated_at: string
}

export interface UserCompany {
  status: string
  message: string
  datas: UserCompanyData
  pagination: Pagination
  total: number
}

export interface UserCompanyArray {
  status: string
  message: string
  datas: Array<UserCompanyData>
  pagination: Pagination
  total: number
}

export interface UserCompanyData {
  id: number
  name: string
  address: string
  zipcode: string
  city: string
  country: string
  countryCode: string
  latitude: number
  longitude: number
  created_at: string
  updated_at: string
}
