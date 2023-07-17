import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import HelpOutlineTwoToneIcon from '@mui/icons-material/HelpOutlineTwoTone'
import {useApp} from 'src/core/store/AppContext'
import CardCustom from 'src/core/ui/card/CardCustom'
import CircularProgressCustom from 'src/core/ui/progress/CircularProgressCustom'
import {CardProps} from './BlocksTypes'

const Card = ({
  circular = false,
  color,
  fullHeight,
  gradient,
  icon,
  loading,
  percent,
  title,
  tooltip,
  type,
  value,
  variant = 'h4',
}: CardProps) => {
  const {t} = useTranslation()
  const theme = useTheme()
  const {getArrow} = useApp()

  return (
    <CardCustom
      fullHeight={fullHeight}
      header={
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{
                mr: 1,
                background: gradient || theme.colors.gradients.blue1,
              }}>
              {icon}
            </Avatar>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="text.primary">
              {t(title)}
            </Typography>
          </Box>
          <Box>
            <Tooltip placement="top" arrow title={t(tooltip)}>
              <IconButton size="small" color="secondary">
                <HelpOutlineTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      }
      content={
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
          justifyContent="center"
          alignItems="center">
          {loading ? (
            <Box
              height={circular ? 136 : 60}
              display="flex"
              alignItems="center"
              justifyContent="center">
              <CircularProgress />
            </Box>
          ) : value === undefined ? (
            <Typography variant="h3" fontWeight="bold" color="text.secondary">
              NC
            </Typography>
          ) : (
            <>
              {circular ? (
                <CircularProgressCustom
                  thickness={5}
                  size={100}
                  variant={variant}
                  data={value}
                  color={color}
                  sx={{mb: 1.5}}
                />
              ) : type === 'amount' ? (
                <Typography variant="h3" sx={{mb: 1}}>
                  {value
                    ? t('currencyEUR', {
                        value,
                      })
                    : t('currencyEUR', {
                        value: 0,
                      })}
                </Typography>
              ) : (
                <Typography variant="h3" sx={{mb: 1}}>
                  {value
                    ? t('number', {
                        value,
                      })
                    : t('number', {
                        value: 0,
                      })}
                </Typography>
              )}
              {getArrow(percent)}
            </>
          )}
        </Box>
      }
    />
  )
}

Card.propTypes = {
  color: PropTypes.string,
  circular: PropTypes.bool,
  fullHeight: PropTypes.bool,
  gradient: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  loading: PropTypes.bool,
  percent: PropTypes.number,
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['amount', 'quantity']).isRequired,
  value: PropTypes.number,
}

export default Card
