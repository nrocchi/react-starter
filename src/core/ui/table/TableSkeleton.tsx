import {Box, Skeleton, useTheme} from '@mui/material'

const TableSkeleton = () => {
  const theme = useTheme()

  return (
    <>
      <Box px={3} mb={3}>
        <Skeleton
          variant="rectangular"
          sx={{
            bgcolor: theme.colors.alpha.black[10],
            width: '100%',
            height: {xs: 90, sm: 38},
            borderRadius: theme.general.borderRadiusMd,
          }}
        />
      </Box>
      <Skeleton
        variant="rectangular"
        sx={{
          bgcolor: theme.colors.alpha.black[10],
          width: '100%',
          height: 50,
          borderRadius: theme.general.borderRadiusMd,
          marginBottom: 1,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          bgcolor: theme.colors.alpha.black[10],
          width: '100%',
          height: 50,
          borderRadius: theme.general.borderRadiusMd,
          marginBottom: 1,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          bgcolor: theme.colors.alpha.black[10],
          width: '100%',
          height: 50,
          borderRadius: theme.general.borderRadiusMd,
          marginBottom: 1,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          bgcolor: theme.colors.alpha.black[10],
          width: '100%',
          height: 50,
          borderRadius: theme.general.borderRadiusMd,
          marginBottom: 1,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          bgcolor: theme.colors.alpha.black[10],
          width: '100%',
          height: 50,
          borderRadius: theme.general.borderRadiusMd,
          marginBottom: 1,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          bgcolor: theme.colors.alpha.black[10],
          width: '100%',
          height: 50,
          borderRadius: theme.general.borderRadiusMd,
          marginBottom: 1,
        }}
      />
    </>
  )
}

export default TableSkeleton
