export type BpmnType = {
  onTaskTarget: Function
  onError: Function
  bpmnStringFile: string | ArrayBuffer | false | null | undefined
  modelerInnerHeight?: number
}

export type BpmnModelerType = {
  importXML: Function
  get: Function
  on: Function
}
