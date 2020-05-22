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
import React, { FC, MutableRefObject, useRef } from 'react'
import { Bpmn } from '@arkondata/react-bpmn-modeler/lib/components'

const App: FC = () => {
  const bpmnModeler: MutableRefObject<JSX.Element> = useRef(<Bpmn
    onTaskTarget={(event: CustomEvent): void => alert(event.detail)}
    onError={(error: Error): void => alert(error)}
    modelerInnerHeight={window.innerHeight - 110}
    bpmnStringFile={''}
  />)

  return ({bpmnModeler.current})
}

export default App
```

With Jsx

```jsx
import React, { useRef } from 'react'
import { Bpmn } from '@arkondata/react-bpmn-modeler/lib/components'

const App = () => {
  const bpmnModeler = useRef(<Bpmn
    onTaskTarget={event => alert(event.detail)}
    onError={error => alert(error)}
    modelerInnerHeight={window.innerHeight - 110}
    bpmnStringFile={''}
  />)

  return ({bpmnModeler.current})
}

export default App
```
