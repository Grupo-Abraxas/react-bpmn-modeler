import React, { FC, useRef, MutableRefObject } from 'react'
import Bpmn, { BpmnModelerType } from './components/Bpmn'

const App: FC = () => {
  const modelerRef: MutableRefObject<BpmnModelerType | undefined> = useRef()
  const bpmnModelerRef: MutableRefObject<JSX.Element> = useRef(
    <Bpmn
      modelerRef={modelerRef}
      onTaskTarget={(event: CustomEvent): void => alert(JSON.stringify(event.detail))}
      onError={(error: Error): void => alert(error)}
      modelerInnerHeight={window.innerHeight}
      bpmnStringFile={''}
      onElementChange={(xml: string): void => alert(xml)}
    />
  )

  return <>{bpmnModelerRef.current}</>
}

export default App
