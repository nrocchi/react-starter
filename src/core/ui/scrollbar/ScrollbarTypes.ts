import {ReactNode} from 'react'

export interface ScrollbarProps {
  autoHeight?: boolean
  autoHeightMin?: number | string
  autoHeightMax?: number | string
  className?: string
  children?: ReactNode
}
