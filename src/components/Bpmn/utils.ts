import { ElementCustomPadEntriesType } from './types'

const entriesToRemove: ElementCustomPadEntriesType = {
  StartEvent: ['bpmn-icon-custom-task-label', 'bpmn-icon-custom-task-settings'],
  IntermediateThrowEvent: ['bpmn-icon-custom-task-label', 'bpmn-icon-custom-task-settings'],
  IntermediateCatchEvent: ['bpmn-icon-custom-task-label', 'bpmn-icon-custom-task-settings'],
  EndEvent: ['bpmn-icon-custom-task-label', 'bpmn-icon-custom-task-settings'],
  CallActivity: ['bpmn-icon-custom-task-label', 'bpmn-icon-custom-task-settings'],
  SubProcess: ['bpmn-icon-custom-task-label', 'bpmn-icon-custom-task-settings'],
  Gateway: ['bpmn-icon-custom-task-label', 'bpmn-icon-custom-task-settings'],
  SequenceFlow: ['bpmn-icon-custom-task-label', 'bpmn-icon-custom-task-settings'],
  TextAnnotation: ['bpmn-icon-custom-task-label', 'bpmn-icon-custom-task-settings'],
  Participant: ['bpmn-icon-custom-task-label', 'bpmn-icon-custom-task-settings'],
  Lane: ['bpmn-icon-custom-task-label', 'bpmn-icon-custom-task-settings'],
  DataStoreReference: ['bpmn-icon-custom-task-label', 'bpmn-icon-custom-task-settings'],
  DataObjectReference: ['bpmn-icon-custom-task-label', 'bpmn-icon-custom-task-settings'],
  label: ['bpmn-icon-custom-task-label', 'bpmn-icon-custom-task-settings'],
  Association: ['bpmn-icon-custom-task-label', 'bpmn-icon-custom-task-settings'],
  Task: []
}

const getElements = (elementClasses: string[]): Element[] => {
  let elements: Element[] = []

  elementClasses.forEach((elementClass: string) => {
    const element = document.getElementsByClassName(elementClass)
    elements = [...elements, ...element]
  })

  return elements
}

export const findLateralPadEntries = (type: string): Element[] => {
  for (const [key, lateralPadEntryClasses] of Object.entries(entriesToRemove)) {
    if (type.includes(key) && lateralPadEntryClasses.length > 0) {
      return getElements(lateralPadEntryClasses)
    }
  }

  return []
}
