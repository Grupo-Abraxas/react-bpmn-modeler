import React, { FC, useRef, MutableRefObject } from 'react'
import Bpmn, { BpmnModelerType } from './components/Bpmn'

const App: FC = () => {
  const modelerRef: MutableRefObject<BpmnModelerType | undefined> = useRef()

  return (
    <Bpmn
      onTaskTarget={(e: CustomEvent): void => alert(e.detail)}
      onError={(error: Error): void => alert(error)}
      modelerInnerHeight={window.innerHeight}
      bpmnStringFile={''}
      modelerRef={modelerRef}
    />
  )
}

export default App
