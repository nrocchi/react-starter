import {useTheme} from '@mui/material'
import {ApexOptions} from 'apexcharts'
import Chart from 'react-apexcharts'
import {useTranslation} from 'react-i18next'
import {DataChart, DataChartNumber} from './ChartTypes'

const ChartPieCustom = ({
  colors,
  data,
  formatter,
  height = 400,
  type = 'pie',
}: {
  colors?: string[]
  data: DataChart | DataChartNumber
  formatter?(value: number, opts?: any): string
  height?: number
  type?: 'pie' | 'donut'
}) => {
  const {t} = useTranslation()
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: true,
      },
    },
    colors: colors || [theme.colors.primary.main],
    theme: {
      mode: theme.palette.mode,
    },
    labels: data?.labels,
    dataLabels: {
      enabled: true,
    },
    legend: {
      position: 'top',
    },
    noData: {
      text: t('No chart data.'),
      style: {
        fontSize: '16px',
        fontFamily: 'Inter',
      },
    },
    tooltip: {
      theme: theme.palette.mode,
      fillSeriesColor: false,
      y: {
        formatter,
      },
    },
  }

  return (
    <Chart
      options={options}
      series={data?.series}
      type={type}
      height={height}
    />
  )
}

export default ChartPieCustom
