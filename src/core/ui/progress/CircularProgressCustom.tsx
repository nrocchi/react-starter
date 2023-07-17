import PropTypes from 'prop-types'
import {Box, Typography, useTheme} from '@mui/material'
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress'
import {useTranslation} from 'react-i18next'
import {CircularProgressCustomProps} from './ProgressTypes'

const CircularProgressCustom = ({
  color,
  data,
  thickness = 4,
  size = 65,
  sx,
  variant = 'h5',
}: CircularProgressCustomProps) => {
  const {t} = useTranslation()
  const theme = useTheme()
  return (
    <Box display="inline-flex" position="relative" sx={{...sx}}>
      <Box
        sx={{
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography
          sx={{
            color: `${theme.colors.alpha.black[100]}`,
          }}
          variant={variant}>
          {data ? t('percent', {value: data}) : t('percent', {value: 0})}
        </Typography>
      </Box>
      <CircularProgress
        variant="determinate"
        sx={{
          color: `${theme.colors.alpha.black[10]}`,
        }}
        size={size}
        thickness={thickness}
        value={100}
      />
      <CircularProgress
        size={size}
        sx={{
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          color: color || theme.colors.primary.main,
          top: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        thickness={thickness}
        variant="determinate"
        // value={data > 100 ? 100 : data || 0}
        value={data > 100 ? 100 : data || 0}
      />
    </Box>
  )
}

CircularProgressCustom.propTypes = {
  color: PropTypes.string,
  data: PropTypes.number,
  size: PropTypes.number,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  thickness: PropTypes.number,
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'caption',
    'button',
    'overline',
    'inherit',
  ]),
}

export default CircularProgressCustom
