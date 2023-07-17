import PropTypes from 'prop-types'
import {Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'
import {EmptyDataProps} from './EmptyTypes'

const EmptyData = ({sx, type, value, variant = 'h4'}: EmptyDataProps) => {
  const {t} = useTranslation()

  return (
    <Typography
      sx={{
        p: 3,
        ...sx,
      }}
      variant={variant}
      fontWeight="normal"
      color="text.secondary"
      align="center">
      {type ? t(type, {value: t(value)}) : t('No result.')}
    </Typography>
  )
}

EmptyData.propTypes = {
  type: PropTypes.string,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  value: PropTypes.string,
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

export default EmptyData
