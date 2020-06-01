import { TASK_SETTINGS_EVENT, getContextPadEntriesType, ContextPadEntriesType } from './types'

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

    return {
      $inject: ['config', 'contextPad', 'injector', 'translate'],
      'task-configuration': {
        group: 'edit',
        className: 'bpmn-icon-custom-task-settings',
        title: this.translate('Task settings'),
        action: {
          click: taskSettings
        }
      }
    }
  }
}

export default CustomContextPad
