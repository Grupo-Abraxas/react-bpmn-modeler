import { MouseEvent } from 'react'

export type ActionnButtonType = {
  actionButtonId: string
  actionButtonClass: string
  onClick: (event: MouseEvent<HTMLInputElement>) => void
}
