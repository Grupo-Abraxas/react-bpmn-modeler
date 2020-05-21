export type BpmnType = {
  bpmnStringFile?: string
  onTaskTarget: Function
  onError: Function
}

export type BpmnModelerType = {
  importXML: Function
  get: Function
  on: Function
}
