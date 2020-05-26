import React, { FC, useRef, MutableRefObject } from 'react'
import Bpmn, { BpmnModelerType } from './components/Bpmn'

const App: FC = () => {
  const modelerRef: MutableRefObject<BpmnModelerType | undefined> = useRef()

  return (
    <Bpmn
      modelerRef={modelerRef}
      onTaskTarget={(event: CustomEvent): void => alert(event.detail)}
      onError={(error: Error): void => alert(error)}
      modelerInnerHeight={window.innerHeight}
      bpmnStringFile={''}
      onElementChange={(xml: string): void => alert(xml)}
    />
  )
}

export default App
