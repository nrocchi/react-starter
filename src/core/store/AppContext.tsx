import {
  createContext,
  useReducer,
  useContext,
  ChangeEvent,
  SyntheticEvent,
  useCallback,
} from 'react'
import PropTypes from 'prop-types'
import {UserData} from 'src/api/users/UsersModel'
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone'
import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone'
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone'
import {Box, Chip, Tooltip, Typography, useTheme} from '@mui/material'
import {useTranslation} from 'react-i18next'
import {parseISO} from 'date-fns'
import _ from 'lodash'
import {DataChart} from 'src/core/ui/charts/ChartTypes'
import AppReducer from './AppReducer'
import {
  AppState,
  AppContextValue,
  AppProviderProps,
  FiltersArray,
} from './AppContextTypes'
import {
  SELECTED_PERIOD,
  SELECTED_TYPE,
  USERS_TABLE_COLUMNS,
  USERS_TABLE_FILTERS,
  USERS_TABLE_LIMIT,
  USERS_TABLE_ORDER,
  USERS_TABLE_ORDERBY,
  USERS_TABLE_PAGE,
  USERS_TABLE_QUERY,
  USERS_TABLE_ROWSPERPAGE,
  USERS_TABLE_SELECTED,
  USERS_TABLE_TOGGLEVIEW,
} from '../constants/Constants'

const initialState: AppState = {
  users: {
    columns: USERS_TABLE_COLUMNS,
    filters: USERS_TABLE_FILTERS,
    limit: USERS_TABLE_LIMIT,
    query: USERS_TABLE_QUERY,
    order: USERS_TABLE_ORDER,
    orderBy: USERS_TABLE_ORDERBY,
    page: USERS_TABLE_PAGE,
    selected: USERS_TABLE_SELECTED,
    toggleView: USERS_TABLE_TOGGLEVIEW,
    rowsPerPageOptions: USERS_TABLE_ROWSPERPAGE,
  },
  selected: {
    period: SELECTED_PERIOD,
    type: SELECTED_TYPE,
  },
}

export const AppContext = createContext<AppContextValue>({
  ...initialState,
  dispatch: () => {},
  handleFilters: () => () => {},
  handleFiltersArray: () => () => {},
  handleLimitChange: () => {},
  handlePageChange: () => {},
  handleQueryChange: () => {},
  handleReset: () => {},
  handleSelectAll: () => () => {},
  handleSelectOne: () => {},
  handleColumns: () => () => {},
  handleSort: () => () => {},
  handleTabsChange: () => () => {},
  handleToggleView: () => {},
  handleSelected: () => () => {},
  getTag: () => <></>,
  getArrow: () => <></>,
  getDataChart: () => null,
})

export const useApp = () => useContext(AppContext)

