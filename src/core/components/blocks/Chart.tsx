import PropTypes from 'prop-types'
import {
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import HelpOutlineTwoToneIcon from '@mui/icons-material/HelpOutlineTwoTone'
import CardCustom from 'src/core/ui/card/CardCustom'
import {ChartProps} from './BlocksTypes'

const Chart = ({chart, loading, sx, title, tooltip}: ChartProps) => {
  const {t} = useTranslation()

  return (
    <CardCustom
      fullHeight={false}
      header={
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3">{t(title)}</Typography>
          <Tooltip placement="top" arrow title={t(tooltip)}>
            <IconButton size="small" color="secondary">
              <HelpOutlineTwoToneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      }
      content={
        loading ? (
          <Box
            height={chart.props.height || 400}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          chart
        )
      }
      sx={{...sx}}
    />
  )
}

Chart.propTypes = {
  chart: PropTypes.element.isRequired,
  loading: PropTypes.bool,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
}

export default Chart
