import PropTypes from 'prop-types'
import {Controller, FieldValues} from 'react-hook-form'
import DatePicker from '@mui/lab/DatePicker'
import {DatePickerCustomProps} from './FormTypes'
import {getErrorMessage, getLabel, getPlaceholder} from './FormUtils'
import {TextFieldStyled} from './FormStyled'

const DatePickerCustom = <T,>({
  autoFocus = false,
  color = 'primary',
  control,
  error,
  fullWidth = true,
  label,
  margin = 'normal',
  minDate,
  maxDate,
  name,
  noLabel = false,
  placeholder,
  required = false,
  size = 'medium',
  sx,
  variant = 'outlined',
}: DatePickerCustomProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({field: {onBlur, onChange, value, ref}}: FieldValues) => (
      <DatePicker
        inputRef={ref}
        minDate={minDate}
        maxDate={maxDate}
        onChange={onChange}
        value={value}
        renderInput={(params) => (
          <TextFieldStyled
            {...params}
            autoFocus={autoFocus}
            color={color}
            error={Boolean(error)}
            fullWidth={fullWidth}
            helperText={error && getErrorMessage(error)}
            label={!noLabel ? getLabel(label || name) : null}
            margin={margin}
            onBlur={onBlur}
            placeholder={placeholder || getPlaceholder(label || name)}
            required={required}
            size={size}
            sx={sx}
            variant={variant}
          />
        )}
      />
    )}
  />
)

DatePickerCustom.propTypes = {
  autoFocus: PropTypes.bool,
  color: PropTypes.oneOf([
    'error',
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'string',
  ]),
  error: PropTypes.object,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  margin: PropTypes.oneOf(['dense', 'none', 'normal']),
  minDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.string,
  ]),
  maxDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.string,
  ]),
  name: PropTypes.string.isRequired,
  noLabel: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', PropTypes.string]),
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
}

export default DatePickerCustom
