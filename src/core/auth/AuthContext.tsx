import {createContext, useEffect, useReducer, useContext} from 'react'
import PropTypes from 'prop-types'
import {useSnackbar} from 'notistack'
import {useTranslation} from 'react-i18next'
import axios from 'src/api/axiosAPI'
import {postRefresh, postSignIn, postSignUp} from 'src/core/auth/AuthAPI'
import {getUser} from 'src/api/users/UsersAPI'
import jwtDecode, {JwtPayload} from 'jwt-decode'
import {User, UserData} from 'src/api/users/UsersModel'
import usePostNotification from 'src/api/notifications/hooks/usePostNotification'
import {
  AuthState,
  AuthContextValue,
  AuthProviderProps,
} from './AuthContextTypes'
import AuthReducer from './AuthReducer'

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
}

export const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  dispatch: () => {},
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(false),
  signOut: () => {},
  setUser: () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}: AuthProviderProps) => {
  const {t} = useTranslation()
  const {enqueueSnackbar} = useSnackbar()
  const [state, dispatch] = useReducer(AuthReducer, initialState)
  const postNotification = usePostNotification()

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        const token = localStorage.getItem('token')
        const refreshToken = localStorage.getItem('refresh_token')

        if (token) {
          // CHECK IF TOKEN IS EXPIRED
          const {exp: expiration}: JwtPayload = jwtDecode(token)

          if (expiration * 1000 >= new Date().getTime()) {
            // TOKEN NOT EXPIRED
            setToken(token)
            setRefreshToken(refreshToken)

            const {sub}: {sub: number} = jwtDecode(token)

            const user: User = await getUser(sub)

            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: true,
                user: user.datas,
              },
            })
          } else {
            // TOKEN EXPIRED
            setToken(null)

            if (refreshToken) {
              const {exp: expirationRefresh}: JwtPayload =
                jwtDecode(refreshToken)

              if (expirationRefresh * 1000 >= new Date().getTime()) {
                // REFRESH TOKEN NOT EXPIRED
                const result = await postRefresh(refreshToken)

                setToken(result.token)
                setRefreshToken(result.refresh)

                const {sub}: {sub: number} = jwtDecode(result.token)

                const user: User = await getUser(sub)

                dispatch({
                  type: 'INITIALIZE',
                  payload: {
                    isAuthenticated: true,
                    user: user.datas,
                  },
                })

                enqueueSnackbar(t(result.message), {
                  variant: result.status,
                })
              } else {
                // REFRESH TOKEN EXPIRED
                dispatch({
                  type: 'INITIALIZE',
                  payload: {
                    isAuthenticated: false,
                    user: null,
                  },
                })

                enqueueSnackbar(t('The auth token is expired.'), {
                  variant: 'error',
                })
              }
            }
          }
        } else {
          // TOKEN MISSING
          setToken(null)
          setRefreshToken(null)

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          })
        }
      } catch (error) {
        // INIT ERROR
        setToken(null)
        setRefreshToken(null)

        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })

        if (error.data) {
          enqueueSnackbar(t(error.data?.message), {
            variant: error.data?.status,
          })
        } else {
          enqueueSnackbar(t('A server error is occured.'), {
            variant: 'error',
          })
        }
      }
    }
    initialize()
  }, [])

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const {token, refresh, user, status, message} = await postSignIn(
        email,
        password,
      )

      setToken(token)
      setRefreshToken(refresh)

      dispatch({
        type: 'SIGNIN',
        payload: {
          isAuthenticated: true,
          user,
        },
      })

      enqueueSnackbar(t(message), {
        variant: status,
      })
    } catch (error) {
      setToken(null)
      setRefreshToken(null)

      dispatch({
        type: 'SIGNIN',
        payload: {
          user: null,
          isAuthenticated: false,
        },
      })

      if (error.data) {
        enqueueSnackbar(t(error.data?.message), {
          variant: error.data?.status,
        })
      } else {
        enqueueSnackbar(t('A server error is occured.'), {
          variant: 'error',
        })
      }
    }
  }

  const signUp = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    passwordConfirm: string,
  ): Promise<boolean> => {
    try {
      const {token, refresh, user, status, message} = await postSignUp(
        firstname,
        lastname,
        email,
        password,
        passwordConfirm,
      )

      setToken(token)
      setRefreshToken(refresh)

      dispatch({
        type: 'SIGNUP',
        payload: {
          isAuthenticated: true,
          user,
        },
      })

      enqueueSnackbar(t(message), {
        variant: status,
      })

      postNotification.mutate({
        category: 'role',
        type: 'signup',
        target: user,
        sender: null,
        content: 'notification_role',
      })

      return true
    } catch (error) {
      setToken(null)
      setRefreshToken(null)

      dispatch({
        type: 'SIGNUP',
        payload: {
          user: null,
          isAuthenticated: false,
        },
      })

      if (error.data) {
        enqueueSnackbar(t(error.data?.message), {
          variant: error.data?.status,
        })
      } else {
        enqueueSnackbar(t('A server error is occured.'), {
          variant: 'error',
        })
      }

      return false
    }
  }

  const signOut = (): void => {
    setToken(null)
    setRefreshToken(null)

    dispatch({
      type: 'SIGNOUT',
    })
    enqueueSnackbar(t('You are disconnected!'), {
      variant: 'warning',
    })
  }

  const setUser = (user: UserData): void => {
    dispatch({
      type: 'SETUSER',
      payload: {
        user,
      },
    })
  }

  const setToken = (token: string | null): void => {
    if (token) {
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    }
  }

  const setRefreshToken = (refreshToken: string | null): void => {
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken)
    } else {
      localStorage.removeItem('refresh_token')
    }
  }

  const contextValues = {
    ...state,
    dispatch,
    signIn,
    signUp,
    signOut,
    setUser,
  }

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
