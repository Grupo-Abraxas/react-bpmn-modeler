import { makeStyles } from '@material-ui/core/styles'

export const useBpmnActionButtons = makeStyles(() => ({
  bpmnZoomInButton: {
    borderRadius: '0%',
    position: 'absolute',
    right: '20px',
    bottom: '116px',
  },
  bpmnZoomOutButton: {
    borderRadius: '0%',
    position: 'absolute',
    right: '20px',
    bottom: '74px',
  },
  bpmnCenterButton: {
    borderRadius: '0%',
    position: 'absolute',
    right: '20px',
    bottom: '170px',
  },
  bpmnFullscreenButton: {
    borderRadius: '0%',
    position: 'absolute',
    right: '20px',
    bottom: '20px',
  },
}))
