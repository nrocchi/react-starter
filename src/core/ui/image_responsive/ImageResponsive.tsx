import PropTypes from 'prop-types'
import {Box} from '@mui/material'
import {ImageResponsiveProps} from './ImageResponsiveTypes'

const ImageResponsive = ({
  alt,
  maxWidth = 'none',
  onLoad,
  src,
  sx,
}: ImageResponsiveProps) => (
  <Box
    component="img"
    sx={{
      maxWidth,
      width: '100%',
      height: '100%',
      ...sx,
    }}
    src={src}
    alt={alt}
    loading="lazy"
    onLoad={onLoad}
  />
)

ImageResponsive.propTypes = {
  alt: PropTypes.string,
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onLoad: PropTypes.func,
  src: PropTypes.string.isRequired,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
}

export default ImageResponsive
