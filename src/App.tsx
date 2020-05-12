import React from 'react'
import Bpmn from './components/Bpmn'

const App = () => <Bpmn onTaskTarget={(e: CustomEvent) => console.log(e.detail)} />

export default App
