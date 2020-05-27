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

With React Typescript

```tsx
import React, { FC, useRef, MutableRefObject } from 'react'
import { Bpmn, BpmnModelerType } from '@arkondata/react-bpmn-modeler/lib/components'

const App: FC = () => {
  const modelerRef: MutableRefObject<BpmnModelerType | undefined> = useRef()
  const bpmnModelerRef: MutableRefObject<JSX.Element> = useRef(
    <Bpmn
      modelerRef={modelerRef}
      onTaskTarget={(event: CustomEvent): void => alert(event.detail)}
      onError={(error: Error): void => alert(error)}
      modelerInnerHeight={window.innerHeight}
      bpmnStringFile={''}
      onElementChange={(xml: string): void => console.log(xml)}
    />
  )

  return (
    <>
      {bpmnModelerRef.current}
    </>
  )
}

export default App
```

With React

```jsx

import React, { FC, useRef } from 'react'
import { Bpmn } from '@arkondata/react-bpmn-modeler/lib/components'

const App: FC = () => {
  const modelerRef = useRef()
  const bpmnModelerRef = useRef(
    <Bpmn
      modelerRef={modelerRef}
      onTaskTarget={event => alert(event.detail)}
      onError={error => alert(error)}
      modelerInnerHeight={window.innerHeight}
      bpmnStringFile={''}
      onElementChange={xml => console.log(xml)}
    />
  )

  return (
    <>
      {bpmnModelerRef.current}
    </>
  )
}

export default App
```

## Params ##

* modelerRef - It's the reference to the "div" of the "container" of the bpmn modeler.

* onTaskTarget - It is a function that is executed when you click on the gear icon in the side pad of an element, it accepts a function that receives as event parameter of the selected element.

* onError - It is executed in case of error, it accepts a function that receives the error as a parameter.

* modelerInnerHeight - Window height setting, if not provided, takes the size of the current window by default.

* bpmnStringFile - A .bpmn file in text string, if not provided an empty .bpmn file will be generated.

* onElementChange - A function that runs every time a bpmn modeler element changes, accepts as a parameter a variable that contains the exported file in a text string.
