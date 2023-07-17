import {
  AuthState,
  AuthAction,
  InitializeAction,
  SignInAction,
  SignOutAction,
  SetUserAction,
  SignUpAction,
} from './AuthContextTypes'

const handlers: Record<
  string,
  (state: AuthState, action: AuthAction) => AuthState
> = {
  INITIALIZE: (state: AuthState, action: InitializeAction): AuthState => {
    const {isAuthenticated, user} = action.payload

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    }
  },
  SIGNIN: (state: AuthState, action: SignInAction): AuthState => {
    const {user, isAuthenticated} = action.payload

    return {
      ...state,
      isAuthenticated,
      user,
    }
  },
  SIGNUP: (state: AuthState, action: SignUpAction): AuthState => {
    const {user, isAuthenticated} = action.payload

    return {
      ...state,
      isAuthenticated,
      user,
    }
  },
  SIGNOUT: (state: AuthState, action: SignOutAction): AuthState => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  SETUSER: (state: AuthState, action: SetUserAction): AuthState => {
    const {user} = action.payload

    return {
      ...state,
      user,
    }
  },
}

const AuthReducer = (state: AuthState, action: AuthAction): AuthState =>
  handlers[action.type] ? handlers[action.type](state, action) : state

export default AuthReducer
