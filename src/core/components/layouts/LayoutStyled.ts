import {Box, styled} from '@mui/material'
import {LayoutStyledProps} from './LayoutsTypes'

export const LayoutPublicStyled = styled(Box)<LayoutStyledProps>(
  ({
    theme,
    bgcolor,
    gradient,
    logo,
    search,
    megamenu,
    darkmode,
    notifications,
    messenger,
    language,
    userbox,
    toggle,
  }) => ({
    background: gradient,
    backgroundColor: bgcolor,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    paddingTop: `calc(${
      logo ? `${theme.header.heightLogo} + ${theme.spacing(1.725)}` : '0px'
    }
      ${
        search || megamenu
          ? ` + ${theme.header.heightIcon} + ${theme.spacing(2)}`
          : ' + 0px'
      }
      ${
        userbox || darkmode || notifications || messenger || language || toggle
          ? ` + ${theme.header.heightIcon} + ${theme.spacing(2)}`
          : ' + 0px'
      }
      + ${theme.spacing(3)})`,
    [theme.breakpoints.up('sm')]: {
      paddingTop: `calc(${
        logo
          ? `${theme.header.heightLogo} + ${theme.spacing(3)}`
          : userbox ||
            search ||
            megamenu ||
            darkmode ||
            notifications ||
            messenger ||
            language ||
            toggle
          ? `${theme.header.heightIcon} + ${theme.spacing(4)}`
          : '0px'
      }
      + ${theme.spacing(3)})`,
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: `calc(${
        userbox
          ? `${theme.header.heightLogo} + ${theme.spacing(
              2.375,
            )} + ${theme.spacing(4)}`
          : logo
          ? `${theme.header.heightLogo} + ${theme.spacing(3)}`
          : search ||
            megamenu ||
            darkmode ||
            notifications ||
            messenger ||
            language ||
            toggle
          ? `${theme.header.heightIcon} + ${theme.spacing(4)}`
          : '0px'
      }
      + ${theme.spacing(3)})`,
    },
    marginBottom: theme.spacing(3),
  }),
)

export const LayoutDashboardStyled = styled(Box)<LayoutStyledProps>(
  ({
    theme,
    bgcolor,
    gradient,
    logo,
    search,
    megamenu,
    darkmode,
    notifications,
    messenger,
    language,
    userbox,
    toggle,
  }) => ({
    background: gradient,
    backgroundColor: bgcolor,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingTop: `calc(${
      logo ? `${theme.header.heightLogo} + ${theme.spacing(1.725)}` : '0px'
    }
      ${
        search || megamenu
          ? ` + ${theme.header.heightIcon} + ${theme.spacing(2)}`
          : ' + 0px'
      }
      ${
        userbox || darkmode || notifications || messenger || language || toggle
          ? ` + ${theme.header.heightIcon} + ${theme.spacing(2)}`
          : ' + 0px'
      }
      + ${theme.spacing(3)})`,
    [theme.breakpoints.up('sm')]: {
      paddingTop: `calc(${
        logo
          ? `${theme.header.heightLogo} + ${theme.spacing(3)}`
          : userbox ||
            search ||
            megamenu ||
            darkmode ||
            notifications ||
            messenger ||
            language ||
            toggle
          ? `${theme.header.heightIcon} + ${theme.spacing(4)}`
          : '0px'
      }
      + ${theme.spacing(3)})`,
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: `calc(${
        userbox
          ? `${theme.header.heightLogo} + ${theme.spacing(
              2.375,
            )} + ${theme.spacing(4)}`
          : logo
          ? `${theme.header.heightLogo} + ${theme.spacing(3)}`
          : search ||
            megamenu ||
            darkmode ||
            notifications ||
            messenger ||
            language ||
            toggle
          ? `${theme.header.heightIcon} + ${theme.spacing(4)}`
          : '0px'
      }
      + ${theme.spacing(3)})`,
    },
    marginBottom: theme.spacing(3),
  }),
)
