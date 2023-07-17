import {Dispatch, ReactNode} from 'react'
import {UserData} from 'src/api/users/UsersModel'

export interface AuthState {
  isInitialized: boolean
  isAuthenticated: boolean
  user: UserData | null
}

export interface AuthContextValue extends AuthState {
  dispatch: Dispatch<AuthAction>
  signIn: (email: string, password: string) => Promise<void>
  signUp: (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    passwordConfirm: string,
    avatar?: string,
  ) => Promise<boolean>
  signOut: () => void
  setUser: (user: UserData) => void
}

export interface AuthProviderProps {
  children: ReactNode
}

export type InitializeAction = {
  type: 'INITIALIZE'
  payload: {
    isAuthenticated: boolean
    user: UserData | null
  }
}

export type SignInAction = {
  type: 'SIGNIN'
  payload: {
    isAuthenticated?: boolean
    user?: UserData | null
  }
}

export type SignUpAction = {
  type: 'SIGNUP'
  payload: {
    isAuthenticated?: boolean
    user?: UserData | null
  }
}

export type SetUserAction = {
  type: 'SETUSER'
  payload: {
    user: UserData | null
  }
}

export type SignOutAction = {
  type: 'SIGNOUT'
}

export type AuthAction =
  | InitializeAction
  | SignInAction
  | SignUpAction
  | SignOutAction
  | SetUserAction
