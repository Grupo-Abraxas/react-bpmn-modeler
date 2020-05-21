import React, { FC } from 'react'
import Bpmn from './components/Bpmn'

const App: FC = () => (
  <Bpmn
    onTaskTarget={(e: CustomEvent): void => alert(e.detail)}
    onError={(error: Error): void => alert(error)}
    modelerInnerheight={window.innerHeight}
    bpmnStringFile={''}
  />
)

export default App
