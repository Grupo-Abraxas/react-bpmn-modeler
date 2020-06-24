export const TASK_SETTINGS_EVENT = 'TASK_SETTINGS_EVENT'
export const TASK_DOCUMENTATION_EVENT = 'TASK_DOCUMENTATION_EVENT'
export const SEQUENCE_FLOW_CONFIGURATION_EVENT = 'SEQUENCE_FLOW_CONFIGURATION_EVENT'

export const customPadClassNames = [
  'bpmn-icon-custom-task-settings',
  'bpmn-icon-custom-task-documentation',
  'bpmn-icon-custom-sequence-flow-configuration'
]

export type ContextPadEntriesType = {
  businessObject: {
    id: string
    $type: string
    $parent: {
      id: string
      $type: string
    }
  }
}

export type getContextPadEntriesType = {
  'task-configuration': {
    group: string
    className: string
    title: string
    action: {
      click: () => void
    }
  }
  'task-documentation': {
    group: string
    className: string
    title: string
    action: {
      click: () => void
    }
  }
  'sequence-flow-configuration': {
    group: string
    className: string
    title: string
    action: {
      click: () => void
    }
  }
}
