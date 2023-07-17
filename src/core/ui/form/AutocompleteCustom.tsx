import PropTypes from 'prop-types'
import {
  Autocomplete,
  Avatar,
  Checkbox,
  Chip,
  createFilterOptions,
} from '@mui/material'
import {Controller, FieldValues} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {
  AutocompleteCustomProps,
  AutocompleteOption,
} from 'src/core/ui/form/FormTypes'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import {getErrorMessage, getLabel, getPlaceholder} from './FormUtils'
import {TextFieldStyled} from './FormStyled'

const AutocompleteCustom = <T,>({
  autoFocus = false,
  color = 'primary',
  clearOnBlur = true,
  clearOnEscape = true,
  control,
  creatable = false,
  disabled = false,
  disableClearable = false,
  disableCloseOnSelect,
  disabledItemsFocusable = true,
  filterSelectedOptions = false,
  error,
  fullWidth = true,
  getOptionDisabled,
  groupBy,
  label,
  limitTags = 2,
  loading = false,
  margin = 'normal',
  multiple = false,
  name,
  noLabel = false,
  options,
  optionsChecked = false,
  placeholder,
  required = false,
  selectOnFocus = true,
  size = 'medium',
  sx,
  variant = 'outlined',
}: AutocompleteCustomProps<T>) => {
  const {t} = useTranslation()
  const filter = createFilterOptions<AutocompleteOption>()

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onBlur, onChange, value, ref}}: FieldValues) => (
        <Autocomplete
          // Generic
          clearOnBlur={clearOnBlur}
          clearText={t('Clear')}
          closeText={t('Close')}
          clearOnEscape={clearOnEscape}
          disabled={disabled}
          disableClearable={disableClearable}
          disableCloseOnSelect={disableCloseOnSelect || !!multiple}
          disabledItemsFocusable={disabledItemsFocusable}
          filterSelectedOptions={filterSelectedOptions}
          getOptionDisabled={getOptionDisabled}
          isOptionEqualToValue={(
            option: AutocompleteOption,
            selected: AutocompleteOption,
          ) => option.value === selected.value}
          limitTags={limitTags}
          multiple={multiple}
          noOptionsText={t('No options')}
          onBlur={onBlur}
          onChange={(_, data) => onChange(data)}
          openText={t('Open')}
          options={options}
          selectOnFocus={selectOnFocus}
          sx={sx}
          // Creatable
          freeSolo={!!creatable}
          filterOptions={
            creatable
              ? (_, params) => {
                  const filtered = filter(options, params)
                  const {inputValue} = params
                  const isExisting = options.some(
                    (option: any) => inputValue === option.value,
                  )
                  if (inputValue !== '' && !isExisting) {
                    filtered.push({
                      id: options.length + 1,
                      avatar: null,
                      label: inputValue,
                      value: inputValue,
                    })
                  }
                  return filtered
                }
              : (_, params) => filter(options, params)
          }
          // Grouped
          groupBy={groupBy}
          // Asynchronous
          loading={loading}
          loadingText={t('Loading...')}
          // Renders
          renderOption={(props, option: AutocompleteOption, {selected}) => (
            <li {...props}>
              {optionsChecked && (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  style={{marginRight: 8}}
                  checked={selected}
                />
              )}
              {option.avatar && (
                <Avatar
                  sx={{
                    mr: 1,
                  }}
                  alt={option.label}
                  src={option.avatar}
                />
              )}
              {option.value}
            </li>
          )}
          renderInput={(params) => (
            <TextFieldStyled
              {...params}
              autoFocus={autoFocus}
              color={color}
              error={Boolean(error)}
              fullWidth={fullWidth}
              helperText={error && getErrorMessage(error)}
              inputRef={ref}
              label={!noLabel ? getLabel(label || name) : null}
              margin={margin}
              placeholder={
                placeholder || getPlaceholder(label || name, multiple)
              }
              required={required}
              size={size}
              value={value}
              variant={variant}
            />
          )}
          renderTags={(
            selectedOptions: Array<AutocompleteOption>,
            getTagProps,
          ) =>
            selectedOptions.map((option: AutocompleteOption, index: number) => (
              <Chip
                key={option.id}
                label={option.label}
                {...getTagProps({index})}
                avatar={option.avatar && <Avatar src={option.avatar} />}
              />
            ))
          }
        />
      )}
    />
  )
}

AutocompleteCustom.propTypes = {
  autoFocus: PropTypes.bool,
  clearOnBlur: PropTypes.bool,
  clearOnEscape: PropTypes.bool,
  color: PropTypes.oneOf([
    'error',
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    PropTypes.string,
  ]),
  creatable: PropTypes.bool,
  disabled: PropTypes.bool,
  disableClearable: PropTypes.bool,
  disableCloseOnSelect: PropTypes.bool,
  disabledItemsFocusable: PropTypes.bool,
  filterSelectedOptions: PropTypes.bool,
  error: PropTypes.object,
  fullWidth: PropTypes.bool,
  getOptionDisabled: PropTypes.func,
  groupBy: PropTypes.func,
  label: PropTypes.string,
  limitTags: PropTypes.number,
  loading: PropTypes.bool,
  margin: PropTypes.oneOf(['dense', 'none', 'normal']),
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  noLabel: PropTypes.bool,
  options: PropTypes.array.isRequired,
  optionsChecked: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  selectOnFocus: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', PropTypes.string]),
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
}

export default AutocompleteCustom
