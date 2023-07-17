import {Grid, Skeleton, useTheme} from '@mui/material'
import TableSkeleton from 'src/core/ui/table/TableSkeleton'

const Skeletons = () => {
  const theme = useTheme()

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} xl={6}>
          <Skeleton
            variant="rectangular"
            sx={{
              bgcolor: theme.colors.alpha.black[10],
              width: '100%',
              height: 512,
              borderRadius: theme.general.borderRadiusMd,
            }}
          />
        </Grid>
        <Grid item xs={12} xl={6}>
          <Skeleton
            variant="rectangular"
            sx={{
              bgcolor: theme.colors.alpha.black[10],
              width: '100%',
              height: 512,
              borderRadius: theme.general.borderRadiusMd,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TableSkeleton />
        </Grid>
      </Grid>
    </>
  )
}

export default Skeletons
