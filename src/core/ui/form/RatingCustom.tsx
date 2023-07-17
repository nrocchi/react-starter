import PropTypes from 'prop-types'
import {Box, FormControl, FormHelperText, Rating} from '@mui/material'
import {Controller, FieldValues} from 'react-hook-form'
import {useState} from 'react'
import {RatingCustomProps} from './FormTypes'
import {getErrorMessage} from './FormUtils'
import LabelCustom from './LabelCustom'

const RatingCustom = <T,>({
  control,
  emptyIcon,
  error,
  highlightSelectedOnly = false,
  icon,
  label,
  name,
  noLabel = false,
  precision = 1,
  max = 5,
  required = false,
  size = 'medium',
  sx,
}: RatingCustomProps<T>) => {
  const [hover, setHover] = useState<number>(-1)

  return (
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
          <Box display="flex" alignItems="center">
            <Rating
              emptyIcon={emptyIcon}
              highlightSelectedOnly={highlightSelectedOnly}
              icon={icon}
              max={max}
              onBlur={onBlur}
              onChange={onChange}
              onChangeActive={(_, newHover) => {
                setHover(newHover)
              }}
              precision={precision}
              size={size}
              value={parseFloat(value)}
            />
            <Box sx={{ml: 1}}>{`${hover !== -1 ? hover : value} / ${max}`}</Box>
          </Box>
          {Boolean(error) && (
            <FormHelperText error>{getErrorMessage(error)}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}

RatingCustom.propTypes = {
  emptyIcon: PropTypes.element,
  error: PropTypes.object,
  highlightSelectedOnly: PropTypes.bool,
  icon: PropTypes.element,
  label: PropTypes.string,
  max: PropTypes.number,
  name: PropTypes.string.isRequired,
  noLabel: PropTypes.bool,
  precision: PropTypes.number,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large', PropTypes.string]),
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
}

export default RatingCustom
