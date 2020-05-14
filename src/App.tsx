import React from 'react'
import Bpmn from './components/Bpmn'

const App = () => <Bpmn
  onTaskTarget={(e: CustomEvent) => alert(e.detail)}
  onError={(error: string) => alert(error)}
/>

export default App
