import React, { FC } from 'react'

import { Fab } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import {
  GpsNotFixed as CenterFocusStrongIcon,
  Add as ZoomInIcon,
  Remove as ZoomOutIcon,
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
import { HtmlTooltip, useBpmnActionButton } from './BpmnAtionButton.styles'


const BpmnActionButton: FC<BpmnActionButtonType> = ({ iconType, tooltipTitle, onClick, styles = {} }) => {
  const classes = useBpmnActionButton()
  return <>
    <HtmlTooltip
      title={<Typography color='inherit'>{tooltipTitle}</Typography>}
    >
      <Fab classes={{ root: `${classes.bpmnActionMuiButtonBase__Root} ${styles}` }} size='small' onClick={onClick}>
        {iconType === FOCUS_ICON && <CenterFocusStrongIcon fontSize='large' />}
        {iconType === ZOOM_IN_ICON && <ZoomInIcon fontSize='large' />}
        {iconType === ZOOM_OUT_ICON && <ZoomOutIcon fontSize='large' />}
        {iconType === FULLSCREEN_ICON && <FullscreenSharpIcon fontSize='large' />}
        {iconType === FULLSCREEN_EXIT_ICON && <FullscreenExitSharpIcon fontSize='large' />}
      </Fab>
    </HtmlTooltip>
  </>
}

export default BpmnActionButton
