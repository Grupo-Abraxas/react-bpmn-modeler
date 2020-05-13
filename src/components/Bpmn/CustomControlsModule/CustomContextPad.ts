import { TASK_SETTINGS_EVENT } from './types'

class CustomContextPad {
  translate: any
  autoPlace: any

  constructor(config: any, contextPad: any, injector: any, translate: any) {
    this.translate = translate
    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false)
    }
    contextPad.registerProvider(this)
  }

  getContextPadEntries = (element: any) => {
    const taskSettings = (): void => {
      const customEvent = new CustomEvent(TASK_SETTINGS_EVENT, { 'detail': element.businessObject.id })
      document.dispatchEvent(customEvent)
    }

    return {
      'task-configuration': {
        group: 'edit',
        className: 'bpmn-icon-custom-task-settings',
        title: this.translate('Task settings'),
        action: {
          click: taskSettings,
          dragstart: () => { }
        }
      },
      $inject: [
        'config',
        'contextPad',
        'injector',
        'translate',
      ]
    }
  }
}

export default CustomContextPad
