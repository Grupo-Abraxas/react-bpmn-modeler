import React, { FC, useRef, Fragment, useState, useCallback, useEffect } from 'react'
import Bpmn, { BpmnModelerType } from './components/Bpmn'

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

const App: FC = () => {
  const modelerRef = useRef<BpmnModelerType>()
  const [model, setModel] = useState<JSX.Element>()
  const [bpmnStringFile, setBpmnStringFile] = useState('')
  const setModeler = useCallback(
    (): JSX.Element => (
      <Bpmn
        modelerRef={modelerRef}
        bpmnStringFile={bpmnStringFile}
        modelerInnerHeight={window.innerHeight}
        onElementChange={(xml: string): void => alert(xml)}
        onTaskTarget={(event: CustomEvent): void => alert(JSON.stringify(event.detail))}
        onTaskLabelTarget={(event: CustomEvent): void => {
          const elementRegistry = modelerRef?.current?.get('elementRegistry')
          const modeling = modelerRef?.current?.get('modeling')
          const element = elementRegistry.get(event.detail.id)
          modeling.updateProperties(element, { name: 'Example task label' })
        }}
        onShapeCreate={(elementId: string): void => {
          const elementRegistry = modelerRef.current?.get('elementRegistry')
          const modeling = modelerRef.current?.get('modeling')
          const element = elementRegistry.get(elementId)
          modeling.updateProperties(element, { id: `${elementId}_customId` })
        }}
        onError={(error: Error): void => alert(error)}
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

  return <Fragment>{model}</Fragment>
}

export default App
