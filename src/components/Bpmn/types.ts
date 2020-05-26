import { MutableRefObject } from 'react'

export type BpmnModelerType = {
  importXML: Function
  get: Function
  on: Function
}

export type BpmnType = {
  onTaskTarget: Function
  onError: Function
  bpmnStringFile: string | ArrayBuffer | false | null | undefined
  modelerRef: MutableRefObject<BpmnModelerType | undefined>
  modelerInnerHeight?: number
}
