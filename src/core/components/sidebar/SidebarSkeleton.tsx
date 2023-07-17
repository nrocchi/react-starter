import {Skeleton, useTheme} from '@mui/material'

const SidebarSkeleton = () => {
  const theme = useTheme()

  return (
    <>
      <Skeleton
        variant="rectangular"
        sx={{
          bgcolor: theme.colors.alpha.trueWhite[10],
          width: '100%',
          height: 43,
          borderRadius: theme.general.borderRadiusMd,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          bgcolor: theme.colors.alpha.trueWhite[10],
          width: '50%',
          height: 17,
          borderRadius: theme.general.borderRadiusMd,
          mt: 3,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          bgcolor: theme.colors.alpha.trueWhite[10],
          width: '100%',
          height: 43,
          borderRadius: theme.general.borderRadiusMd,
          mt: 1,
          mb: 0.5,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          bgcolor: theme.colors.alpha.trueWhite[10],
          width: '100%',
          height: 43,
          borderRadius: theme.general.borderRadiusMd,
          mt: 1,
          mb: 0.5,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          bgcolor: theme.colors.alpha.trueWhite[10],
          width: '100%',
          height: 43,
          borderRadius: theme.general.borderRadiusMd,
          mt: 1,
          mb: 0.5,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          bgcolor: theme.colors.alpha.trueWhite[10],
          width: '100%',
          height: 43,
          borderRadius: theme.general.borderRadiusMd,
          mt: 1,
          mb: 0.5,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          bgcolor: theme.colors.alpha.trueWhite[10],
          width: '50%',
          height: 17,
          borderRadius: theme.general.borderRadiusMd,
          mt: 3,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          bgcolor: theme.colors.alpha.trueWhite[10],
          width: '100%',
          height: 43,
          borderRadius: theme.general.borderRadiusMd,
          mt: 1,
          mb: 0.5,
        }}
      />
    </>
  )
}

export default SidebarSkeleton
