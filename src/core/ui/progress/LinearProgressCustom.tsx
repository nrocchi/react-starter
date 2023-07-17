import PropTypes from 'prop-types'
import {
  Box,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import HelpOutlineTwoToneIcon from '@mui/icons-material/HelpOutlineTwoTone'
import {useTranslation} from 'react-i18next'
import {LinearProgressCustomProps} from './ProgressTypes'
import {LinearProgressStyled} from './ProgressStyled'

const LinearProgressCustom = ({
  barColor,
  color = 'primary',
  gradient,
  sx,
  tooltip,
  total,
  value,
}: LinearProgressCustomProps) => {
  const {t} = useTranslation()
  const theme = useTheme()
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          ...sx,
        }}>
        <Box display="flex" alignItems="center">
          <Typography variant="h3" mb={0} mr={0.5}>
            {t('number', {
              value,
            })}
          </Typography>
          <Typography variant="caption" color="text.secondary" mr={0.5}>
            /
          </Typography>
          <Typography variant="caption" color="text.secondary" mr={1}>
            {t('number', {
              value: total,
            })}
          </Typography>
          {tooltip ? (
            <Tooltip placement="top" arrow title={tooltip}>
              <IconButton size="small" color="secondary">
                <HelpOutlineTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : null}
        </Box>
        <Chip
          label={t('percent', {
            value: (value * 100) / total,
          })}
          size="small"
          variant="outlined"
          sx={
            (value * 100) / total <= 25
              ? {
                  color: theme.palette.error.main,
                  bgcolor: theme.colors.error.lighter,
                  fontWeight: 'bold',
                  border: 'none',
                }
              : (value * 100) / total <= 50
              ? {
                  color: theme.palette.warning.main,
                  bgcolor: theme.colors.warning.lighter,
                  fontWeight: 'bold',
                  border: 'none',
                }
              : {
                  color: theme.palette.success.main,
                  bgcolor: theme.colors.success.lighter,
                  fontWeight: 'bold',
                  border: 'none',
                }
          }
        />
      </Box>
      <LinearProgressStyled
        color={color}
        gradient={gradient}
        barColor={barColor}
        variant="determinate"
        value={(value * 100) / total}
      />
    </Box>
  )
}

LinearProgressCustom.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'error',
    'info',
    'success',
    'warning',
    'inherit',
    PropTypes.string,
  ]),
  barColor: PropTypes.string,
  gradient: PropTypes.string,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  tooltip: PropTypes.string,
  total: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

export default LinearProgressCustom
