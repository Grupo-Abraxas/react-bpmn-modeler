export type BpmnType = {
  onTaskTarget: Function
  onError: Function
}

export type BpmnModelerType = {
  importXML: Function
  get: Function
  on: Function
}
