export const TASK_SETTINGS_EVENT = 'TASK_SETTINGS_EVENT'
export const TASK_DOCUMENTATION_EVENT = 'TASK_DOCUMENTATION_EVENT'
export const SEQUENCE_FLOW_CONFIGURATION_EVENT = 'SEQUENCE_FLOW_CONFIGURATION_EVENT'
export const MESSAGE_CONFIGURATION_EVENT = 'MESSAGE_CONFIGURATION_EVENT'
export const CUSTOM_REMOVE_ELEMENT_EVENT = 'CUSTOM_REMOVE_ELEMENT_EVENT'

export const customPadClassNames = [
  'bpmn-icon-custom-task-settings',
  'bpmn-icon-custom-task-documentation',
  'bpmn-icon-custom-sequence-flow-configuration',
  'bpmn-icon-custom-remove',
  'bpmn-icon-trash',
  'bpmn-icon-script-task-validation',
  'bpmn-icon-user-task-validation',
  'bpmn-icon-custom-message-outgoing-configuration'
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
  'message-outgoing-configuration': {
    group: string
    className: string
    title: string
    action: {
      click: () => void
    }
  }
  'remove-element': {
    group: string
    className: string
    title: string
    action: {
      click: () => void
    }
  }
  'append.script-validation-task': {
    group: string
    className: string
    title: string
    action: {
      click: (event: MouseEvent, element: object) => void
      dragstart: (event: MouseEvent) => void
    }
  }
  'append.user-validation-task': {
    group: string
    className: string
    title: string
    action: {
      click: (event: MouseEvent, element: object) => void
      dragstart: (event: MouseEvent) => void
    }
  }
}

type AppendCustomTaskReturnType = (event: MouseEvent, taskElement: object) => void
export type AppendCustomTaskType = (
  taskLabelText: string,
  taskType: 'bpmn:ScriptTask' | 'bpmn:UserTask'
) => AppendCustomTaskReturnType

type AppendCustomTaskStartReturnType = (event: MouseEvent) => void
export type AppendCustomTaskStartType = (
  taskLabelText: string,
  taskType: 'bpmn:ScriptTask' | 'bpmn:UserTask'
) => AppendCustomTaskStartReturnType

export const SCRIPT_VALIDATION_TASK_TEXT = 'VALIDACIÓN SISTEMA'
export const USER_VALIDATION_TASK_TEXT = 'VALIDACIÓN USUARIO'
