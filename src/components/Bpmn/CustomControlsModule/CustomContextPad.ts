import {
  TASK_SETTINGS_EVENT,
  TASK_DOCUMENTATION_EVENT,
  getContextPadEntriesType,
  ContextPadEntriesType
} from './types'

class CustomContextPad {
  public autoPlace: object | undefined
  private translate: Function

  public constructor(
    config: { autoPlace: boolean },
    contextPad: { registerProvider: Function },
    injector: { get: Function },
    translate: Function
  ) {
    this.translate = translate
    if (config.autoPlace) {
      this.autoPlace = injector.get('autoPlace', false)
    }
    contextPad.registerProvider(this)
  }

  public getContextPadEntries = (element: ContextPadEntriesType): getContextPadEntriesType => {
    const taskSettings = (): void => {
      const customEvent = new CustomEvent(TASK_SETTINGS_EVENT, {
        detail: {
          id: element.businessObject.id,
          $type: element.businessObject.$type,
          $parent: {
            id: element.businessObject.$parent.id,
            $type: element.businessObject.$parent.$type
          }
        }
      })
      document.dispatchEvent(customEvent)
    }

    const taskLabel = (): void => {
      const customEvent = new CustomEvent(TASK_DOCUMENTATION_EVENT, {
        detail: {
          id: element.businessObject.id,
          $type: element.businessObject.$type,
          $parent: {
            id: element.businessObject.$parent.id,
            $type: element.businessObject.$parent.$type
          }
        }
      })
      document.dispatchEvent(customEvent)
    }

    return {
      'task-configuration': {
        group: 'default',
        className: 'bpmn-icon-custom-task-settings',
        title: this.translate('Task settings'),
        action: {
          click: taskSettings
        }
      },
      'task-documentation': {
        group: 'default',
        className: 'bpmn-icon-custom-task-documentation',
        title: this.translate('Task documentation'),
        action: {
          click: taskLabel
        }
      }
    }
  }
}

export default CustomContextPad
