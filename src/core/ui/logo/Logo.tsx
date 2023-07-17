import PropTypes from 'prop-types'
import {Box, Tooltip, useTheme} from '@mui/material'
import {APP_NAME, LOGO_URL, LOGO_WHITE_URL} from 'src/core/constants/Constants'
import {LogoProps} from './LogoTypes'

const Logo = ({
  maxWidth = 'none',
  width = '100%',
  height = '100%',
  src,
  sx,
}: LogoProps) => {
  const theme = useTheme()

  return (
    <Tooltip arrow title={APP_NAME}>
      <Box
        component="img"
        sx={{
          maxWidth,
          width,
          height,
          ...sx,
        }}
        src={
          src || (theme.palette.mode === 'light' ? LOGO_URL : LOGO_WHITE_URL)
        }
        alt={APP_NAME}
        loading="lazy"
      />
    </Tooltip>
  )
}

Logo.propTypes = {
  maxWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
  src: PropTypes.string,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
}

export default Logo
