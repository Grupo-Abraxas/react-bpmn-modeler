import React, { FC } from 'react'

import { Fab } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import {
  CenterFocusStrong as CenterFocusStrongIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  FullscreenSharp as FullscreenSharpIcon,
  FullscreenExitSharp as FullscreenExitSharpIcon,
} from '@material-ui/icons'

import {
  FOCUS_ICON,
  ZOOM_IN_ICON,
  ZOOM_OUT_ICON,
  FULLSCREEN_ICON,
  FULLSCREEN_EXIT_ICON,
} from './consts'

import { BpmnActionButtonType } from './types'
import { HtmlTooltip } from './BpmnAtionButton.styles'


const BpmnActionButton: FC<BpmnActionButtonType> = ({ iconType, tooltipTitle, onClick }) => <>
  <HtmlTooltip
    title={<Typography color='inherit'>{tooltipTitle}</Typography>}
  >
    <Fab size='small' onClick={onClick}>
      {iconType === FOCUS_ICON && <CenterFocusStrongIcon />}
      {iconType === ZOOM_IN_ICON && <ZoomInIcon />}
      {iconType === ZOOM_OUT_ICON && <ZoomOutIcon />}
      {iconType === FULLSCREEN_ICON && <FullscreenSharpIcon />}
      {iconType === FULLSCREEN_EXIT_ICON && <FullscreenExitSharpIcon />}
    </Fab>
  </HtmlTooltip>
</>

export default BpmnActionButton
