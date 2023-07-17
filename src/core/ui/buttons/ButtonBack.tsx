import PropTypes from 'prop-types'
import {Link as RouterLink} from 'react-router-dom'
import {Button} from '@mui/material'
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone'
import {useTranslation} from 'react-i18next'
import {ButtonBackProps} from './ButtonTypes'

const ButtonBack = ({
  color = 'secondary',
  page = null,
  size = 'medium',
  sx,
  to = -1,
  variant = 'contained',
}: ButtonBackProps) => {
  const {t} = useTranslation()

  return (
    <Button
      color={color}
      component={RouterLink}
      size={size}
      startIcon={<ArrowBackTwoToneIcon />}
      sx={sx}
      to={to}
      variant={variant}>
      {t('Go back')}
      {page ? ` ${t('to the {{ value }} page', {value: t(page)})}` : ''}
    </Button>
  )
}

ButtonBack.propTypes = {
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
  page: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', PropTypes.string]),
  state: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf(['contained', 'outlined', 'text', PropTypes.string]),
}

export default ButtonBack
