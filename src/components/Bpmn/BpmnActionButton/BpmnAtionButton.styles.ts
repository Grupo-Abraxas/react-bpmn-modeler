import { Tooltip } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'


export const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#5f5f5f',
    color: 'white',
    maxWidth: 220,
    border: '1px solid #dadde9',
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold'
  },
}))(Tooltip)