import React from 'react'
import Bpmn from './components/Bpmn'

const App = (): JSX.Element => (
  <Bpmn
    onTaskTarget={(e: CustomEvent): void => alert(e.detail)}
    onError={(error: Error): void => alert(error)}
  />
)

export default App
