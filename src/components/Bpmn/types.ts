export type BpmnType = {
  onTaskTarget: Function
  onError: Function
  modelerInnerheight?: number
  bpmnStringFile?: string
}

export type BpmnModelerType = {
  importXML: Function
  get: Function
  on: Function
}
