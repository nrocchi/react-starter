import {
  API_ROUTE_CREATE_PASSWORD,
  API_ROUTE_FORGOT_PASSWORD,
  API_ROUTE_REFRESH,
  API_ROUTE_RESET_PASSWORD,
  API_ROUTE_SIGNIN,
  API_ROUTE_SIGNUP,
} from 'src/core/constants/Constants'
import axios from 'src/api/axiosAPI'
import {CreatePassword, ForgotPassword, ResetPassword, Sign} from './AuthModel'
import wait from '../utils/wait'

export const postSignIn = async (
  email: string,
  password: string,
): Promise<Sign> => {
  const response = await axios.post<Sign>(API_ROUTE_SIGNIN, {
    email,
    password,
  })
  return response.data
}

export const postSignUp = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  passwordConfirm: string,
): Promise<Sign> => {
  const response = await axios.post<Sign>(API_ROUTE_SIGNUP, {
    firstname,
    lastname,
    email,
    password,
    passwordConfirm,
    role_id: 3,
    status_id: 1,
    company_id: 1,
  })
  await wait(1000)
  return response.data
}

export const postForgotPassword = async (
  email: string,
): Promise<ForgotPassword> => {
  const {data} = await axios.post<ForgotPassword>(API_ROUTE_FORGOT_PASSWORD, {
    email,
  })
  await wait(1000)
  return data
}

export const postResetPassword = async (
  password: string,
  passwordConfirm: string,
  token: string,
): Promise<ResetPassword> => {
  const {data} = await axios.post<ResetPassword>(API_ROUTE_RESET_PASSWORD, {
    password,
    passwordConfirm,
    token,
  })
  await wait(1000)
  return data
}

export const postCreatePassword = async (
  password: string,
  passwordConfirm: string,
  token: string,
): Promise<CreatePassword> => {
  const {data} = await axios.post<CreatePassword>(API_ROUTE_CREATE_PASSWORD, {
    password,
    passwordConfirm,
    token,
  })
  await wait(1000)
  return data
}

export const postRefresh = async (refreshToken: string): Promise<Sign> => {
  const {data} = await axios.post<Sign>(API_ROUTE_REFRESH, {
    refresh: refreshToken,
  })
  return data
}
