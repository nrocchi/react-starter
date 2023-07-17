import {styled, LinearProgress, linearProgressClasses} from '@mui/material'
import {LinearProgressStyledProps} from './ProgressTypes'

export const LinearProgressStyled = styled(
  LinearProgress,
)<LinearProgressStyledProps>(({theme, color, barColor, gradient}) => ({
  height: 12,
  borderRadius: theme.general.borderRadiusSm,
  [`&.${linearProgressClasses.root}`]: {
    backgroundColor: theme.colors.alpha.black[10],
    boxShadow: `inset 0 1px 2px ${theme.colors.alpha.black[10]}`,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: theme.general.borderRadiusSm,
    background: gradient,
    backgroundColor: barColor || color || theme.colors.primary.main,
  },
}))
