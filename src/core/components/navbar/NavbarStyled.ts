import {
  Typography,
  styled,
  alpha,
  IconButton,
  Switch,
  Badge,
  Avatar,
  OutlinedInput,
  Box,
} from '@mui/material'
import {NavbarStyledProps} from './NavbarTypes'

export const NavbarStyled = styled(Box)<NavbarStyledProps>(
  ({theme, sidebar, backgroundColor, backgroundGradient}) => ({
    position: 'fixed',
    right: 0,
    width: '100%',
    justifyContent: 'space-between',
    background: backgroundGradient,
    backgroundColor: backgroundColor || alpha(theme.header.background, 0.9),
    backdropFilter: 'blur(8px)',
    boxShadow: theme.header.boxShadow,
    zIndex: 1301,
    padding: theme.spacing(0, 3),
    [theme.breakpoints.up('lg')]: {
      left: sidebar ? theme.sidebar.width : 0,
      width: 'auto',
    },
  }),
)

export const DarkModeStyled = styled(Switch)(({theme}) => ({
  width: 46,
  height: theme.header.heightIcon,
  padding: theme.spacing(1, 0, 1, 0),
  '& .MuiSwitch-switchBase': {
    margin: '1px 0',
    padding: 0,
    transform: 'translateX(0px)',
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.primary.main,
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 0.5,
    },
    '&.Mui-checked': {
      transform: 'translateX(14px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
  },
}))

export const LanguageTitleStyled = styled(Typography)(({theme}) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.secondary.main,
  display: 'block',
  padding: theme.spacing(2, 2, 0),
}))

export const ImageStyled = styled('img')(() => ({
  width: 20,
}))

export const IconButtonStyled = styled(IconButton)(({theme, color}) => ({
  width: theme.header.heightIcon,
  height: theme.header.heightIcon,
  marginLeft: theme.spacing(1),
  padding: theme.spacing(0.8),
  background: alpha(theme.colors.primary.main, 0.1),
  transition: theme.transitions.create(['background']),
  color: color || theme.colors.primary.main,
  '&:hover': {
    background: alpha(theme.colors.primary.main, 0.2),
  },
}))

export const BadgeStyled = styled(Badge)(({theme, className}) => ({
  '& .MuiBadge-badge': {
    animation: className === 'animated' ? 'pulse 1s infinite' : 'none',
    transition:
      className === 'animated' ? theme.transitions.create(['all']) : 'none',
    transform: 'scale(1) translate(0, 0)',
    top: -7,
    right: -5,
  },
  '& .MuiBadge-dot': {
    animation: 'none',
    transition: 'none',
    transform: 'scale(1) translate(50%, 50%)',
    top: 'initial',
    right: 2,
    bottom: 4,
  },
}))

export const OnlineBadgeStyled = styled(Badge)(({theme}) => ({
  '& .MuiBadge-badge': {
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    backgroundColor: theme.colors.success.main,
    color: theme.colors.success.main,

    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
    },
  },
}))

export const AvatarGradientStyled = styled(Avatar)(({theme}) => ({
  background: theme.colors.gradients.primary,
  color: theme.colors.alpha.trueWhite[100],
}))

export const OutlinedInputStyled = styled(OutlinedInput)(({theme}) => ({
  backgroundColor: theme.colors.alpha.white[100],

  '& .MuiOutlinedInput-notchedOutline': {
    border: 0,
  },
}))
