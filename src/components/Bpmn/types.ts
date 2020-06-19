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

export type BpmnType = {
  modelerRef: MutableRefObject<BpmnModelerType | undefined>
  bpmnStringFile: string | ArrayBuffer | false | null | undefined
  modelerInnerHeight?: number
  actionButtonClassName?: string
  zStep?: number
  elementClassesToRemove?: string[]
  customPadEntries?: PadEntriesType
  onElementChange?: (xml: string) => void
  onTaskConfigurationClick?: Function
  onTaskDocumentationClick?: Function
  onSequenceFlowConfigurationClick?: Function
  onShapeCreate?: Function
  onError: (error: Error) => void
}

export type ElementCustomPadEntriesType = {
  [key: string]: string[]
}

export type OnShapeCreateType = { context: { shape: { id: string } } }

export type RemoveCustomTaskEntryType = { current: { element: { type: string } } }

export type SelectionChangedType = { newSelection: object[]; oldSelection: object[] }
