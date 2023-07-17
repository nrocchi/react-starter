import PropTypes from 'prop-types'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from '@mui/material'
import {Controller, FieldValues} from 'react-hook-form'
import {RadioGroupCustomProps, SelectOption} from './FormTypes'
import {getErrorMessage} from './FormUtils'
import LabelCustom from './LabelCustom'

const RadioGroupCustom = <T,>({
  color = 'primary',
  control,
  error,
  label,
  labelPlacement = 'end',
  name,
  noLabel = false,
  options,
  required = false,
  row = true,
  size = 'medium',
  sx,
}: RadioGroupCustomProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({field: {onBlur, onChange, value}}: FieldValues) => (
      <FormControl error={Boolean(error)} sx={sx}>
        <LabelCustom
          noLabel={noLabel}
          label={label}
          name={name}
          required={required}
        />
        <RadioGroup
          color={color}
          row={row}
          onBlur={onBlur}
          onChange={onChange}
          value={value}>
          {options &&
            options.map((option: SelectOption) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio required={required} size={size} />}
                label={option.label}
                labelPlacement={labelPlacement}
              />
            ))}
        </RadioGroup>
        {Boolean(error) && (
          <FormHelperText error>{getErrorMessage(error)}</FormHelperText>
        )}
      </FormControl>
    )}
  />
)

RadioGroupCustom.propTypes = {
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
  name: PropTypes.string.isRequired,
  noLabel: PropTypes.bool,
  options: PropTypes.array.isRequired,
  row: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', PropTypes.string]),
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
}

export default RadioGroupCustom
