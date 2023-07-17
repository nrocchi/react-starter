import {useSnackbar} from 'notistack'
import {useTranslation} from 'react-i18next'
import {useMutation, useQueryClient} from 'react-query'
import {AxiosResponse} from 'axios'
import usePostNotification from 'src/api/notifications/hooks/usePostNotification'
import {useAuth} from 'src/core/auth/AuthContext'
import {FileCustom} from 'src/core/ui/form/FormTypes'
import {UserRoleData} from 'src/api/users/UsersModel'
import _ from 'lodash'
import {User} from '../UsersModel'
import {getUser, patchUser} from '../UsersAPI'
import useGetUser from './useGetUser'

export default function usePatchUser() {
  const {t} = useTranslation()
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()
  const postNotification = usePostNotification()
  const {user: authUser, setUser} = useAuth()
  const {data: currentUser} = useGetUser(authUser?.id)
  let userToUpdate: User

  return useMutation(
    async ({
      id,
      firstname,
      lastname,
      email,
      avatar,
      role,
      companyId,
      files,
      active,
    }: {
      id: number
      firstname: string
      lastname: string
      email: string
      avatar?: string
      role?: UserRoleData
      companyId?: number
      files?: Array<FileCustom>
      active?: boolean | null
    }) => {
      userToUpdate = await getUser(id)
      return patchUser(
        id,
        firstname,
        lastname,
        email,
        avatar,
        role,
        companyId,
        files,
        active,
      )
    },
    {
      onSuccess: (data: User, variables) => {
        queryClient.invalidateQueries('users')
        queryClient.invalidateQueries('user')

        // Handle edit user
        const updatedWithoutProperties = {...data.datas}
        const updateWithoutProperties = {...userToUpdate.datas}
        delete updatedWithoutProperties.updated_at
        delete updatedWithoutProperties.status
        delete updateWithoutProperties.updated_at
        delete updateWithoutProperties.status

        console.log('updateWithoutProperties:', updateWithoutProperties)
        console.log('updatedWithoutProperties:', updatedWithoutProperties)
        if (!_.isEqual(updatedWithoutProperties, updateWithoutProperties)) {
          enqueueSnackbar(
            currentUser.datas.id === data.datas.id
              ? t('Your profile has been edited!')
              : t('The user {{ value }} has been edited!', {
                  value: `${data.datas.firstname} ${data.datas.lastname}`,
                }),
            {
              variant: data.status,
            },
          )

          // Send notifications if target !== sender (EDIT OWN PROFILE)
          if (data.datas.id !== currentUser.datas.id) {
            postNotification.mutate({
              category: 'role',
              type: 'patch_user',
              target: data.datas,
              sender: currentUser.datas,
              content: 'notification_role',
            })

            postNotification.mutate({
              category: 'user',
              type: 'patch_user',
              target: data.datas,
              sender: currentUser.datas,
              content: 'notification_user',
            })
          }
        }

        // Handle enable user status
        if (
          (userToUpdate.datas.status.code === 'INACTIVE' ||
            userToUpdate.datas.status.code === 'PENDING') &&
          data.datas.status.code === 'ACTIVE'
        ) {
          enqueueSnackbar(
            t('The user {{ value }} has been enabled!', {
              value: `${data.datas.firstname} ${data.datas.lastname}`,
            }),
            {
              variant: 'success',
            },
          )

          postNotification.mutate({
            category: 'role',
            type: 'enable_user',
            target: data.datas,
            sender: currentUser.datas,
            content: 'notification_role',
          })
        }

        // Handle disable user status
        if (
          userToUpdate.datas.status.code === 'ACTIVE' &&
          data.datas.status.code === 'INACTIVE'
        ) {
          enqueueSnackbar(
            t('The user {{ value }} has been disabled!', {
              value: `${data.datas.firstname} ${data.datas.lastname}`,
            }),
            {
              variant: 'warning',
            },
          )

          postNotification.mutate({
            category: 'role',
            type: 'disable_user',
            target: data.datas,
            sender: currentUser.datas,
            content: 'notification_role',
          })
        }

        // Update currentUser in AuthContext
        if (currentUser.datas.id === data.datas.id) {
          setUser(data.datas)
        }
      },
      onError: (error: AxiosResponse) => {
        if (error.data) {
          if (Array.isArray(error.data.message)) {
            error.data.message.map((item: string) =>
              enqueueSnackbar(t(item), {
                variant: error.data?.status,
              }),
            )
          } else {
            enqueueSnackbar(t(error.data?.message), {
              variant: error.data?.status,
            })
          }
        } else {
          enqueueSnackbar(t('A server error is occured.'), {
            variant: 'error',
          })
        }
      },
    },
  )
}
