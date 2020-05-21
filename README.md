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
import { Bpmn } from '@arkondata/react-bpmn-modeler/lib/components'

const App: FC = () => (
  <Bpmn
    onTaskTarget={(event: CustomEvent): void => alert(event.detail)}
    onError={(error: Error): void => alert(error)}
    modelerInnerHeight={window.innerHeight}
    bpmnStringFile={''}
  />
)

export default App
```

With Jsx

```jsx
import React from 'react'
import { Bpmn } from '@arkondata/react-bpmn-modeler/lib/components'

const App = () => (
  <Bpmn
    onTaskTarget={event => alert(event.detail)}
    onError={error => alert(error)}
    modelerInnerHeight={window.innerHeight}
    bpmnStringFile={''}
  />
)

export default App
```
