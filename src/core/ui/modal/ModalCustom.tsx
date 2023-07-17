import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  Divider,
  DialogActions,
} from '@mui/material'
import PropTypes from 'prop-types'
import {ModalCustomProps} from './ModalTypes'
import {Transition} from './Transition'

const ModalCustom = ({
  actions,
  children,
  disableAutoFocus = false,
  maxWidth = 'md',
  onClose,
  open,
  scroll = 'paper',
  subtitle,
  sx,
  title,
}: ModalCustomProps) => (
  <Dialog
    fullWidth
    maxWidth={maxWidth}
    disableAutoFocus={disableAutoFocus}
    onClose={onClose}
    open={open}
    scroll={scroll}
    TransitionComponent={Transition}>
    {title || subtitle ? (
      <DialogTitle
        sx={{
          p: 3,
          ...sx,
        }}>
        {typeof title === 'string' ? (
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        ) : (
          title
        )}
        {typeof subtitle === 'string' ? (
          <Typography variant="subtitle2">{subtitle}</Typography>
        ) : (
          subtitle
        )}
      </DialogTitle>
    ) : null}
    <Divider />
    <DialogContent
      sx={{
        p: 3,
        ...sx,
      }}>
      {children}
    </DialogContent>
    {actions ? <DialogActions>{actions}</DialogActions> : null}
  </Dialog>
)

ModalCustom.propTypes = {
  actions: PropTypes.element,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  disableAutoFocus: PropTypes.bool,
  maxWidth: PropTypes.oneOf([
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    false,
    PropTypes.string,
  ]),
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  scroll: PropTypes.oneOf(['body', 'paper']),
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  subtitle: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
}

export default ModalCustom
