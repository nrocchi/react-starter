import PropTypes from 'prop-types'
import {Controller} from 'react-hook-form'
import {TextFieldCustomProps} from './FormTypes'
import {getErrorMessage, getLabel, getPlaceholder} from './FormUtils'
import {TextFieldStyled} from './FormStyled'

const TextFieldCustom = <T,>({
  autoFocus = false,
  color = 'primary',
  control,
  disabled = false,
  error,
  errorCustom = false,
  fullWidth = true,
  inputProps,
  label,
  margin = 'normal',
  minValidation,
  maxValidation,
  maxRows,
  multiline = false,
  name,
  noLabel = false,
  placeholder,
  required = false,
  rows,
  size = 'medium',
  sx,
  type = 'text',
  variant = 'outlined',
}: TextFieldCustomProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({field: {onChange, onBlur, value, ref}}) => (
      <TextFieldStyled
        autoFocus={autoFocus}
        color={color}
        disabled={disabled}
        error={Boolean(error)}
        fullWidth={fullWidth}
        helperText={
          error &&
          (errorCustom
            ? error.message
            : getErrorMessage(error, minValidation, maxValidation))
        }
        InputProps={inputProps}
        inputRef={ref}
        label={!noLabel ? getLabel(label || name) : null}
        margin={margin}
        maxRows={maxRows}
        multiline={multiline}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder || getPlaceholder(label || name)}
        required={required}
        rows={rows}
        size={size}
        sx={{m: 0, ...sx}}
        type={type}
        value={value}
        variant={variant}
      />
    )}
  />
)

TextFieldCustom.propTypes = {
  autoFocus: PropTypes.bool,
  color: PropTypes.oneOf([
    'error',
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,
  error: PropTypes.object,
  errorCustom: PropTypes.bool,
  fullWidth: PropTypes.bool,
  inputProps: PropTypes.object,
  label: PropTypes.string,
  margin: PropTypes.oneOf(['dense', 'none', 'normal']),
  minValidation: PropTypes.number,
  maxValidation: PropTypes.number,
  maxRows: PropTypes.number,
  multiline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  noLabel: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', PropTypes.string]),
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  type: PropTypes.string,
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
}

export default TextFieldCustom
