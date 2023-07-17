import PropTypes from 'prop-types'
import {Popover} from '@mui/material'
import {PopoverCustomProps} from './PopoverTypes'

const PopoverCustom = ({
  anchorEl,
  anchorOrigin,
  children,
  onClose,
  open,
  transformOrigin,
}: PopoverCustomProps) => (
  <Popover
    disableScrollLock
    anchorEl={anchorEl}
    onClose={onClose}
    open={open}
    anchorOrigin={
      anchorOrigin || {
        vertical: 'bottom',
        horizontal: 'right',
      }
    }
    transformOrigin={
      transformOrigin || {
        vertical: 'top',
        horizontal: 'right',
      }
    }>
    {children}
  </Popover>
)

PopoverCustom.propTypes = {
  anchorEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(Element),
  ]),
  anchorOrigin: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  transformOrigin: PropTypes.object,
}

export default PopoverCustom
