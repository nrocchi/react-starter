import {ReactNode} from 'react'
import PropTypes from 'prop-types'
import {Scrollbars} from 'react-custom-scrollbars-2'
import {Box, useTheme} from '@mui/material'
import {ScrollbarProps} from './ScrollbarTypes'

const Scrollbar = ({
  autoHeight = true,
  autoHeightMin = '100%',
  autoHeightMax = '80vh',
  className,
  children,
  ...rest
}: ScrollbarProps) => {
  const theme = useTheme()

  return (
    <Scrollbars
      autoHide
      autoHeight={autoHeight}
      autoHeightMin={autoHeightMin}
      autoHeightMax={autoHeightMax}
      renderThumbVertical={() => (
        <Box
          sx={{
            width: 5,
            background: `${theme.colors.alpha.black[10]}`,
            borderRadius: `${theme.general.borderRadiusLg}`,
            transition: `${theme.transitions.create(['background'])}`,

            '&:hover': {
              background: `${theme.colors.alpha.black[30]}`,
            },
          }}
        />
      )}
      {...rest}>
      {children}
    </Scrollbars>
  )
}

Scrollbar.propTypes = {
  autoHeight: PropTypes.bool,
  autoHeightMin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  autoHeightMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
}

export default Scrollbar
