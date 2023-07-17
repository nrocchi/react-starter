import {
  Box,
  IconButton,
  Tooltip,
  TooltipProps,
  alpha,
  tooltipClasses,
  styled,
  useTheme,
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import PowerSettingsNewTwoToneIcon from '@mui/icons-material/PowerSettingsNewTwoTone'
import {useNavigate} from 'react-router-dom'
import {memo} from 'react'
import {useAuth} from 'src/core/auth/AuthContext'

const LightTooltip = styled(({className, ...props}: TooltipProps) => (
  <Tooltip {...props} classes={{popper: className}} />
))(({theme}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    boxShadow: theme.shadows[24],
    fontWeight: 'bold',
    fontSize: theme.typography.pxToRem(12),
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100],
  },
}))

const SidebarFooter = () => {
  const {t} = useTranslation()
  const theme = useTheme()
  const {signOut} = useAuth()
  const navigate = useNavigate()

  const handleSignOut = (): void => {
    signOut()
    navigate('/')
  }

  return (
    <Box
      sx={{
        height: 69,
      }}
      display="flex"
      alignItems="center"
      justifyContent="center">
      <LightTooltip placement="top" arrow title={t('Sign Out')}>
        <IconButton
          sx={{
            background: `${theme.colors.alpha.trueWhite[10]}`,
            color: `${theme.colors.alpha.trueWhite[70]}`,
            transition: `${theme.transitions.create(['all'])}`,

            '&:hover': {
              background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`,
              color: `${theme.colors.alpha.trueWhite[100]}`,
            },
          }}
          onClick={handleSignOut}>
          <PowerSettingsNewTwoToneIcon fontSize="small" />
        </IconButton>
      </LightTooltip>
    </Box>
  )
}

export default memo(SidebarFooter)
