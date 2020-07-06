import React, { FC, useRef, useState, useCallback, useEffect } from 'react'
import Bpmn, { BpmnModelerType } from './components/Bpmn'
import { PadEntriesType } from './components/Bpmn/Bpmn.types'

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
  Association: ['bpmn-icon-custom-remove', 'bpmn-icon-script-task-validation'],
  CallActivity: ['bpmn-icon-custom-remove', 'bpmn-icon-script-task-validation'],
  DataObjectReference: ['bpmn-icon-custom-remove', 'bpmn-icon-script-task-validation'],
  DataStoreReference: ['bpmn-icon-custom-remove', 'bpmn-icon-script-task-validation'],
  EndEvent: ['bpmn-icon-custom-remove', 'bpmn-icon-script-task-validation'],
  Gateway: ['bpmn-icon-custom-remove', 'bpmn-icon-script-task-validation'],
  Group: ['bpmn-icon-custom-remove', 'bpmn-icon-script-task-validation'],
  StartEvent: [
    'bpmn-icon-custom-remove',
    'bpmn-icon-script-task-validation',
    'bpmn-icon-custom-message-outgoing-configuration'
  ],
  IntermediateCatchEvent: ['bpmn-icon-custom-remove', 'bpmn-icon-script-task-validation'],
  IntermediateThrowEvent: ['bpmn-icon-custom-remove', 'bpmn-icon-script-task-validation'],
  label: ['bpmn-icon-custom-remove'],
  Lane: ['bpmn-icon-custom-remove'],
  Participant: ['bpmn-icon-custom-remove'],
  Process: ['bpmn-icon-custom-remove'],
  SequenceFlow: [
    'bpmn-icon-custom-sequence-flow-configuration',
    'bpmn-icon-custom-remove',
    'bpmn-icon-script-task-validation'
  ],
  SubProcess: ['bpmn-icon-custom-remove', 'bpmn-icon-script-task-validation'],
  Task: [
    'bpmn-icon-custom-task-documentation',
    'bpmn-icon-custom-task-settings',
    'bpmn-icon-custom-remove',
    'bpmn-icon-script-task-validation',
    'bpmn-icon-user-task-validation'
  ],
  TextAnnotation: ['bpmn-icon-custom-remove', 'bpmn-icon-script-task-validation']
}

const App: FC = () => {
  const modelerRef = useRef<BpmnModelerType>()
  const [model, setModel] = useState<JSX.Element>()
  const [bpmnStringFile, setBpmnStringFile] = useState('')

  const onTaskConfigurationClick = (event: CustomEvent): void => alert(JSON.stringify(event.detail))

  const onTaskDocumentationClick = (event: CustomEvent): void => {
    // Example of editing properties of an element
    const elementRegistry = modelerRef.current?.get('elementRegistry')
    const modeling = modelerRef.current?.get('modeling')
    const moddle = modelerRef.current?.get('moddle')
    const element = elementRegistry.get(event.detail.id)
    const newText = 'Documentation text'
    const documentation = moddle.create('bpmn:Documentation', { text: newText })
    modeling.updateProperties(element, { documentation: [documentation] })
  }
  const onRemoveClick = (event: CustomEvent): void => {
    // Example of remove shape confirmation
    const deleteIt = window.confirm('Are you sure to delete the element?')
    if (deleteIt) {
      const elementRegistry = modelerRef.current?.get('elementRegistry')
      const modeling = modelerRef.current?.get('modeling')
      const element = elementRegistry.get(event.detail.id)
      modeling.removeShape(element)
    }
  }

  const onElementChange = (xml: string): void => alert(xml)

  const onSequenceFlowConfigurationClick = (event: CustomEvent): void => {
    // Example of creating conditionExpression of a gateway element
    const elementRegistry = modelerRef.current?.get('elementRegistry')
    const modeling = modelerRef.current?.get('modeling')
    const moddle = modelerRef.current?.get('moddle')
    const element = elementRegistry.get(event.detail.id)

    if (element.businessObject.sourceRef.$type.toLowerCase().includes('gateway')) {
      const sequenceFlowElement = elementRegistry.get(element.businessObject.id)
      const sequenceFlow = sequenceFlowElement.businessObject
      const newFormalCondition = `$\{true}`
      const newConditionName = 'Yes'
      const newCondition = moddle.create('bpmn:FormalExpression', {
        body: newFormalCondition
      })
      sequenceFlow.conditionExpression = newCondition
      modeling.updateProperties(sequenceFlowElement, {
        name: newConditionName,
        conditionExpression: newCondition
      })
    }
  }

  const outgoingMessageConfigurationClick = (event: CustomEvent): void =>
    alert(JSON.stringify(event.detail))

  const updateCurrentShapeId = (elementId: string): void => {
    // Example of changing the Id of an element and its references.
    const elementRegistry = modelerRef.current?.get('elementRegistry')
    const modeling = modelerRef.current?.get('modeling')
    const element = elementRegistry.get(elementId)
    modeling.updateProperties(element, { id: `${elementId}_customId` })
  }

  const onRootShapeUpdate = (id: string, type: string): void =>
    alert(`${id} ${type} root shape updated!`)

  const onError = (error: Error): void => alert(error)

  const setModeler = useCallback(
    (): JSX.Element => (
      <Bpmn
        modelerRef={modelerRef}
        bpmnStringFile={bpmnStringFile}
        modelerInnerHeight={window.innerHeight}
        defaultStrokeColor={'#5F84CF'}
        showPropertiesPanel={true}
        elementClassesToRemove={elementClassesToRemove}
        customPadEntries={customPadEntries}
        // It is executed by clicking the "Task configuration" button on the side pad of the Task element.
        onTaskConfigurationClick={onTaskConfigurationClick}
        // It is executed by clicking the "Task documentation" button on the side pad of the Task element.
        onTaskDocumentationClick={onTaskDocumentationClick}
        // It is executed by clicking the "Sequence Flow configuration" button on the side pad of the Task element.
        onSequenceFlowConfigurationClick={onSequenceFlowConfigurationClick}
        // It is executed by clicking the "StartEvent configuration" button on the side pad of the Task element.
        outgoingMessageConfigurationClick={outgoingMessageConfigurationClick}
        // It is executed by clicking the "Remove" button on the side pad of the Task element.
        onRemoveClick={onRemoveClick}
        // It is executed when listening to the event "elements.changed",
        // it returns the xml file generated by the bpmn modeler after a change of any element of the diagram.
        onElementChange={onElementChange}
        // It is executed when listening to the event "commandStack.shape.create.postExecuted",
        // returns the Id of the created element
        onShapeCreate={updateCurrentShapeId}
        // It is executed when listening to the event "commandStack.canvas.updateRoot.postExecute",
        // returns the Id and type of the root shape
        onRootShapeUpdate={onRootShapeUpdate}
        onError={onError}
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
