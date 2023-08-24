import {PeriodData} from 'src/api/periods/PeriodModel'
import {Type} from 'src/api/type/TypeModel'
import {UserData} from 'src/api/users/UsersModel'
import {ButtonSelectOption} from '../ui/buttons/ButtonTypes'

// GLOBAL
export const APP_NAME: string = 'React Starter'
export const BADGE_NAME: string = '1.0'
export const LOGO_URL: string = '/images/favicon.svg'
export const LOGO_WHITE_URL: string = '/images/favicon.svg'
export const FAVICON_URL: string = '/images/favicon.svg'
export const FOOTER_YEAR: string = '2023'
export const FOOTER_LINK: string = 'https://github.com/nrocchi'
export const FOOTER_LINK_TITLE: string = 'Nicolas Rocchi'

// APP INITIAL STATE
// USERS
export const USERS_TABLE_COLUMNS: Array<ButtonSelectOption> = [
  {id: 1, code: 'lastname', name: 'Name'},
  {id: 2, code: 'email', name: 'Email'},
  {id: 3, code: 'role', name: 'Role'},
  {id: 4, code: 'status', name: 'Status'},
]
export const USERS_TABLE_FILTERS: Record<keyof UserData, string | null> = null
export const USERS_TABLE_LIMIT: number = 10
export const USERS_TABLE_QUERY: string = ''
export const USERS_TABLE_ORDER: 'asc' | 'desc' = 'desc'
export const USERS_TABLE_ORDERBY: string = 'updated_at'
export const USERS_TABLE_PAGE: number = 0
export const USERS_TABLE_SELECTED: Array<UserData> = []
export const USERS_TABLE_TOGGLEVIEW: 'table' | 'grid' | null = 'table'
export const USERS_TABLE_ROWSPERPAGE: Array<number> = [5, 10, 25, 50, 100]

// SELECTED
export const SELECTED_PERIOD: PeriodData = {
  code: 'THISYEAR',
  name: 'This year',
}
export const SELECTED_TYPE: Type = {id: 2, code: 'quantity', name: 'Quantity'}

// API ROUTES
export const API_URL: string = process.env.REACT_APP_API_URL

export const GOOGLE_MAP_API_KEY: string = 'YOUR_GOOGLE_MAP_API_KEY_HERE'

export const API_ROUTE_SIGNIN: string = '/auth/signin'
export const API_ROUTE_SIGNUP: string = '/auth/signup'
export const API_ROUTE_CREATE_PASSWORD: string = '/auth/create-password'
export const API_ROUTE_FORGOT_PASSWORD: string = '/auth/forgot-password'
export const API_ROUTE_RESET_PASSWORD: string = '/auth/reset-password'
export const API_ROUTE_REFRESH: string = '/auth/refresh'

export const API_ROUTE_PERIOD: string = '/periods'
export const API_ROUTE_USERS: string = '/users'
export const API_ROUTE_USER_ROLE: string = '/roles'
export const API_ROUTE_USER_STATUS: string = '/statuses'
export const API_ROUTE_NOTIFICATIONS: string = '/notifications'
