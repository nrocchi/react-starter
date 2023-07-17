import {Box, alpha, styled} from '@mui/material'
import {FooterStyledProps} from './FooterTypes'

export const FooterStyled = styled(Box)<FooterStyledProps>(
  ({theme, backgroundColor, backgroundGradient}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    background: backgroundGradient,
    backgroundColor: backgroundColor || alpha(theme.header.background, 0.9),
    backdropFilter: 'blur(8px)',
    padding: theme.spacing(2, 4),
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
  }),
)
