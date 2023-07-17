import {Slide} from '@mui/material'
import {TransitionProps} from '@mui/material/transitions'
import {forwardRef, ReactElement, Ref} from 'react'

export const Transition = forwardRef(
  (
    props: TransitionProps & {children: ReactElement<any, any>},
    ref: Ref<unknown>,
  ) => <Slide direction="down" ref={ref} {...props} />,
)
