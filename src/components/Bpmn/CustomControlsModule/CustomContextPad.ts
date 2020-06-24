import {
  TASK_SETTINGS_EVENT,
  TASK_DOCUMENTATION_EVENT,
  SEQUENCE_FLOW_CONFIGURATION_EVENT,
  CUSTOM_REMOVE_ELEMENT_EVENT,
  getContextPadEntriesType,
  ContextPadEntriesType,
  customPadClassNames
} from './CustomContextPad.types'

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

    const taskDocumentation = (): void => {
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

    const sequenceFlowConnfiguration = (): void => {
      const customEvent = new CustomEvent(SEQUENCE_FLOW_CONFIGURATION_EVENT, {
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

    const customRemoveElement = (): void => {
      const customEvent = new CustomEvent(CUSTOM_REMOVE_ELEMENT_EVENT, {
        detail: {
          id: element.businessObject.id,
          $type: element.businessObject.$type
        }
      })
      document.dispatchEvent(customEvent)
    }

    return {
      'task-configuration': {
        group: 'default',
        className: customPadClassNames[0],
        title: this.translate('Task settings'),
        action: {
          click: taskSettings
        }
      },
      'task-documentation': {
        group: 'default',
        className: customPadClassNames[1],
        title: this.translate('Task documentation'),
        action: {
          click: taskDocumentation
        }
      },
      'sequence-flow-configuration': {
        group: 'default',
        className: customPadClassNames[2],
        title: this.translate('Sequence Flow configuration'),
        action: {
          click: sequenceFlowConnfiguration
        }
      },
      'remove-element': {
        group: 'edit',
        className: customPadClassNames[3],
        title: this.translate('Remove'),
        action: {
          click: customRemoveElement
        }
      }
    }
  }
}

export default CustomContextPad
