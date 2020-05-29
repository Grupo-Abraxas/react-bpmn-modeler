export const TASK_SETTINGS_EVENT = 'TASK_SETTINGS_EVENT'

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
  $inject: string[]
  'task-configuration': {
    group: string
    className: string
    title: string
    action: {
      click: () => void
    }
  }
}
