import PropTypes from 'prop-types'
import {
  alpha,
  Box,
  Card,
  Collapse,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material'
import NotificationImportantTwoToneIcon from '@mui/icons-material/NotificationImportantTwoTone'
import CloseIcon from '@mui/icons-material/Close'
import {useTranslation} from 'react-i18next'
import {useState} from 'react'
import {AlertCustomProps} from './AlertTypes'

const AlertCustom = ({
  close = true,
  color = 'primary',
  content,
  icon,
  title,
  sx,
  variant = 'outlined',
}: AlertCustomProps) => {
  const {t} = useTranslation()
  const theme = useTheme()
  const [open, setOpen] = useState(true)

  return (
    <Collapse in={open}>
      <Card
        variant={variant}
        sx={{
          background: alpha(theme.colors[color].main, 0.2),
          display: 'flex',
          alignItems: icon ? 'center' : 'flex-start',
          p: 2,
          mb: 3,
          position: 'relative',
          ...sx,
        }}>
        {icon || (
          <NotificationImportantTwoToneIcon
            sx={{
              color: theme.colors[color].main,
            }}
          />
        )}
        <Box display="block" pl={1} pr={3}>
          {typeof title === 'string' ? (
            <Box>
              <Typography variant="h4">{title}</Typography>
            </Box>
          ) : (
            title
          )}
          {typeof content === 'string' ? (
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontSize: theme.typography.pxToRem(13),
                  fontStyle: 'italic',
                  textAlign: 'justify',
                }}>
                {content}
              </Typography>
            </Box>
          ) : (
            content
          )}
        </Box>
        {close ? (
          <IconButton
            aria-label="close"
            color="primary"
            size="small"
            sx={{position: 'absolute', top: 0, right: 0, m: 0.5}}
            onClick={() => {
              setOpen(false)
            }}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </Card>
    </Collapse>
  )
}

AlertCustom.propTypes = {
  close: PropTypes.bool,
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'success',
    'error',
    'info',
    'warning',
    PropTypes.string,
  ]),
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  icon: PropTypes.element,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  variant: PropTypes.oneOf(['elevation', 'outlined']),
}

export default AlertCustom
