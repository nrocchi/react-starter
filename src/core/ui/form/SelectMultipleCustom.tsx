import PropTypes from 'prop-types'
import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import {Controller, FieldValues} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {MouseEvent} from 'react'
import {SelectMultipleCustomProps, SelectOption} from './FormTypes'
import {getErrorMessage, getLabel} from './FormUtils'

const SelectMultipleCustom = <T,>({
  autoFocus = false,
  color = 'primary',
  control,
  error,
  label,
  name,
  noLabel = false,
  options,
  placeholder,
  required = false,
  setValue,
  sx,
  variant = 'outlined',
}: SelectMultipleCustomProps<T>) => {
  const {t} = useTranslation()

  const handleDelete = (
    e: MouseEvent<HTMLButtonElement>,
    option: SelectOption['value'],
    value: Array<SelectOption['value']>,
  ) => {
    e.preventDefault()
    const newValue = value.filter(
      (item: SelectOption['value']) => item !== option,
    )
    setValue(name, newValue)
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onBlur, onChange, value, ref}}: FieldValues) => (
        <FormControl
          sx={{minWidth: '100%', ...sx}}
          error={Boolean(error)}
          color={color}>
          <InputLabel>
            {Boolean(!noLabel) &&
              `${getLabel(label || name)}${required ? ' *' : ''}`}
          </InputLabel>
          <Select
            autoFocus={autoFocus}
            autoWidth
            inputRef={ref}
            label={!noLabel ? getLabel(label || name) : null}
            MenuProps={{sx: {zIndex: 1298}}}
            multiple={true}
            onBlur={onBlur}
            onChange={onChange}
            renderValue={(selectedOptions: Array<SelectOption['value']>) => (
              <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                {selectedOptions.map((option: SelectOption['value']) => (
                  <Chip
                    key={option}
                    label={option}
                    onDelete={(e) => handleDelete(e, option, value)}
                  />
                ))}
              </Box>
            )}
            required={required}
            value={value}
            variant={variant}>
            <MenuItem disabled value="">
              <em>{placeholder || t('Please choose your options')}</em>
            </MenuItem>
            {options &&
              options.map((option: SelectOption) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
          </Select>
          {Boolean(error) && (
            <FormHelperText error>{getErrorMessage(error)}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}

SelectMultipleCustom.propTypes = {
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
  error: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  noLabel: PropTypes.bool,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
}

export default SelectMultipleCustom
