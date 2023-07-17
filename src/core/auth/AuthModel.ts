import {VariantType} from 'notistack'
import {UserData} from 'src/api/users/UsersModel'

export interface Sign {
  message: string
  status: VariantType
  token: string
  refresh: string
  user: UserData
}

export interface ForgotPassword {
  message: string
  status: VariantType
}

export interface ResetPassword {
  message: string
  status: VariantType
  user: UserData
}

export interface CreatePassword {
  message: string
  status: VariantType
  user: UserData
}

export interface Refresh {
  refresh: string
}
