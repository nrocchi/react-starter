import {useTheme} from '@mui/material'
import {ApexOptions} from 'apexcharts'
import Chart from 'react-apexcharts'
import {useTranslation} from 'react-i18next'
import {DataChart, DataChartNumber} from './ChartTypes'

const ChartLineCustom = ({
  colors,
  data,
  formatter,
  height = 400,
  stacked = false,
}: {
  colors?: string[]
  data: DataChart | DataChartNumber
  formatter?(val: number, opts?: any): string | string[]
  height?: number
  stacked?: boolean
}) => {
  const {t} = useTranslation()
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: true,
      },
      stacked,
      type: 'line',
    },
    stroke: {
      curve: 'smooth',
      width: [4, 4, 4],
    },
    markers: {
      size: 6,
    },
    colors: colors || [theme.colors.primary.main],
    dataLabels: {
      enabled: false,
    },
    grid: {
      strokeDashArray: 5,
      borderColor: theme.palette.divider,
    },
    legend: {
      show: true,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: 'top',
      horizontalAlign: 'left',
    },
    noData: {
      text: t('No chart data.'),
      style: {
        fontSize: '16px',
        fontFamily: 'Inter',
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      type: 'category',
      categories: data?.labels,
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      show: data?.series?.length > 0,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
        formatter,
      },
    },
  }

  return (
    <Chart
      options={options}
      series={data?.series}
      type="line"
      height={height}
    />
  )
}

export default ChartLineCustom
