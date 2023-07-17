import axios, {AxiosError} from 'axios'
import {t} from 'i18next'
import {postRefresh} from 'src/core/auth/AuthAPI'
import {API_URL} from 'src/core/constants/Constants'

const instance = axios.create({
  baseURL: API_URL,
})

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      }
    }

    return config
  },
  (error: any) => Promise.reject(error),
)

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config

    // REFRESH AUTH : TOKEN EXPIRED AND REFRESH TOKEN VALID
    if (error.response.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem('refresh_token')
      originalRequest._retry = true

      const result = await postRefresh(refreshToken)

      localStorage.setItem('token', result.token)
      localStorage.setItem('refresh_token', result.refresh)
      axios.defaults.headers.common.Authorization = `Bearer ${result.token}`

      return instance(originalRequest)
    }

    // REFRESH TOKEN EXPIRED
    if (error.response.status === 403) {
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      delete axios.defaults.headers.common.Authorization
      window.location.href = '/'
    }

    // NOT FOUND ERROR
    if (error.response.status === 404) {
      error.response.data.message = t('A network error is occured.')
    }

    // SERVER ERROR
    if (error.response.status === 500) {
      error.response.data.message = t('A server error is occured.')
    }

    return Promise.reject(error.response)
  },
)

export default instance
