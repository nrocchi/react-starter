import PropTypes from 'prop-types'
import {FormLabel} from '@mui/material'
import {getLabel} from './FormUtils'
import {LabelCustomProps} from './FormTypes'

const LabelCustom = <T,>({
  error,
  label,
  name,
  noLabel,
  required,
  sx,
}: LabelCustomProps<T>) => (
  <>
    {Boolean(!noLabel) &&
      (typeof label === 'string' ? (
        <FormLabel error={Boolean(error)} sx={sx}>{`${getLabel(label)}${
          required ? ' *' : ''
        }`}</FormLabel>
      ) : !label ? (
        <FormLabel error={Boolean(error)} sx={sx}>{`${getLabel(name)}${
          required ? ' *' : ''
        }`}</FormLabel>
      ) : (
        label || ''
      ))}
  </>
)

LabelCustom.propTypes = {
  error: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  name: PropTypes.string.isRequired,
  noLabel: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
}

export default LabelCustom
