import React, { FC, useRef, MutableRefObject, Fragment } from 'react'
import Bpmn, { BpmnModelerType } from './components/Bpmn'

const App: FC = () => {
  const modelerRef: MutableRefObject<BpmnModelerType | undefined> = useRef()
  const bpmnModelerRef: MutableRefObject<JSX.Element> = useRef(
    <Bpmn
      modelerRef={modelerRef}
      bpmnStringFile={''}
      modelerInnerHeight={window.innerHeight}
      onElementChange={(xml: string): void => alert(xml)}
      onTaskTarget={(event: CustomEvent): void => alert(JSON.stringify(event.detail))}
      onError={(error: Error): void => alert(error)}
    />
  )

  return <Fragment>{bpmnModelerRef.current}</Fragment>
}

export default App
