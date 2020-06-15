import { MutableRefObject } from 'react'

export type BpmnModelerType = {
  importXML: Function
  get: Function
  on: Function
  saveXML: Function
}

export type PadEntriesToRemoveType = {
  [key: string]: string[]
}

export type BpmnType = {
  modelerRef: MutableRefObject<BpmnModelerType | undefined>
  bpmnStringFile: string | ArrayBuffer | false | null | undefined
  modelerInnerHeight?: number
  actionButtonClassName?: string
  zStep?: number
  elementClassesToRemove?: string[]
  padEntriesToRemove?: PadEntriesToRemoveType
  onElementChange?: (xml: string) => void
  onTaskTarget?: Function
  onTaskDocumentationTarget?: Function
  onError: (error: Error) => void
}
