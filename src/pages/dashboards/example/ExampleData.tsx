import {Grid, useTheme} from '@mui/material'
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone'
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone'
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone'
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone'
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import useGetUserStats from 'src/api/users/hooks/useGetUserStats'
import {useApp} from 'src/core/store/AppContext'
import {useLanguage} from 'src/core/language/LanguageContext'
import Card from 'src/core/components/blocks/Card'
import Chart from 'src/core/components/blocks/Chart'
import ChartAreaCustom from 'src/core/ui/charts/ChartAreaCustom'
import ChartBarCustom from 'src/core/ui/charts/ChartBarCustom'
import ChartPieCustom from 'src/core/ui/charts/ChartPieCustom'
import ChartLineCustom from 'src/core/ui/charts/ChartLineCustom'
import {DataChart, DataChartNumber} from 'src/core/ui/charts/ChartTypes'

const ExampleData = () => {
  const {t} = useTranslation()
  const theme = useTheme()
  const {getLanguage} = useLanguage()
  const {selected, getDataChart} = useApp()
  const {data, isLoading, isRefetching} = useGetUserStats(selected.period)

  const [dataChart, setDataChart] = useState<DataChart>({
    labels: [],
    series: [],
  })
  const [dataChart2, setDataChart2] = useState<DataChart>({
    labels: [],
    series: [],
  })
  const [dataChart3, setDataChart3] = useState<DataChartNumber>({
    labels: [],
    series: [],
  })
  const [dataChart4, setDataChart4] = useState<DataChartNumber>({
    labels: [],
    series: [],
  })
  const [dataChart5, setDataChart5] = useState<DataChart>({
    labels: [],
    series: [],
  })

  useEffect(() => {
    if (data) {
      const chart = getDataChart(
        data.datas.charts,
        'status',
        selected.period.code,
        ['Active users', 'Pending users', 'Inactive users'],
      )
      setDataChart({
        labels: chart.labels,
        series: chart.series,
      })

      const chart2 = getDataChart(
        data.datas.charts,
        'role',
        selected.period.code,
        ['Super administrators', 'Administrators', 'Users'],
      )
      setDataChart2({
        labels: chart2.labels,
        series: chart2.series,
      })

      setDataChart3({
        labels: [t('Active users'), t('Pending users'), t('Inactive users')],
        series: [
          data.datas.active.percent.current,
          data.datas.pending.percent.current,
          data.datas.inactive.percent.current,
        ],
      })

      setDataChart4({
        labels: [t('Super administrators'), t('Administrators'), t('Users')],
        series: [
          data.datas.superadmin.percent.current,
          data.datas.admin.percent.current,
          data.datas.user.percent.current,
        ],
      })

      const chart5 = getDataChart(
        data.datas.charts,
        'status',
        selected.period.code,
        ['Active users', 'Pending users', 'Inactive users'],
        ['line', 'line', 'line'],
      )

      const chart6 = getDataChart(
        data.datas.charts,
        'role',
        selected.period.code,
        ['Super administrators', 'Administrators', 'Users'],
        ['column', 'column', 'column'],
      )
      setDataChart5({
        labels: chart.labels,
        series: [...chart5.series, ...chart6.series],
      })
    }
  }, [data, getLanguage])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          icon={<PeopleAltTwoToneIcon />}
          gradient={theme.colors.gradients.purple}
          title="Total users"
          tooltip="Total users"
          type={selected.type.code}
          value={data?.datas.total.current}
          percent={data?.datas.total.variation}
          loading={isLoading || isRefetching}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          icon={<CheckCircleTwoToneIcon />}
          gradient={theme.colors.gradients.success}
          title="Total active users"
          tooltip="Total active users"
          type={selected.type.code}
          value={data?.datas.active.total.current}
          percent={data?.datas.active.total.variation}
          loading={isLoading || isRefetching}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          icon={<HourglassTopTwoToneIcon />}
          gradient={theme.colors.gradients.warning}
          title="Total pending users"
          tooltip="Total pending users"
          type={selected.type.code}
          value={data?.datas.pending.total.current}
          percent={data?.datas.pending.total.variation}
          loading={isLoading || isRefetching}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          icon={<CancelTwoToneIcon />}
          gradient={theme.colors.gradients.error}
          title="Total inactive users"
          tooltip="Total inactive users"
          type={selected.type.code}
          value={data?.datas.inactive.total.current}
          percent={data?.datas.inactive.total.variation}
          color={theme.colors.primary.main}
          loading={isLoading || isRefetching}
        />
      </Grid>
      <Grid item xs={12}>
        <Chart
          title="Total users by status"
          tooltip="Total users by status"
          loading={isLoading || isRefetching}
          chart={
            <ChartAreaCustom
              colors={[
                theme.colors.success.main,
                theme.colors.warning.main,
                theme.colors.error.main,
              ]}
              data={dataChart}
              formatter={(value) =>
                selected.type.code === 'amount'
                  ? value
                    ? t('currencyEURNoDigit', {value})
                    : t('currencyEURNoDigit', {value: '0'})
                  : value
                  ? t('number', {value: value.toFixed(0)})
                  : '0'
              }
            />
          }
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Chart
          title="Percent users by status"
          tooltip="Percent users by status"
          loading={isLoading || isRefetching}
          chart={
            <ChartPieCustom
              colors={[
                theme.colors.success.main,
                theme.colors.warning.main,
                theme.colors.error.main,
              ]}
              data={dataChart3}
              formatter={(value) =>
                selected.type.code === 'amount'
                  ? value
                    ? t('currencyEURNoDigit', {value})
                    : t('currencyEURNoDigit', {value: '0'})
                  : value
                  ? t('number', {value: value.toFixed(0)})
                  : '0'
              }
            />
          }
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card
              icon={<CheckCircleTwoToneIcon />}
              gradient={theme.colors.gradients.success}
              title="Percent active users"
              tooltip="Percent active users"
              type={selected.type.code}
              value={data?.datas.active.percent.current}
              percent={data?.datas.active.percent.variation}
              circular={true}
              color={theme.colors.success.main}
              loading={isLoading || isRefetching}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card
              icon={<HourglassTopTwoToneIcon />}
              gradient={theme.colors.gradients.warning}
              title="Percent pending users"
              tooltip="Percent pending users"
              type={selected.type.code}
              value={data?.datas.pending.percent.current}
              percent={data?.datas.pending.percent.variation}
              circular={true}
              color={theme.colors.warning.main}
              loading={isLoading || isRefetching}
              fullHeight={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card
              icon={<CancelTwoToneIcon />}
              gradient={theme.colors.gradients.error}
              title="Percent inactive users"
              tooltip="Percent inactive users"
              type={selected.type.code}
              value={data?.datas.inactive.percent.current}
              percent={data?.datas.inactive.percent.variation}
              circular={true}
              color={theme.colors.error.main}
              loading={isLoading || isRefetching}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          icon={<LockTwoToneIcon />}
          gradient={theme.colors.gradients.info}
          title="Total super administrators"
          tooltip="Total super administrators"
          type={selected.type.code}
          value={data?.datas.superadmin.total.current}
          percent={data?.datas.superadmin.total.variation}
          loading={isLoading || isRefetching}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          icon={<LockOpenTwoToneIcon />}
          gradient={theme.colors.gradients.primary}
          title="Total administrators"
          tooltip="Total administrators"
          type={selected.type.code}
          value={data?.datas.admin.total.current}
          percent={data?.datas.admin.total.variation}
          loading={isLoading || isRefetching}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Card
          icon={<AccountBoxTwoToneIcon />}
          gradient={theme.colors.gradients.secondary}
          title="Total users"
          tooltip="Total users"
          type={selected.type.code}
          value={data?.datas.user.total.current}
          percent={data?.datas.user.total.variation}
          color={theme.colors.primary.main}
          loading={isLoading || isRefetching}
        />
      </Grid>
      <Grid item xs={12}>
        <Chart
          title="Total users by role"
          tooltip="Total users by role"
          loading={isLoading || isRefetching}
          chart={
            <ChartBarCustom
              colors={[
                theme.colors.info.main,
                theme.colors.primary.main,
                theme.colors.secondary.main,
              ]}
              stacked={true}
              data={dataChart2}
              formatter={(value) =>
                selected.type.code === 'amount'
                  ? value
                    ? t('currencyEURNoDigit', {value})
                    : t('currencyEURNoDigit', {value: '0'})
                  : value
                  ? t('number', {value: value.toFixed(0)})
                  : '0'
              }
            />
          }
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card
              icon={<LockTwoToneIcon />}
              gradient={theme.colors.gradients.info}
              title="Percent super administrators"
              tooltip="Percent super administrators"
              type={selected.type.code}
              value={data?.datas.superadmin.percent.current}
              percent={data?.datas.superadmin.percent.variation}
              circular={true}
              color={theme.colors.info.main}
              loading={isLoading || isRefetching}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card
              icon={<LockOpenTwoToneIcon />}
              gradient={theme.colors.gradients.primary}
              title="Percent administrators"
              tooltip="Percent administrators"
              type={selected.type.code}
              value={data?.datas.admin.percent.current}
              percent={data?.datas.admin.percent.variation}
              circular={true}
              color={theme.colors.primary.main}
              loading={isLoading || isRefetching}
              fullHeight={true}
            />
          </Grid>
          <Grid item xs={12}>
            <Card
              icon={<AccountBoxTwoToneIcon />}
              gradient={theme.colors.gradients.secondary}
              title="Percent users"
              tooltip="Percent users"
              type={selected.type.code}
              value={data?.datas.user.percent.current}
              percent={data?.datas.user.percent.variation}
              circular={true}
              color={theme.colors.secondary.main}
              loading={isLoading || isRefetching}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Chart
          title="Percent users by role"
          tooltip="Percent users by role"
          loading={isLoading || isRefetching}
          chart={
            <ChartPieCustom
              type="donut"
              colors={[
                theme.colors.info.main,
                theme.colors.primary.main,
                theme.colors.secondary.main,
              ]}
              data={dataChart4}
              formatter={(value) =>
                selected.type.code === 'amount'
                  ? value
                    ? t('currencyEURNoDigit', {value})
                    : t('currencyEURNoDigit', {value: '0'})
                  : value
                  ? t('number', {value: value.toFixed(0)})
                  : '0'
              }
            />
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Chart
          title="All-in-one!"
          tooltip="All-in-one!"
          loading={isLoading || isRefetching}
          chart={
            <ChartLineCustom
              stacked={true}
              colors={[
                theme.colors.success.main,
                theme.colors.warning.main,
                theme.colors.error.main,
                theme.colors.info.main,
                theme.colors.primary.main,
                theme.colors.secondary.main,
              ]}
              data={dataChart5}
              formatter={(value) =>
                selected.type.code === 'amount'
                  ? value
                    ? t('currencyEURNoDigit', {value})
                    : t('currencyEURNoDigit', {value: '0'})
                  : value
                  ? t('number', {value: value.toFixed(0)})
                  : '0'
              }
            />
          }
        />
      </Grid>
    </Grid>
  )
}

export default ExampleData
