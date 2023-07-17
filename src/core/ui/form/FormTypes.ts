import {ReactElement} from 'react'
import {
  CheckboxProps,
  FormControlLabelProps,
  FormControlProps,
  RadioProps,
  RatingProps,
  SliderProps,
  SwitchProps,
  SxProps,
  TextFieldProps,
  Theme,
} from '@mui/material'
import {Control, FieldError, Path} from 'react-hook-form'
import {UserData} from 'src/api/users/UsersModel'

export interface AutocompleteCustomProps<T> {
  autoFocus?: boolean
  clearOnBlur?: boolean
  clearOnEscape?: boolean
  color?: TextFieldProps['color']
  control: Control<T>
  creatable?: boolean
  disabled?: boolean
  disableClearable?: boolean
  disableCloseOnSelect?: boolean
  disabledItemsFocusable?: boolean
  error?: FieldError
  filterSelectedOptions?: boolean
  fullWidth?: boolean
  getOptionDisabled?: (option: AutocompleteOption) => boolean
  groupBy?: (option: AutocompleteOption) => string
  label?: string
  limitTags?: number
  loading?: boolean
  margin?: TextFieldProps['margin']
  multiple?: boolean
  name: Path<T>
  noLabel?: boolean
  options: Array<AutocompleteOption>
  optionsChecked?: boolean
  placeholder?: string
  required?: boolean
  selectOnFocus?: boolean
  size?: TextFieldProps['size']
  sx?: SxProps<Theme>
  variant?: TextFieldProps['variant']
}

export type AutocompleteOption = {
  id: number
  avatar?: string
  label: string
  value: string | number
}

export interface AvatarUploadCustomProps<T> {
  accept?: string
  color?: FormControlProps['color']
  control: Control<T>
  error?: FieldError
  label?: string
  maxSize?: number
  minSize?: number
  name: Path<T>
  noLabel?: boolean
  required?: boolean
  setValue: Function
  sx?: SxProps<Theme>
  user?: UserData
  watch: Function
}

export interface CheckboxCustomProps<T> {
  color?: CheckboxProps['color']
  control: Control<T>
  error?: FieldError
  label?: ReactElement | string
  labelPlacement?: FormControlLabelProps['labelPlacement']
  legend?: ReactElement | string
  name: Path<T>
  noLabel?: boolean
  noLegend?: boolean
  required?: boolean
  variant?: FormControlProps['variant']
  size?: CheckboxProps['size']
  sx?: SxProps<Theme>
}

export interface DatePickerCustomProps<T> {
  autoFocus?: boolean
  color?: TextFieldProps['color']
  control: Control<T>
  error?: FieldError
  fullWidth?: boolean
  label?: string
  margin?: TextFieldProps['margin']
  minDate?: Date | number | String
  maxDate?: Date | number | string
  name: Path<T>
  noLabel?: boolean
  placeholder?: string
  required?: boolean
  size?: TextFieldProps['size']
  sx?: SxProps<Theme>
  variant?: TextFieldProps['variant']
}

export interface FileCustom {
  base64:
    | string
    | {
        readonly byteLength: number
        slice: {}
        readonly [Symbol.toStringTag]: string
      }
  name: string
  path: string
  preview: string
  size: number
}

export interface FileUploadCustomProps<T> {
  accept?: string
  color?: FormControlProps['color']
  control: Control<T>
  error?: FieldError
  label?: string
  maxFiles?: number
  maxSize?: number
  minSize?: number
  multiple?: boolean
  name: Path<T>
  noLabel?: boolean
  required?: boolean
  setValue: Function
  sx?: SxProps<Theme>
  watch: Function
}

export interface LabelCustomProps<T> {
  error?: FieldError
  label?: ReactElement | string
  name: string
  noLabel: boolean
  required: boolean
  sx?: SxProps<Theme>
}

