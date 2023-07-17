import PropTypes from 'prop-types'
import LoadingButton from '@mui/lab/LoadingButton'
import {alpha, CircularProgress, Tooltip, useTheme} from '@mui/material'
import {t} from 'i18next'
import {ButtonLoadingIconProps} from './ButtonTypes'

const ButtonLoadingIcon = ({
  color = 'primary',
  edge = null,
  padding = '8px',
  loading,
  onClick,
  icon,
  size = 'medium',
  sx,
  tooltip,
}: ButtonLoadingIconProps) => {
  const theme = useTheme()

  return tooltip ? (
    <Tooltip title={tooltip} arrow>
      <LoadingButton
        color={color}
        loading={loading}
        loadingIndicator={
          <CircularProgress color={color} size="1.2rem" thickness={5} />
        }
        onClick={onClick}
        size={size}
        sx={{
          marginLeft: edge === 'start' ? '-12px' : null,
          marginRight: edge === 'end' ? '-12px' : null,
          padding,
          minWidth: 'auto',
          '&:hover': {
            background: alpha(theme.colors[color].main, 0.1),
          },
          ...sx,
        }}>
        {icon}
      </LoadingButton>
    </Tooltip>
  ) : (
    <LoadingButton
      color={color}
      loading={loading}
      loadingIndicator={
        <CircularProgress color={color} size="1.2rem" thickness={5} />
      }
      onClick={onClick}
      size={size}
      sx={{
        marginLeft: edge === 'start' ? '-12px' : null,
        marginRight: edge === 'end' ? '-12px' : null,
        padding,
        minWidth: 'auto',
        '&:hover': {
          background: alpha(theme.colors[color].main, 0.1),
        },
        ...sx,
      }}>
      {icon}
    </LoadingButton>
  )
}

ButtonLoadingIcon.propTypes = {
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
  edge: PropTypes.oneOf(['end', 'start']),
  icon: PropTypes.element.isRequired,
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  padding: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', PropTypes.string]),
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  tooltip: PropTypes.string,
}

export default ButtonLoadingIcon
