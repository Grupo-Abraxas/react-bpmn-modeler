# react-bpmn-modeler #

React bpmn modeler (Beta)

## How to install ##

With npm

```bash
npm install @arkondata/react-bpmn-modeler
```

With yarn

```bash
yarn add @arkondata/react-bpmn-modeler
```

## How to use ##

With Typescript

```tsx
import React, { FC } from 'react'
import Bpmn from './components/Bpmn'

const App: FC = () => (
  <Bpmn
    onTaskTarget={(e: CustomEvent): void => alert(e.detail)}
    onError={(error: Error): void => alert(error)}
  />
)

export default App
```

With Jsx

```jsx
import React from 'react'
import Bpmn from './components/Bpmn'

const App = () => (
  <Bpmn
    onTaskTarget={(e: CustomEvent): void => alert(e.detail)}
    onError={(error: Error): void => alert(error)}
  />
)

export default App
```
