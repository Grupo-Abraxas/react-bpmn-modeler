import BpmnModeler from 'bpmn-js/lib/Modeler'

import { MutableRefObject } from 'react'

export type BpmnModelerType = {
  importXML: Function
  get: Function
  on: Function
  saveXML: Function
}

export type PadEntriesType = {
  [key: string]: string[]
}

type BpmnModeler = {
  container: HTMLDivElement | null
  keyboard: { bindTo: Document }
  additionalModules: object[]
  moddleExtensions: object
  height: number
  propertiesPanel: {
    parent: string
  }
}
type BpmnModelerReturn = {
  on: Function
  get: Function
  importXML: Function
  saveXML: Function
}

export type BpmnType = {
  modelerRef: MutableRefObject<BpmnModelerType | undefined>
  bpmnJsModeler: new (props: BpmnModeler) => BpmnModelerReturn
  moddleExtensions: object
  bpmnStringFile: string | ArrayBuffer | false | null | undefined
  modelerInnerHeight?: number
  actionButtonClassName?: string
  zStep?: number
  defaultStrokeColor?: string
  showPropertiesPanel?: boolean
  elementClassesToRemove?: string[]
  customPadEntries?: PadEntriesType
  onElementChange?: (xml: string) => void
  onTaskConfigurationClick?: Function
  onTaskDocumentationClick?: Function
  onSequenceFlowConfigurationClick?: Function
  onRemoveClick?: Function
  onShapeCreate?: Function
  onRootShapeUpdate?: Function
  onError: (error: Error) => void
}

export type ElementCustomPadEntriesType = {
  [key: string]: string[]
}

export type OnShapeCreateType = {
  context: {
    shape: {
      id: string
    }
  }
}

export type RemoveCustomTaskEntryType = {
  current: {
    element: object
  }
}