export interface RadioGroupCustomProps<T> {
  color?: SwitchProps['color']
  control: Control<T>
  error?: FieldError
  label?: ReactElement | string
  labelPlacement?: FormControlLabelProps['labelPlacement']
  name: Path<T>
  noLabel?: boolean
  options: Array<SelectOption>
  row?: boolean
  required?: boolean
  size?: RadioProps['size']
  sx?: SxProps<Theme>
}

export interface RatingCustomProps<T> {
  control: Control<T>
  emptyIcon?: ReactElement
  error?: FieldError
  highlightSelectedOnly?: boolean
  icon?: ReactElement
  label?: ReactElement | string
  max?: number
  name: Path<T>
  noLabel?: boolean
  precision?: number
  required?: boolean
  size?: RatingProps['size']
  sx?: SxProps<Theme>
}

export interface SelectCustomProps<T> {
  autoFocus?: boolean
  color?: TextFieldProps['color']
  control: Control<T>
  disabled?: boolean
  error?: FieldError
  fullWidth?: boolean
  label?: string
  margin?: TextFieldProps['margin']
  name: Path<T>
  noLabel?: boolean
  options?: Array<SelectOption>
  placeholder?: string
  required?: boolean
  sx?: SxProps<Theme>
  variant?: TextFieldProps['variant']
}

export interface SelectMultipleCustomProps<T> {
  autoFocus?: boolean
  color?: FormControlProps['color']
  control: Control<T>
  error?: FieldError
  label?: string
  name: Path<T>
  noLabel?: boolean
  options: Array<SelectOption>
  placeholder?: string
  required?: boolean
  setValue: Function
  sx?: SxProps<Theme>
  variant?: TextFieldProps['variant']
}

export type SelectOption = {
  id: number
  label?: string
  name?: string
  value?: string
}

export interface SliderCustomProps<T> {
  color?: SliderProps['color']
  control: Control<T>
  disabled?: boolean
  error?: FieldError
  label?: ReactElement | string
  marks?: Array<{label?: Node; value: number}> | boolean
  max?: number
  min?: number
  minValidation?: number
  maxValidation?: number
  name: Path<T>
  noLabel?: boolean
  orientation?: SliderProps['orientation']
  required?: boolean
  size?: SliderProps['size']
  step?: number
  sx?: SxProps<Theme>
  valueLabelDisplay?: SliderProps['valueLabelDisplay']
}

export interface SwitchCustomProps<T> {
  color?: SwitchProps['color']
  control: Control<T>
  error?: FieldError
  label?: ReactElement | string
  labelPlacement?: FormControlLabelProps['labelPlacement']
  legend?: ReactElement | string
  name: Path<T>
  noLabel?: boolean
  noLegend?: boolean
  required?: boolean
  size?: SwitchProps['size']
  sx?: SxProps<Theme>
  variant?: FormControlProps['variant']
}

export interface TextEditorCustomProps<T> {
  color?: TextFieldProps['color']
  control: Control<T>
  label?: ReactElement | string
  name: Path<T>
  noLabel?: boolean
  error?: FieldError
  required?: boolean
  sx?: SxProps<Theme>
}

export interface TextEditorStyledProps {
  color?: TextFieldProps['color']
  error?: boolean
}

export interface TextFieldCustomProps<T> {
  autoFocus?: boolean
  color?: TextFieldProps['color']
  control: Control<T>
  disabled?: boolean
  error?: FieldError
  errorCustom?: boolean
  fullWidth?: boolean
  inputProps?: TextFieldProps['InputProps']
  label?: string
  margin?: TextFieldProps['margin']
  minValidation?: number
  maxValidation?: number
  maxRows?: number
  multiline?: boolean
  name: Path<T>
  noLabel?: boolean
  placeholder?: string
  required?: boolean
  rows?: number
  size?: TextFieldProps['size']
  sx?: SxProps<Theme>
  type?: string
  variant?: TextFieldProps['variant']
}

export interface TextFieldStyledProps {
  color?: TextFieldProps['color']
}

export interface UploadBoxStyledProps {
  color?: string
}

export interface UploadAvatarStyledProps {
  bgcolor?: string
  color?: string
}

export interface UploadButtonStyledProps {
  color?: string
}
