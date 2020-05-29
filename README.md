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
      bpmnStringFile={''}
      modelerInnerHeight={window.innerHeight}
      onElementChange={(xml: string): void => alert(xml)}
      onTaskTarget={(event: CustomEvent): void => alert(JSON.stringify(event.detail))}
      onError={(error: Error): void => alert(error)}
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
      bpmnStringFile={''}
      modelerInnerHeight={window.innerHeight}
      onElementChange={xml => alert(xml)}
      onTaskTarget={event => alert(JSON.stringify(event.detail))}
      onError={error => alert(error)}
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

* **modelerRef:** It's the reference to the "div" of the "container" of the bpmn modeler. **\***

* **bpmnStringFile:** A .bpmn file in text string, if not provided an empty .bpmn file will be generated. **\***

* **modelerInnerHeight:** Window height setting, if not provided, takes the size of the current window by default.

* **actionButtonClassName:** React className of action button.

* **zStep:** Number of zoom step of zoom in/out action button.

* **onElementChange:** A function that runs every time a bpmn modeler element changes, accepts as a parameter a variable that contains the exported file in a text string.

* **onTaskTarget:** It is a function that is executed when you click on the gear icon in the side pad of an element, it accepts a function that receives as event parameter of the selected element. **\***

* **onError:** It is executed in case of error, it accepts a function that receives the error as a parameter. **\***

*Required params*  *