export const AppProvider = ({children}: AppProviderProps) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)
  const {t} = useTranslation()
  const theme = useTheme()

  const handleFilters =
    (filter: string, type: string) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      let value = null
      // if the input value is not 'all' we set the value
      // else the value is null
      if (event.target.value !== 'all') {
        value = event.target.value
      }

      // We update the filters
      const filters = updateFilters(filter, value, type)
      // We update the state
      dispatch({
        type: 'FILTERS',
        payload: {
          filters,
          page: 0,
          type,
        },
      })
    }

  const handleFiltersArray = (
    type: string,
    key: string,
    items: Array<FiltersArray>,
  ): void => {
    dispatch({
      type: 'FILTERS_ARRAY',
      payload: {
        items,
        type,
        key,
        page: 0,
      },
    })
  }

  const updateFilters = (
    filter: string,
    value: string,
    type: string,
  ): Record<string, string | null> | null => {
    // We copy the state (immutability)
    const filters = {...state[type].filters}
    // We create a new filter object
    const newFilter = {}
    // IF the filters are not null :
    //    We get the filter of the filter object (=== keys)
    //    and we find the new filter in the filters (=== key)
    //    IF the filter already exists :
    //        We create the entry with the existing filter in the newFilter object
    //    ELSE :
    //        We create the entry with the new filter in the newFilter object
    // ELSE :
    //    We create the entry with the new filter in the newFilter object
    if (filters) {
      const filterTypes = Object.keys(filters)
      const existingFilter = filterTypes.find((item) => item === filter)
      if (existingFilter) {
        // We create the entry with the existing filter
        newFilter[existingFilter] = value
      } else {
        // We create the entry with the new filter
        newFilter[filter] = value
      }
    } else {
      // We create the entry with the new filter
      newFilter[filter] = value
    }
    // We add the newFilter entries to the the filters object
    Object.assign(filters, newFilter)
    return filters
  }

  const handleLimitChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    page: number,
    total: number,
    type: string,
  ): void => {
    if (parseInt(event.target.value, 10) * page > total) {
      dispatch({
        type: 'PAGE',
        payload: {
          page: 0,
          type,
        },
      })
    }

    dispatch({
      type: 'LIMIT',
      payload: {
        limit: parseInt(event.target.value, 10),
        type,
      },
    })
  }

  const handlePageChange = (
    _event: SyntheticEvent,
    newPage: number,
    type: string,
  ): void => {
    dispatch({
      type: 'PAGE',
      payload: {
        page: newPage,
        type,
      },
    })
  }

  const handleQueryChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string,
  ): void => {
    event.persist()
    dispatch({
      type: 'QUERY',
      payload: {
        query: event.target.value,
        page: 0,
        type,
      },
    })
  }

  const handleSelectAll =
    (data: Array<Record<string, string | number>>, type: string) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      dispatch({
        type: 'SELECT',
        payload: {
          selected: event.target.checked ? data : [],
          type,
        },
      })
    }

  const handleSelectOne = (
    _event: ChangeEvent<HTMLInputElement>,
    selectedItem: Record<string, string | number>,
    type: string,
  ): void => {
    if (
      !state[type].selected.find(
        (item: UserData) => item.id === selectedItem.id,
      )
    ) {
      dispatch({
        type: 'SELECT',
        payload: {
          selected: [...state[type].selected, selectedItem],
          type,
        },
      })
    } else {
      dispatch({
        type: 'SELECT',
        payload: {
          selected: state[type].selected.filter(
            (item) => item.id !== selectedItem.id,
          ),
          type,
        },
      })
    }
  }

  const handleColumns = (
    hiddenItem:
      | Array<Record<string, string | number>>
      | Record<string, string | number>
      | null,
    type: string,
  ): void => {
    if (!hiddenItem) {
      dispatch({
        type: 'COLUMNS',
        payload: {
          columns: (state[type].columns = []),
          type,
        },
      })
    } else if (Array.isArray(hiddenItem)) {
      dispatch({
        type: 'COLUMNS',
        payload: {
          columns: (state[type].columns = hiddenItem),
          type,
        },
      })
    } else if (
      !state[type].columns.find((item: any) => item.id === hiddenItem.id)
    ) {
      dispatch({
        type: 'COLUMNS',
        payload: {
          columns: [...state[type].columns, hiddenItem],
          type,
        },
      })
    } else {
      dispatch({
        type: 'COLUMNS',
        payload: {
          columns: state[type].columns.filter(
            (item) => item.id !== hiddenItem.id,
          ),
          type,
        },
      })
    }
  }

  const handleSort = (orderBy: string, type: string) => (): void => {
    const isAsc = state[type].orderBy === orderBy && state[type].order === 'asc'
    dispatch({
      type: 'SORT',
      payload: {
        order: isAsc ? 'desc' : 'asc',
        orderBy,
        page: 0,
        type,
      },
    })
  }

  const handleTabsChange =
    (filter: string, type: string) =>
    (_event: SyntheticEvent, tabsValue: unknown): void => {
      let value = null
      // if the tab value is not 'all' we set the value
      // else the value is null
      if (tabsValue !== 'all') {
        value = tabsValue
      }
      // We update the filters
      const filters = updateFilters(filter, value, type)
      // We update the state
      dispatch({
        type: 'TABS',
        payload: {
          filters,
          selected: [],
          page: 0,
          type,
        },
      })
    }

  const handleToggleView = (
    _event: SyntheticEvent,
    selected: string | null,
    type: string,
  ) => {
    dispatch({
      type: 'TOGGLE',
      payload: {
        toggleView: selected,
        type,
      },
    })
  }

  const handleReset = (type: string) => {
    dispatch({
      type: 'RESET',
      payload: {
        filters: null,
        limit: 10,
        query: '',
        order: 'desc',
        orderBy: 'updated_at',
        page: 0,
        selected: [],
        type,
      },
    })
  }

  const handleSelected = useCallback(
    (type: string) =>
      (item: Record<string, string | number>): void => {
        dispatch({
          type: 'SELECTED',
          payload: {
            item,
            type,
          },
        })
      },
    [state.selected],
  )

  const getTag = (type: string, size: string = 'large'): JSX.Element => {
    const map = {
      // Role
      'Super administrator': {
        color: 'info',
      },
      Administrator: {
        color: 'primary',
      },
      User: {
        color: 'secondary',
      },
      // Status
      Active: {
        color: 'success',
      },
      Inactive: {
        color: 'error',
      },
      Pending: {
        color: 'warning',
      },
    }

    const {color}: any = map[type]

    return (
      <Chip
        label={t(type)}
        size="small"
        variant="outlined"
        sx={{
          color: theme.colors[color].main,
          bgcolor: theme.colors[color].lighter,
          fontWeight: 'bold',
          border: 'none',
          fontSize: size === 'small' ? 11 : 13,
          height: size === 'small' ? 21 : 24,
        }}
      />
    )
  }

  const getArrow = (value: number): JSX.Element => {
    const arrow = !value || value === 0 ? 'equal' : value > 0 ? 'more' : 'less'

    const map = {
      more: {
        color: 'success',
      },
      less: {
        color: 'error',
      },
      equal: {
        color: 'warning',
      },
    }

    const {color}: any = map[arrow]

    return (
      <Box>
        <Tooltip placement="bottom" arrow title={t('From last period')}>
          <Chip
            label={
              <Box display="flex">
                {arrow === 'more' ? (
                  <ArrowUpwardTwoToneIcon fontSize="small" />
                ) : arrow === 'less' ? (
                  <ArrowDownwardTwoToneIcon fontSize="small" />
                ) : (
                  <ArrowForwardTwoToneIcon fontSize="small" />
                )}
                <Typography fontWeight="bold">
                  {value
                    ? t('percent', {
                        value,
                      })
                    : t('percent', {
                        value: 0,
                      })}
                </Typography>
              </Box>
            }
            size="small"
            variant="outlined"
            sx={{
              color: theme.colors[color].main,
              bgcolor: theme.colors[color].lighter,
              border: 'none',
              cursor: 'pointer',
            }}
          />
        </Tooltip>
      </Box>
    )
  }

  const getLabelChart = (period: string, value: string) => {
    switch (period) {
      case 'TODAY':
      case 'YESTERDAY':
        return t('dates.hourDay', {value: parseISO(value)})
      case 'THISWEEK':
      case 'LASTWEEK':
        return t('dates.weekDay', {value: parseISO(value)})
      case 'THISMONTH':
      case 'LASTMONTH':
      case 'THISQUARTER':
      case 'LASTQUARTER':
        return t('dates.dayMonth', {value: parseISO(value)})
      case 'THISYEAR':
      case 'LASTYEAR':
        return t('dates.monthYear', {value: parseISO(value)})
      case 'LAST2YEARS':
      case 'LAST5YEARS':
        return t('dates.year', {value: parseISO(value)})
      default:
        break
    }
    return false
  }

  const getDataChart = (
    datas: any,
    key: string,
    period: string,
    names: Array<string>,
    type?: Array<string>,
  ): DataChart => {
    // Get the translated labels dates
    const labels = []

    datas.periods.map((item: any) => {
      const label = getLabelChart(period, item)
      labels.push(label)
      return false
    })

    // Get the data keys === the series names
    const dataKeys = Object.keys(datas.datas[key])

    // Get the data values for each data key
    // And we create the series array
    // each object contains the translated legend name and the associated datas
    const series = []
    dataKeys.forEach((dataKey, index) => {
      const serie: {name: string; type?: string; data: Array<number>} = {
        name: names ? t(names[index]) : t(dataKey),
        data: Object.values(datas.datas[key][dataKey]),
      }

      if (type) {
        serie.type = type[index]
      }

      series.push(serie)
    })

    return {labels, series}
  }

  const contextValues = {
    ...state,
    dispatch,
    handleFilters,
    handleFiltersArray,
    handleLimitChange,
    handlePageChange,
    handleQueryChange,
    handleReset,
    handleSelectAll,
    handleSelectOne,
    handleColumns,
    handleSort,
    handleTabsChange,
    handleToggleView,
    handleSelected,
    getArrow,
    getDataChart,
    getTag,
  }

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
