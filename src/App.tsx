import React from 'react'
import Bpmn from './components/Bpmn'

const App = () => <Bpmn
  onTaskTarget={(e: CustomEvent) => console.log(e.detail)}
  onError={() => alert('error')}
/>

export default App
