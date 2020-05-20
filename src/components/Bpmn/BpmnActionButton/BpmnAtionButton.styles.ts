import { Tooltip } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'


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

export const useBpmnActionButton = makeStyles(() => ({
  bpmnActionMuiButtonBase__Root: {
    borderRadius: '5%',
    boxShadow: 'none',
    color: '#4C6AA7',
    backgroundColor: '#E3EBF9',
    border: 'solid 2px #c1d8ff6b',
    zIndex: 1,
    '&:hover': {
      background: '#caddff',
    },
  },
}))
