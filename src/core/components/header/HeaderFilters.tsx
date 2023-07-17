import useGetPeriod from 'src/api/periods/hooks/useGetPeriod'
import ButtonSelect from 'src/core/ui/buttons/ButtonSelect'
import {useApp} from 'src/core/store/AppContext'
import {Skeleton, useTheme} from '@mui/material'

const HeaderFilters = () => {
  const theme = useTheme()
  const {selected, handleSelected} = useApp()
  const {
    data: periods,
    isLoading: isLoadingPeriods,
    isError: isErrorPeriods,
  } = useGetPeriod()

  return (
    <>
      {isLoadingPeriods ? (
        <Skeleton
          variant="rectangular"
          sx={{
            bgcolor: theme.colors.alpha.black[10],
            width: 134,
            height: 42.5,
            borderRadius: theme.general.borderRadiusMd,
            mr: 1,
            mb: 2,
          }}
        />
      ) : !isErrorPeriods ? (
        <ButtonSelect
          handleSelect={handleSelected('period')}
          defaultValue={selected.period}
          datas={periods?.datas}
          sx={{
            mr: 1,
            mb: 2,
          }}
        />
      ) : null}
    </>
  )
}

export default HeaderFilters
