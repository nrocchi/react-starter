import PropTypes from 'prop-types'
import {MenuItem} from '@mui/material'
import {Controller, FieldValues} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {SelectCustomProps, SelectOption} from './FormTypes'
import {getErrorMessage, getLabel} from './FormUtils'
import {TextFieldStyled} from './FormStyled'

const SelectCustom = <T,>({
  autoFocus = false,
  color = 'primary',
  control,
  disabled = false,
  error,
  fullWidth = true,
  label,
  margin = 'normal',
  name,
  noLabel = false,
  options,
  placeholder,
  required = false,
  sx,
  variant = 'outlined',
}: SelectCustomProps<T>) => {
  const {t} = useTranslation()

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onBlur, onChange, value, ref}}: FieldValues) => (
        <TextFieldStyled
          autoFocus={autoFocus}
          color={color}
          disabled={disabled}
          error={Boolean(error)}
          fullWidth={fullWidth}
          helperText={error && getErrorMessage(error)}
          inputRef={ref}
          label={!noLabel ? getLabel(label || name) : null}
          margin={margin}
          onBlur={onBlur}
          onChange={onChange}
          required={required}
          select
          sx={{m: 0, ...sx}}
          value={value}
          variant={variant}>
          <MenuItem disabled value="">
            <em>{placeholder || t('Please choose your option')}</em>
          </MenuItem>
          {options &&
            options.map((option: SelectOption) => (
              <MenuItem key={option.id} value={JSON.stringify(option)}>
                {option.label
                  ? t(option.label)
                  : option.name
                  ? t(option.name)
                  : t(option.value)}
              </MenuItem>
            ))}
        </TextFieldStyled>
      )}
    />
  )
}

SelectCustom.propTypes = {
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
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  margin: PropTypes.oneOf(['dense', 'none', 'normal']),
  name: PropTypes.string.isRequired,
  noLabel: PropTypes.bool,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
}

export default SelectCustom
