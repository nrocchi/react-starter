import PropTypes from 'prop-types'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@mui/material'
import {Controller, FieldValues} from 'react-hook-form'
import {CheckboxCustomProps} from './FormTypes'
import {getErrorMessage} from './FormUtils'
import LabelCustom from './LabelCustom'

const CheckboxCustom = <T,>({
  color = 'primary',
  control,
  error,
  label,
  labelPlacement = 'end',
  legend,
  name,
  noLabel = false,
  noLegend = false,
  required = false,
  size = 'medium',
  sx,
  variant = 'outlined',
}: CheckboxCustomProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({field: {onChange, onBlur, value, ref}}: FieldValues) => (
      <FormControl variant={variant} error={Boolean(error)} sx={sx}>
        <LabelCustom
          noLabel={noLegend}
          label={legend}
          name={name}
          required={required}
        />
        <FormControlLabel
          control={
            <Checkbox
              onBlur={onBlur}
              onChange={onChange}
              inputRef={ref}
              checked={value}
              color={color}
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
            />
          }
          labelPlacement={labelPlacement}
        />
        {Boolean(error) && (
          <FormHelperText error>{getErrorMessage(error)}</FormHelperText>
        )}
      </FormControl>
    )}
  />
)

CheckboxCustom.propTypes = {
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
  labelPlacement: PropTypes.oneOf(['bottom', 'top', 'end', 'start']),
  legend: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  name: PropTypes.string.isRequired,
  noLabel: PropTypes.bool,
  noLegend: PropTypes.bool,
  required: PropTypes.bool,
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
  size: PropTypes.oneOf(['small', 'medium', PropTypes.string]),
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
}

export default CheckboxCustom
