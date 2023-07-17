import PropTypes from 'prop-types'
import {FormControl, FormControlLabel, FormHelperText} from '@mui/material'
import {Controller, FieldValues} from 'react-hook-form'
import {getErrorMessage} from './FormUtils'
import {SwitchCustomProps} from './FormTypes'
import LabelCustom from './LabelCustom'
import {SwitchStyled} from './FormStyled'

const SwitchCustom = <T,>({
  color = 'primary',
  control,
  error,
  label,
  labelPlacement = 'start',
  legend,
  name,
  noLabel = false,
  noLegend = false,
  required = false,
  size = 'medium',
  sx,
  variant = 'outlined',
}: SwitchCustomProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({field: {onBlur, onChange, value, ref}}: FieldValues) => (
      <FormControl
        variant={variant}
        error={Boolean(error)}
        sx={{alignItems: 'center', ...sx}}>
        <LabelCustom
          noLabel={noLegend}
          label={legend}
          name={name}
          required={required}
        />
        <FormControlLabel
          control={
            <SwitchStyled
              color={color}
              checked={value}
              inputRef={ref}
              onBlur={onBlur}
              onChange={onChange}
              required={required}
              size={size}
            />
          }
          label={
            <LabelCustom
              noLabel={noLabel}
              label={label}
              name={name}
              required={required}
              sx={{
                ml: labelPlacement === 'start' ? 0 : 2,
                mr: labelPlacement === 'start' ? 2 : 0,
              }}
            />
          }
          labelPlacement={labelPlacement}
          sx={{
            ml: 0,
            mr: 0,
          }}
        />
        {Boolean(error) && (
          <FormHelperText error>{getErrorMessage(error)}</FormHelperText>
        )}
      </FormControl>
    )}
  />
)

SwitchCustom.propTypes = {
  color: PropTypes.oneOf([
    'error',
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    PropTypes.string,
  ]),
  error: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  labelPlacement: PropTypes.oneOf(['bottom', 'end', 'start', 'top']),
  legend: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  name: PropTypes.string.isRequired,
  noLabel: PropTypes.bool,
  noLegend: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['medium', 'small', PropTypes.string]),
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
}

export default SwitchCustom
