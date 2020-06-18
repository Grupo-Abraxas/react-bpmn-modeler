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
import React, { FC, useRef, useState, useCallback, useEffect } from 'react'
import { Bpmn } from '@arkondata/react-bpmn-modeler/lib/components'
import { BpmnModelerType, PadEntriesType } from '@arkondata/react-bpmn-modeler/lib/components/types'

//load bpmnStringFile from anywere
const getBpmnFile = (): string => `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:collaboration id="Collaboration_0nai2jf">
    <bpmn:participant id="Participant_0n01i1w" processRef="Process_1" />
  </bpmn:collaboration>
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="Event_0sd8xgt" name="Start">
      <bpmn:outgoing>Flow_094auwy</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Activity_02384jl" name="Example task label">
      <bpmn:incoming>Flow_094auwy</bpmn:incoming>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_094auwy" sourceRef="Event_0sd8xgt" targetRef="Activity_02384jl" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_0nai2jf">
      <bpmndi:BPMNShape id="Participant_0n01i1w_di" bpmnElement="Participant_0n01i1w" isHorizontal="true">
        <dc:Bounds x="-400" y="-320" width="600" height="250" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_094auwy_di" bpmnElement="Flow_094auwy">
        <di:waypoint x="-282" y="-210" />
        <di:waypoint x="-230" y="-210" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_0sd8xgt_di" bpmnElement="Event_0sd8xgt">
        <dc:Bounds x="-318" y="-228" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="-312" y="-185" width="24" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_02384jl_di" bpmnElement="Activity_02384jl">
        <dc:Bounds x="-230" y="-250" width="100" height="80" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`

// Item classes to remove from the item popup panel
export const elementClassesToRemove = [
  'bpmn-icon-subprocess-collapsed',
  'bpmn-icon-subprocess-expanded',
  'bpmn-icon-business-rule',
  'bpmn-icon-service',
  'bpmn-icon-start-event-condition',
  'bpmn-icon-start-event-signal',
  'bpmn-icon-data-object',
  'bpmn-icon-data-store'
]

// Item classes to remove from the item lateral pad
export const customPadEntries: PadEntriesType = {
  StartEvent: [],
  IntermediateThrowEvent: [],
  IntermediateCatchEvent: [],
  EndEvent: [],
  CallActivity: [],
  SubProcess: [],
  Gateway: [],
  SequenceFlow: ['bpmn-icon-custom-sequence-flow-configuration'],
  TextAnnotation: [],
  Participant: [],
  Lane: [],
  DataStoreReference: [],
  DataObjectReference: [],
  label: [],
  Association: [],
  Group: [],
  Task: ['bpmn-icon-custom-task-documentation', 'bpmn-icon-custom-task-settings']
}

