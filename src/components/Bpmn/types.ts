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
  onTaskTarget: Function
  onTaskLabelTarget: Function
  onError: (error: Error) => void
}

export type ElementCustomPadEntriesType = {
  [key: string]: string[]
}
