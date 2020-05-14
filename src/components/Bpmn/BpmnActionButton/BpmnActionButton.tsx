import React, { FC } from 'react'

import { Fab } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import { BpmnActionButtonType } from './types'
import { HtmlTooltip, useBpmnActionButton } from './BpmnAtionButton.styles'


const BpmnActionButton: FC<BpmnActionButtonType> = ({ icon, tooltipTitle, onClick, stringStyles = {} }) => {
  const classes = useBpmnActionButton()
  return <>
    <HtmlTooltip
      title={<Typography color='inherit'>{tooltipTitle}</Typography>}
    >
      <Fab
        classes={{ root: `${classes.bpmnActionMuiButtonBase__Root} ${stringStyles}` }} size='small' onClick={onClick}
      >
        {icon}
      </Fab>
    </HtmlTooltip>
  </>
}

export default BpmnActionButton