const App: FC = () => {
  const modelerRef = useRef<BpmnModelerType>()
  const [model, setModel] = useState<JSX.Element>()
  const [bpmnStringFile, setBpmnStringFile] = useState('')

<<<<<<< HEAD
  const onTaskDocumentationClick = (event: CustomEvent): void => {
=======
  const onTaskConfigurationClick = (event: CustomEvent): void => alert(JSON.stringify(event.detail))

  const onTaskDocumentationClick = (event: CustomEvent): void => {
    // Example of editing an element
>>>>>>> event_of_creating_element
    const elementRegistry = modelerRef?.current?.get('elementRegistry')
    const modeling = modelerRef?.current?.get('modeling')
    const moddle = modelerRef?.current?.get('moddle')
    const element = elementRegistry.get(event.detail.id)
<<<<<<< HEAD

=======
>>>>>>> event_of_creating_element
    const documentation = moddle.create('bpmn:Documentation', { text: 'Documenation text' })
    modeling.updateProperties(element, { documentation: [documentation] })
  }

<<<<<<< HEAD
  const onSequenceFlowConfigurationClick = (event: CustomEvent): void => {
    const elementRegistry = modelerRef?.current?.get('elementRegistry')
    const modeling = modelerRef?.current?.get('modeling')
    const moddle = modelerRef?.current?.get('moddle')
    const element = elementRegistry.get(event.detail.id)

    if (element.businessObject.sourceRef.$type.includes('Gateway')) {
      const sequenceFlowElement = elementRegistry.get(element.businessObject.id)
      const sequenceFlow = sequenceFlowElement.businessObject
      const newFormalCondition = 'true'
      const newConditionName = 'Yes'
      const newCondition = moddle.create('bpmn:FormalExpression', {
        body: `$\{${newFormalCondition}}`
      })
      sequenceFlow.conditionExpression = newCondition
      modeling.updateProperties(sequenceFlowElement, {
        name: newConditionName,
        conditionExpression: newCondition
      })
    }
  }

=======
  const onElementChange = (xml: string): void => alert(xml)

  const updateCurrentShapeId = (elementId: string): void => {
    // Example of changing the Id of an element and its references.
    const elementRegistry = modelerRef.current?.get('elementRegistry')
    const modeling = modelerRef.current?.get('modeling')
    const element = elementRegistry.get(elementId)
    modeling.updateProperties(element, { id: `${elementId}_customId` })
  }

  const onError = (error: Error): void => alert(error)

>>>>>>> event_of_creating_element
  const setModeler = useCallback(
    (): JSX.Element => (
      <Bpmn
        modelerRef={modelerRef}
        bpmnStringFile={bpmnStringFile}
        modelerInnerHeight={window.innerHeight}
        elementClassesToRemove={elementClassesToRemove}
<<<<<<< HEAD
        customPadEntries={customPadEntries}
        onElementChange={(xml: string): void => alert(xml)}
        onTaskConfigurationClick={(event: CustomEvent): void => alert(JSON.stringify(event.detail))}
        onTaskDocumentationClick={onTaskDocumentationClick}
        onSequenceFlowConfigurationClick={onSequenceFlowConfigurationClick}
        onError={(error: Error): void => alert(error)}
=======
        padEntriesToRemove={padEntriesToRemove}
        // It is executed by clicking the "Task configuration" button on the side pad of the Task element.
        onTaskConfigurationClick={onTaskConfigurationClick}
        // It is executed by clicking the "Task documentation" button on the side pad of the Task element.
        onTaskDocumentationClick={onTaskDocumentationClick}
        // It is executed when listening to the event "elements.changed",
        // it returns the xml file generated by the bpmn modeler after a change of any element of the diagram.
        onElementChange={onElementChange}
        // It is executed when listening to the event "commandStack.shape.create.postExecuted",
        // returns the Id of the created element
        onShapeCreate={updateCurrentShapeId}
        onError={onError}
>>>>>>> event_of_creating_element
      />
    ),
    [bpmnStringFile]
  )

  useEffect(() => {
    setBpmnStringFile(getBpmnFile())
  }, [setBpmnStringFile])

  useEffect(() => {
    if (bpmnStringFile && !model) {
      setModel(setModeler)
    }
  }, [bpmnStringFile, model, setModeler])

  return <>{model}</>
}

export default App

```

With React

```jsx

import React, { FC, useRef, useState, useCallback, useEffect } from 'react'
import { Bpmn } from '@arkondata/react-bpmn-modeler/lib/components'

//load bpmnStringFile from anywere
const getBpmnFile = (): string => `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:collaboration id="Collaboration_0nai2jf">
    <bpmn:participant id="Participant_0n01i1w" processRef="Process_1" />
  </bpmn:collaboration>
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="Event_0sd8xgt" name="Start">
      <bpmn:outgoing>Flow_094auwy</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Activity_02384jl" name="Example task label">
      <bpmn:incoming>Flow_094auwy</bpmn:incoming>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_094auwy" sourceRef="Event_0sd8xgt" targetRef="Activity_02384jl" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_0nai2jf">
      <bpmndi:BPMNShape id="Participant_0n01i1w_di" bpmnElement="Participant_0n01i1w" isHorizontal="true">
        <dc:Bounds x="-400" y="-320" width="600" height="250" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_094auwy_di" bpmnElement="Flow_094auwy">
        <di:waypoint x="-282" y="-210" />
        <di:waypoint x="-230" y="-210" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_0sd8xgt_di" bpmnElement="Event_0sd8xgt">
        <dc:Bounds x="-318" y="-228" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="-312" y="-185" width="24" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_02384jl_di" bpmnElement="Activity_02384jl">
        <dc:Bounds x="-230" y="-250" width="100" height="80" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`

// Item classes to remove from the item popup panel
export const elementClassesToRemove = [
  'bpmn-icon-subprocess-collapsed',
  'bpmn-icon-subprocess-expanded',
  'bpmn-icon-business-rule',
  'bpmn-icon-service',
  'bpmn-icon-start-event-condition',
  'bpmn-icon-start-event-signal',
  'bpmn-icon-data-object',
  'bpmn-icon-data-store'
]

// Item classes to remove from the item lateral pad
<<<<<<< HEAD
export const customPadEntries: PadEntriesType = {
  StartEvent: [],
  IntermediateThrowEvent: [],
  IntermediateCatchEvent: [],
  EndEvent: [],
  CallActivity: [],
  SubProcess: [],
  Gateway: [],
  SequenceFlow: ['bpmn-icon-custom-sequence-flow-configuration'],
  TextAnnotation: [],
  Participant: [],
  Lane: [],
  DataStoreReference: [],
  DataObjectReference: [],
  label: [],
  Association: [],
  Group: [],
  Task: ['bpmn-icon-custom-task-documentation', 'bpmn-icon-custom-task-settings']
=======

export const padEntriesToRemove: PadEntriesToRemoveType = {
  StartEvent: ['bpmn-icon-custom-task-documentation', 'bpmn-icon-custom-task-settings'],
  IntermediateThrowEvent: ['bpmn-icon-custom-task-documentation', 'bpmn-icon-custom-task-settings'],
  IntermediateCatchEvent: ['bpmn-icon-custom-task-documentation', 'bpmn-icon-custom-task-settings'],
  EndEvent: ['bpmn-icon-custom-task-documentation', 'bpmn-icon-custom-task-settings'],
  CallActivity: ['bpmn-icon-custom-task-documentation', 'bpmn-icon-custom-task-settings'],
  SubProcess: ['bpmn-icon-custom-task-documentation', 'bpmn-icon-custom-task-settings'],
  Gateway: ['bpmn-icon-custom-task-documentation', 'bpmn-icon-custom-task-settings'],
  SequenceFlow: ['bpmn-icon-custom-task-documentation', 'bpmn-icon-custom-task-settings'],
  TextAnnotation: ['bpmn-icon-custom-task-documentation', 'bpmn-icon-custom-task-settings'],
  Participant: ['bpmn-icon-custom-task-documentation', 'bpmn-icon-custom-task-settings'],
  Lane: ['bpmn-icon-custom-task-documentation', 'bpmn-icon-custom-task-settings'],
  DataStoreReference: ['bpmn-icon-custom-task-documentation', 'bpmn-icon-custom-task-settings'],
  DataObjectReference: ['bpmn-icon-custom-task-documentation', 'bpmn-icon-custom-task-settings'],
  label: ['bpmn-icon-custom-task-documentation', 'bpmn-icon-custom-task-settings'],
  Association: ['bpmn-icon-custom-task-documentation', 'bpmn-icon-custom-task-settings'],
  Task: []
>>>>>>> event_of_creating_element
}

const App: FC = () => {
  const modelerRef = useRef()
  const [model, setModel] = useState()
  const [bpmnStringFile, setBpmnStringFile] = useState('')

<<<<<<< HEAD
  const onTaskDocumentationClick = event => {
    const elementRegistry = modelerRef.current.get('elementRegistry')
    const modeling = modelerRef.current.get('modeling')
    const moddle = modelerRef.current.get('moddle')
    const element = elementRegistry.get(event.detail.id)

=======
  const onTaskConfigurationClick = event => alert(JSON.stringify(event.detail))

  const onTaskDocumentationClick = event => {
    // Example of editing an element
    const elementRegistry = modelerRef?.current?.get('elementRegistry')
    const modeling = modelerRef?.current?.get('modeling')
    const moddle = modelerRef?.current?.get('moddle')
    const element = elementRegistry.get(event.detail.id)
>>>>>>> event_of_creating_element
    const documentation = moddle.create('bpmn:Documentation', { text: 'Documenation text' })
    modeling.updateProperties(element, { documentation: [documentation] })
  }

<<<<<<< HEAD
  const onSequenceFlowConfigurationClick = event => {
    const elementRegistry = modelerRef.current.get('elementRegistry')
    const modeling = modelerRef.current.get('modeling')
    const moddle = modelerRef.current.get('moddle')
    const element = elementRegistry.get(event.detail.id)

    if (element.businessObject.sourceRef.$type.includes('Gateway')) {
      const sequenceFlowElement = elementRegistry.get(element.businessObject.id)
      const sequenceFlow = sequenceFlowElement.businessObject
      const newFormalCondition = 'true'
      const newConditionName = 'Yes'
      const newCondition = moddle.create('bpmn:FormalExpression', {
        body: `$\{${newFormalCondition}}`
      })
      sequenceFlow.conditionExpression = newCondition
      modeling.updateProperties(sequenceFlowElement, {
        name: newConditionName,
        conditionExpression: newCondition
      })
    }
  }

=======
  const onElementChange = xml => alert(xml)

  const updateCurrentShapeId = elementId => {
    // Example of changing the Id of an element and its references.
    const elementRegistry = modelerRef.current?.get('elementRegistry')
    const modeling = modelerRef.current?.get('modeling')
    const element = elementRegistry.get(elementId)
    modeling.updateProperties(element, { id: `${elementId}_customId` })
  }

  const onError = error => alert(error)

>>>>>>> event_of_creating_element
  const setModeler = useCallback(
    (): JSX.Element => (
      <Bpmn
        modelerRef={modelerRef}
        bpmnStringFile={bpmnStringFile}
        modelerInnerHeight={window.innerHeight}
        elementClassesToRemove={elementClassesToRemove}
<<<<<<< HEAD
        customPadEntries={customPadEntries}
        onElementChange={xml => alert(xml)}
        onTaskConfigurationClick={event => alert(JSON.stringify(event.detail))}
        onTaskDocumentationClick={onTaskDocumentationClick}
        onSequenceFlowConfigurationClick={onSequenceFlowConfigurationClick}
        onError={error => alert(error)}
=======
        padEntriesToRemove={padEntriesToRemove}
        // It is executed by clicking the "Task configuration" button on the side pad of the Task element.
        onTaskConfigurationClick={onTaskConfigurationClick}
        // It is executed by clicking the "Task documentation" button on the side pad of the Task element.
        onTaskDocumentationClick={onTaskDocumentationClick}
        // It is executed when listening to the event "elements.changed",
        // it returns the xml file generated by the bpmn modeler after a change of any element of the diagram.
        onElementChange={onElementChange}
        // It is executed when listening to the event "commandStack.shape.create.postExecuted",
        // returns the Id of the created element
        onShapeCreate={updateCurrentShapeId}
        onError={onError}
>>>>>>> event_of_creating_element
      />
    ),
    [bpmnStringFile]
  )

  useEffect(() => {
    setBpmnStringFile(getBpmnFile())
  }, [setBpmnStringFile])

  useEffect(() => {
    if (bpmnStringFile && !model) {
      setModel(setModeler)
    }
  }, [bpmnStringFile, model, setModeler])

  return <>{model}</>
}

export default App

```

## Params ##

* **modelerRef:** It's the reference to the "div" of the "container" of the bpmn modeler. **\***

* **bpmnStringFile:** A .bpmn file in text string, if not provided an empty .bpmn file will be generated. **\***

* **modelerInnerHeight:** Window height setting, if not provided, takes the size of the current window by default.

* **actionButtonClassName:** React className of action button.

* **zStep:** Number of zoom step of zoom in/out action button.

* **elementClassesToRemove:** Item classes to remove from the item popup panel.

exist

```typescript
const customPadClassNames = [
  'bpmn-icon-custom-task-settings',
  'bpmn-icon-custom-task-documentation',
  'bpmn-icon-custom-sequence-flow-configuration'
]
```

* **customPadEntries:** Item html-css classes of icon to remove from the item lateral pad.

* **onElementChange:** A function that runs every time a bpmn modeler element changes, accepts as a parameter a variable that contains the exported file in a text string.

* **onTaskConfigurationClick:** It is a function that is executed when you click on the gear icon in the side pad of a task element, it accepts a function that receives as event parameter of the selected element.

*event.detail* returns

```typescript
{
  id: string
  $type: string
  $parent: {
    id: string
    $type: string
  }
}
```

<<<<<<< HEAD
* **onTaskDocumentationClick:** It is a function that is executed when you click on the document icon in the side pad of a task element, it accepts a function that receives as event parameter of the selected element. **\***
=======
* **onTaskDocumentationTarget:** It is a function that is executed when you click on the document icon in the side pad of a task element, it accepts a function that receives as event parameter of the selected element.
>>>>>>> event_of_creating_element

*event.detail* returns

```typescript
{
  id: string
  $type: string
  $parent: {
    id: string
    $type: string
  }
}
```

* **onRootShapeUpdate** It is a function that is executed when a Pool/Participant is created or deleted.

*event.detail* returns

```typescript
id: string
type: string
```

* **onError:** It is executed in case of error, it accepts a function that receives the error as a parameter. **\***

*Required params*  *
