import {ChangeEvent, Dispatch, ReactNode, SyntheticEvent} from 'react'
import {PeriodData} from 'src/api/periods/PeriodModel'
import {Type} from 'src/api/type/TypeModel'
import {UserStatsDataCharts} from 'src/api/users/UsersModel'
import {DataChart} from 'src/core/ui/charts/ChartTypes'

export interface AppStateTable {
  filters: Record<string, string | null> | null
  limit: number
  query: string
  order: 'asc' | 'desc'
  orderBy: string
  page: number
  selected: Array<Record<string, string | number>>
  toggleView: string | null
  rowsPerPageOptions: Array<number>
}

export interface AppState {
  users: AppStateTable
  selected: {
    period: PeriodData
    type: Type
  }
}

export interface AppContextValue extends AppState {
  dispatch: Dispatch<AppAction>
  handleFilters: (
    filter: string,
    type: string,
  ) => (event: ChangeEvent<HTMLInputElement>) => void
  handleLimitChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    total: number,
    type: string,
  ) => void
  handlePageChange: (
    _event: SyntheticEvent,
    newPage: number,
    type: string,
  ) => void
  handleQueryChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string,
  ) => void
  handleReset: (type: string) => void
  handleSelectAll: (
    data: Array<Record<string, string | number>>,
    type: string,
  ) => (event: ChangeEvent<HTMLInputElement>) => void
  handleSelectOne: (
    _event: ChangeEvent<HTMLInputElement>,
    selectedItem: Record<string, string | number>,
    type: string,
  ) => void
  handleSort: (property: any, type: string) => () => void
  handleTabsChange: (
    filter: string,
    type: string,
  ) => (_event: SyntheticEvent, tabsValue: unknown) => void
  handleToggleView: (
    _event: SyntheticEvent,
    selected: string | null,
    type: string,
  ) => void
  handleSelected: (
    type: string,
  ) => (item: Record<string, string | number>) => void
  getTag: (type: string, size?: string) => JSX.Element
  getArrow: (value: number) => JSX.Element
  getDataChart: (
    datas: UserStatsDataCharts,
    key: string,
    period: string,
    names?: Array<string>,
    type?: Array<string>,
  ) => DataChart
}

export interface AppProviderProps {
  children: ReactNode
}

export type FiltersAction = {
  type: 'FILTERS'
  payload: {
    filters: Record<string, string | null>
    page: number
    type: string
  }
}

export type LimitAction = {
  type: 'LIMIT'
  payload: {
    limit: number
    type: string
  }
}

export type PageAction = {
  type: 'PAGE'
  payload: {
    page: number
    type: string
  }
}

export type QueryAction = {
  type: 'QUERY'
  payload: {
    query: string
    page: number
    type: string
  }
}

export type ResetAction = {
  type: 'RESET'
  payload: {
    filters: Record<string, string | null>
    limit: number
    query: string
    order: 'asc' | 'desc'
    orderBy: string
    page: number
    selected: Array<Record<string, string | number>>
    type: string
  }
}

export type SelectAction = {
  type: 'SELECT'
  payload: {
    selected: Array<Record<string, string | number>>
    type: string
  }
}

export type SortAction = {
  type: 'SORT'
  payload: {
    order: 'asc' | 'desc'
    orderBy: string
    page: number
    type: string
  }
}

export type TabsAction = {
  type: 'TABS'
  payload: {
    filters: Record<string, string | null>
    selected: Array<Record<string, string | number>>
    page: number
    type: string
  }
}

export type ToggleAction = {
  type: 'TOGGLE'
  payload: {
    toggleView: string | null
    type: string
  }
}

export type SelectedAction = {
  type: 'SELECTED'
  payload: {
    item:
      | Record<string, string | number>
      | Array<Record<string, string | number>>
    // | Array<Record<string, string>>
    // | Record<string, string>
    type: string
  }
}

export type AppAction =
  | FiltersAction
  | LimitAction
  | PageAction
  | QueryAction
  | ResetAction
  | SelectAction
  | SortAction
  | TabsAction
  | ToggleAction
  | SelectedAction
