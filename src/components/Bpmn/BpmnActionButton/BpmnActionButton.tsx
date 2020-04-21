import React from 'react'
import { Fab, Tooltip } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
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


const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#5f5f5f',
    color: 'white',
    maxWidth: 220,
    border: '1px solid #dadde9',
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold'
  },
}))(Tooltip)


export default (props: { iconType: string, tooltipTitle: string, onClick: any }) => <>
  <HtmlTooltip
    title={<Typography color='inherit'>{props.tooltipTitle}</Typography>}
  >
    <Fab size='small' onClick={props.onClick}>
      {props.iconType === FOCUS_ICON && <CenterFocusStrongIcon />}
      {props.iconType === ZOOM_IN_ICON && <ZoomInIcon />}
      {props.iconType === ZOOM_OUT_ICON && <ZoomOutIcon />}
      {props.iconType === FULLSCREEN_ICON && <FullscreenSharpIcon />}
      {props.iconType === FULLSCREEN_EXIT_ICON && <FullscreenExitSharpIcon />}
    </Fab>
  </HtmlTooltip>
</>
