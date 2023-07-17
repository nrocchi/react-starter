import {FileCustom} from 'src/core/ui/form/FormTypes'

export interface FormValues {
  firstname: string
  lastname: string
  email?: string
  role?: string
  active: boolean | null
  avatar?: string
  files?: Array<FileCustom>
  password?: string
  passwordConfirm?: string
}
