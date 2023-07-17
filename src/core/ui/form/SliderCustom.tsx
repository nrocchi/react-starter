import {Box, FormHelperText, Slider} from '@mui/material'
import {Controller, FieldValues} from 'react-hook-form'
import {SliderCustomProps} from './FormTypes'
import {getErrorMessage} from './FormUtils'
import LabelCustom from './LabelCustom'

const SliderCustom = <T,>({
  color = 'primary',
  control,
  disabled = false,
  error,
  label,
  marks,
  max,
  min,
  minValidation,
  maxValidation,
  name,
  noLabel = false,
  orientation = 'horizontal',
  required = false,
  size = 'medium',
  step,
  sx,
  valueLabelDisplay = 'auto',
}: SliderCustomProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({field: {onChange, value}}: FieldValues) => (
      <Box sx={sx}>
        <LabelCustom
          error={error}
          noLabel={noLabel}
          label={label}
          name={name}
          required={required}
        />
        <Slider
          color={color}
          disabled={disabled}
          marks={marks}
          max={max}
          min={min}
          name={name}
          onChange={(_, data) => onChange(data)}
          orientation={orientation}
          size={size}
          step={step}
          value={value}
          valueLabelDisplay={valueLabelDisplay}
        />
        {Boolean(error) && (
          <FormHelperText error>
            {getErrorMessage(error, minValidation, maxValidation)}
          </FormHelperText>
        )}
      </Box>
    )}
  />
)

SliderCustom.propTypes = {}

export default SliderCustom
