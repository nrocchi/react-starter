import axios from 'src/api/axiosAPI'
import {API_ROUTE_PERIOD} from 'src/core/constants/Constants'
import {PeriodArray} from './PeriodModel'

export const getPeriods = async (): Promise<PeriodArray> => {
  const {data} = await axios.get<PeriodArray>(API_ROUTE_PERIOD)
  return data
}
