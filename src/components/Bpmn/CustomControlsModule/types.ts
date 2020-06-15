export const TASK_SETTINGS_EVENT = 'TASK_SETTINGS_EVENT'
export const TASK_LABEL_EVENT = 'TASK_LABEL_EVENT'

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
  'task-label': {
    group: string
    className: string
    title: string
    action: {
      click: () => void
    }
  }
}
