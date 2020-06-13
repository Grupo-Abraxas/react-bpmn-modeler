import { MutableRefObject } from 'react'

export type BpmnModelerType = {
  importXML: Function
  get: Function
  on: Function
  saveXML: Function
}

export type BpmnType = {
  modelerRef: MutableRefObject<BpmnModelerType | undefined>
  bpmnStringFile: string | ArrayBuffer | false | null | undefined
  modelerInnerHeight?: number
  actionButtonClassName?: string
  zStep?: number
  onElementChange?: (xml: string) => void
  onTaskTarget?: Function
  onTaskLabelTarget?: Function
  onShapeCreate?: Function
  onRootShapeUpdate?: Function
  onError: (error: Error) => void
}

export type ElementCustomPadEntriesType = {
  [key: string]: string[]
}

export type OnShapeCreateType = { context: { shape: { id: string } } }

export type RemoveCustomTaskEntryType = { current: { element: { type: string } } }

export type OnUpdateRootType = { context: { newRoot: { id: string; type: string } } }
