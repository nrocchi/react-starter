import PropTypes from 'prop-types'
import {Box, Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'
import {parseISO} from 'date-fns'
import {TypographyCustomProps} from './TypographyTypes'

const TypographyCustom = ({
  color = '',
  component,
  fontWeight = 'bold',
  formatCurrency = 'currencyEUR',
  formatDate = 'dates.shortHour',
  noWrap = false,
  sx,
  type = null,
  value = null,
  variant = 'body1',
  width,
}: TypographyCustomProps) => {
  const {t} = useTranslation()

  return !value ? (
    <Typography
      component={component}
      variant={variant}
      fontWeight={fontWeight}
      color={color}>
      {type === 'number' || type === 'currency' || type === 'percent'
        ? 0
        : 'NC'}
    </Typography>
  ) : type === 'date' ? (
    <Box component={component} width={width}>
      <Typography
        component={component}
        color={color}
        fontWeight={fontWeight}
        noWrap={noWrap}
        sx={{...sx}}
        variant={variant}>
        {t(formatDate, {
          value: parseISO(value as string),
        })}
      </Typography>
    </Box>
  ) : type === 'currency' ? (
    <Box component={component} width={width}>
      <Typography
        component={component}
        color={color}
        fontWeight={fontWeight}
        noWrap={noWrap}
        sx={{...sx}}
        variant={variant}>
        {t(formatCurrency, {value})}
      </Typography>
    </Box>
  ) : type === 'number' ? (
    <Box component={component} width={width}>
      <Typography
        component={component}
        color={color}
        fontWeight={fontWeight}
        noWrap={noWrap}
        sx={{...sx}}
        variant={variant}>
        {t('number', {value})}
      </Typography>
    </Box>
  ) : type === 'percent' ? (
    <Box component={component} width={width}>
      <Typography
        component={component}
        color={color}
        fontWeight={fontWeight}
        noWrap={noWrap}
        sx={{...sx}}
        variant={variant}>
        {t('percent', {value})}
      </Typography>
    </Box>
  ) : (
    <Box component={component} width={width}>
      <Typography
        color={color}
        fontWeight={fontWeight}
        noWrap={noWrap}
        sx={{...sx}}
        variant={variant}>
        {value}
      </Typography>
    </Box>
  )
}

TypographyCustom.propTypes = {
  color: PropTypes.string,
  component: PropTypes.elementType,
  fontWeight: PropTypes.string,
  formatCurrency: PropTypes.string,
  formatDate: PropTypes.string,
  noWrap: PropTypes.bool,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  type: PropTypes.oneOf(['date', 'currency', 'number', 'percent', null]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  variant: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
}

export default TypographyCustom
