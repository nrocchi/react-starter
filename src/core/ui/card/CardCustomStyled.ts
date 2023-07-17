import {
  styled,
  LinearProgress,
  linearProgressClasses,
  alpha,
} from '@mui/material'

export const LinearProgressPrimary = styled(LinearProgress)(
  ({theme}) => `
        height: 12px;
        border-radius: ${theme.general.borderRadiusSm};

        &.${linearProgressClasses.colorPrimary} {
            background-color: ${alpha(theme.colors.primary.main, 0.1)};
            box-shadow: inset 0 1px 2px ${alpha(
              theme.colors.primary.dark,
              0.2,
            )};
        }
        
        & .${linearProgressClasses.bar} {
            border-radius: ${theme.general.borderRadiusSm};
            background-color: ${theme.colors.primary.main};
        }
    `,
)
