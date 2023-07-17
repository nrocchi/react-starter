import PropTypes from 'prop-types'
import {FormHelperText} from '@mui/material'
import {Controller, FieldValues} from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {TextEditorCustomProps} from './FormTypes'
import {TextEditorStyled} from './FormStyled'
import {getErrorMessage} from './FormUtils'
import LabelCustom from './LabelCustom'

const TextEditorCustom = <T,>({
  color = 'primary',
  control,
  error,
  label,
  name,
  noLabel = false,
  required = false,
  sx,
}: TextEditorCustomProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({field: {onChange, onBlur, value}}: FieldValues) => (
      <TextEditorStyled error={Boolean(error)} color={color} sx={sx}>
        <LabelCustom
          noLabel={noLabel}
          label={label}
          name={name}
          required={required}
        />
        <ReactQuill onBlur={onBlur} onChange={onChange} value={value} />
        {Boolean(error) && (
          <FormHelperText error>{getErrorMessage(error)}</FormHelperText>
        )}
      </TextEditorStyled>
    )}
  />
)

TextEditorCustom.propTypes = {
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
  name: PropTypes.string.isRequired,
  noLabel: PropTypes.bool,
  required: PropTypes.bool,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
}

export default TextEditorCustom
