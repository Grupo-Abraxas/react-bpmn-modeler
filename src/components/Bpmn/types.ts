export type BpmnType = {
  onTaskTarget: Function
  onError: Function
  modelerInnerHeight?: number
  bpmnStringFile?: string
}

export type BpmnModelerType = {
  importXML: Function
  get: Function
  on: Function
}
