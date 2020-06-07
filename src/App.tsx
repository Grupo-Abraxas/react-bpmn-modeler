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
      onTaskLabelTarget={(event: CustomEvent): void => {
        const modeling = modelerRef?.current?.get('modeling')
        const elementRegistry = modelerRef?.current?.get('elementRegistry')
        const element = elementRegistry.get(event.detail.id)
        modeling.updateProperties(element, { name: 'Example task label' })
      }}
      onError={(error: Error): void => alert(error)}
    />
  )

  return <Fragment>{bpmnModelerRef.current}</Fragment>
}

export default App
