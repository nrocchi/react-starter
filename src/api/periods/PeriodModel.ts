export interface Period {
  status: string
  message: string
  datas: PeriodData
  pagination: Pagination
  total: number
}

export interface PeriodArray {
  status: string
  message: string
  datas: Array<PeriodData>
  pagination: Pagination
  total: number
}

export interface Pagination {
  current: number
  total: number
}

export interface PeriodData {
  id?: number
  code: string
  name: string
  order?: number
  created_at?: string
  updated_at?: string
}
