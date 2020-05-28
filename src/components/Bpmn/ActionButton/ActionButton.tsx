import React, { FC } from 'react'
import { ActionnButtonType } from './types'

const ActionnButton: FC<ActionnButtonType> = ({ actionButtonId, actionButtonClass, onClick }) => (
  <div id={actionButtonId} className={actionButtonClass} onClick={onClick} />
)

export default ActionnButton
