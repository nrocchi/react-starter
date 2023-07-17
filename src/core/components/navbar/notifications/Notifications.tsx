import {useRef, useState} from 'react'
import {Tooltip, alpha, useTheme, Divider} from '@mui/material'
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone'
import {useTranslation} from 'react-i18next'
import PopoverCustom from 'src/core/ui/popover/PopoverCustom'
import Scrollbar from 'src/core/ui/scrollbar/Scrollbar'
import {BadgeStyled, IconButtonStyled} from '../NavbarStyled'
import NotificationsHeader from './NotificationsHeader'
import NotificationsFooter from './NotificationsFooter'
import NotificationsList from './NotificationsList'
import {useNotifications} from './NotificationsContext'

const Notifications = () => {
  const theme = useTheme()
  const {t} = useTranslation()
  const ref = useRef<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const {count} = useNotifications()

  return (
    <>
      <Tooltip arrow title={t('Notifications')}>
        <BadgeStyled
          badgeContent={count ?? 0}
          className={count > 0 && 'animated'}
          color="success"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}>
          <IconButtonStyled
            sx={{
              background: alpha(theme.colors.warning.main, 0.1),
              '&:hover': {
                background: alpha(theme.colors.warning.main, 0.2),
              },
            }}
            color="warning"
            ref={ref}
            onClick={() => setOpen(true)}>
            <NotificationsActiveTwoToneIcon fontSize="small" />
          </IconButtonStyled>
        </BadgeStyled>
      </Tooltip>
      <PopoverCustom
        onClose={() => setOpen(false)}
        open={open}
        anchorEl={ref.current}>
        <NotificationsHeader />
        <Divider />
        <Scrollbar>
          <NotificationsList />
        </Scrollbar>
        <Divider />
        <NotificationsFooter />
      </PopoverCustom>
    </>
  )
}

export default Notifications
