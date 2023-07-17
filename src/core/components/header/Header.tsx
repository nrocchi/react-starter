import PropTypes from 'prop-types'
import {
  Grid,
  Box,
  Typography,
  Avatar,
  useTheme,
  alpha,
  lighten,
  Tooltip,
  Button,
} from '@mui/material'
import {Link as RouterLink} from 'react-router-dom'
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone'
import {t} from 'i18next'
import {HeaderProps} from './HeaderTypes'

const Header = ({
  back = false,
  button,
  color = 'primary',
  icon,
  sx,
  subtitle,
  title,
  to = -1,
}: HeaderProps) => {
  const theme = useTheme()

  return (
    <Box
      p={{xs: 2, sm: 4}}
      pb={{xs: 0, sm: 2}}
      mb={3}
      bgcolor={theme.colors.alpha.white[50]}
      sx={{
        boxShadow: theme.headerPage.boxShadow,
        ...sx,
      }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box
            display="flex"
            justifyContent={{xs: 'space-between', sm: 'flex-start'}}
            alignItems="center"
            flexWrap="wrap"
            mb={0}>
            {back ? (
              <Tooltip arrow placement="top" title={t('Go back')}>
                <Button
                  component={RouterLink}
                  color={color}
                  to={to}
                  sx={{
                    p: 2,
                    mr: 2,
                    mb: 2,
                  }}>
                  <ArrowBackTwoToneIcon />
                </Button>
              </Tooltip>
            ) : null}
            {icon ? (
              <Avatar
                variant="rounded"
                sx={{
                  p: 4,
                  mr: 2,
                  mb: 2,
                  color: theme.colors[color].main,
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? theme.colors.alpha.trueWhite[10]
                      : theme.colors.alpha.white[50],
                  boxShadow:
                    theme.palette.mode === 'dark'
                      ? `0 1px 0 ${alpha(
                          lighten(theme.colors.primary.main, 0.8),
                          0.2,
                        )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.3), 0px 5px 16px -4px rgba(0, 0, 0, .5)`
                      : `0px 2px 4px -3px ${alpha(
                          theme.colors.alpha.black[100],
                          0.4,
                        )}, 0px 5px 16px -4px ${alpha(
                          theme.colors.alpha.black[100],
                          0.2,
                        )}`,
                }}>
                {icon}
              </Avatar>
            ) : null}
            <Box mr={2} mb={2}>
              {typeof title === 'string' ? (
                <Typography variant="h2" component="h2" gutterBottom>
                  {title}
                </Typography>
              ) : (
                title
              )}
              {typeof subtitle === 'string' ? (
                <Typography variant="subtitle2">{subtitle}</Typography>
              ) : (
                subtitle
              )}
            </Box>
          </Box>
        </Grid>
        {button ? (
          <Grid item display="flex" flexWrap="wrap">
            {button}
          </Grid>
        ) : null}
      </Grid>
    </Box>
  )
}

Header.propTypes = {
  back: PropTypes.bool,
  button: PropTypes.element,
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'success',
    'error',
    'info',
    'warning',
    PropTypes.string,
  ]),
  icon: PropTypes.element,
  state: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  subtitle: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Header
