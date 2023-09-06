import {
  AppState,
  AppAction,
  FiltersAction,
  FiltersArrayAction,
  LimitAction,
  PageAction,
  QueryAction,
  SelectAction,
  ColumnsAction,
  ResetAction,
  SortAction,
  TabsAction,
  ToggleAction,
  SelectedAction,
} from './AppContextTypes'

const handlers: Record<
  string,
  (state: AppState, action: AppAction) => AppState
> = {
  FILTERS: (state: AppState, action: FiltersAction): AppState => {
    const {filters, page, type} = action.payload
    state[type].filters = filters
    state[type].page = page

    return {...state}
  },

  FILTERS_ARRAY: (state: AppState, action: FiltersArrayAction): AppState => {
    const {type, key, items, page} = action.payload
    state[type][key] = items
    state[type].page = page

    return {...state}
  },

  LIMIT: (state: AppState, action: LimitAction): AppState => {
    const {limit, type} = action.payload
    state[type].limit = limit

    return {...state}
  },

  PAGE: (state: AppState, action: PageAction): AppState => {
    const {page, type} = action.payload
    state[type].page = page

    return {...state}
  },

  QUERY: (state: AppState, action: QueryAction): AppState => {
    const {query, page, type} = action.payload
    state[type].query = query
    state[type].page = page

    return {...state}
  },

  RESET: (state: AppState, action: ResetAction): AppState => {
    const {filters, limit, query, order, orderBy, page, selected, type} =
      action.payload
    state[type].filters = filters
    state[type].limit = limit
    state[type].query = query
    state[type].order = order
    state[type].orderBy = orderBy
    state[type].page = page
    state[type].selected = selected

    return {...state}
  },

  SELECT: (state: AppState, action: SelectAction): AppState => {
    const {selected, type} = action.payload
    state[type].selected = selected

    return {...state}
  },

  COLUMNS: (state: AppState, action: ColumnsAction): AppState => {
    const {columns, type} = action.payload
    state[type].columns = columns

    return {...state}
  },

  SORT: (state: AppState, action: SortAction): AppState => {
    const {order, orderBy, page, type} = action.payload
    state[type].order = order
    state[type].orderBy = orderBy
    state[type].page = page

    return {...state}
  },

  TABS: (state: AppState, action: TabsAction): AppState => {
    const {filters, selected, page, type} = action.payload
    state[type].filters = filters
    state[type].selected = selected
    state[type].page = page

    return {...state}
  },

  TOGGLE: (state: AppState, action: ToggleAction): AppState => {
    const {toggleView, type} = action.payload
    state[type].toggleView = toggleView

    return {...state}
  },

  SELECTED: (state: AppState, action: SelectedAction): AppState => {
    const {item, type} = action.payload
    state.selected[type] = item

    return {...state}
  },
}

const AppReducer = (state: AppState, action: AppAction): AppState =>
  handlers[action.type] ? handlers[action.type](state, action) : state

export default AppReducer
