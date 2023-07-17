export interface DataChart {
  labels: Array<string>
  series: Array<DataSeries>
}
export interface DataChartNumber {
  labels: Array<string>
  series: Array<number>
}

export interface DataSeries {
  name?: string
  type?: string
  data: Array<number>
}
