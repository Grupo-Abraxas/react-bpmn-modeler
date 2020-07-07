import {
  TASK_SETTINGS_EVENT,
  TASK_DOCUMENTATION_EVENT,
  SEQUENCE_FLOW_CONFIGURATION_EVENT,
  MESSAGE_CONFIGURATION_EVENT,
  CUSTOM_REMOVE_ELEMENT_EVENT,
  getContextPadEntriesType,
  ContextPadEntriesType,
  customPadClassNames,
  AppendServiceTaskType,
  AppendServiceTaskStartType
} from './CustomContextPad.types'

const SCRIPT_VALIDATION_TASK_TEXT = 'VALIDACIÓN SISTEMA'
const USER_VALIDATION_TASK_TEXT = 'VALIDACIÓN USUARIO'

class CustomContextPad {
  public static $inject: string[]
  public autoPlace: object | undefined
  private translate: Function
  private create: { start: Function }
  private bpmnFactory: { create: Function }
  private elementFactory: { createShape: Function }

  public constructor(
    bpmnFactory: { create: Function },
    config: { autoPlace: boolean },
    contextPad: { registerProvider: Function },
    create: { start: Function },
    elementFactory: { createShape: Function },
    injector: { get: Function },
    translate: Function
  ) {
    this.translate = translate
    this.create = create
    this.bpmnFactory = bpmnFactory
    this.elementFactory = elementFactory
    if (!config.autoPlace) {
      this.autoPlace = injector.get('autoPlace', false)
    }
    contextPad.registerProvider(this)
  }

  public getContextPadEntries = (element: ContextPadEntriesType): getContextPadEntriesType => {
    const { autoPlace, bpmnFactory, create, elementFactory } = this

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

    const sequenceFlowConfiguration = (): void => {
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

    const messageEventConfiguration = (): void => {
      const customEvent = new CustomEvent(MESSAGE_CONFIGURATION_EVENT, {
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

    const appendServiceTaskStart: AppendServiceTaskStartType = (taskLabelText, taskType) => (
      event: MouseEvent
    ): void => {
      const businessObject = bpmnFactory.create()

      businessObject.validation = taskLabelText

      const shape = elementFactory.createShape({
        type: taskType,
        businessObject: businessObject
      })

      create.start(event, shape, element)
    }

    const appendServiceTask: AppendServiceTaskType = (taskLabelText, taskType) => (
      event: MouseEvent,
      taskElement: object
    ): void => {
      if (autoPlace && event) {
        const businessObject = bpmnFactory.create(taskType)

        businessObject.validationType = taskLabelText

        const shape = elementFactory.createShape({
          type: taskType,
          businessObject: businessObject
        })

        Object(autoPlace).append(taskElement, shape)
      } else {
        appendServiceTaskStart(SCRIPT_VALIDATION_TASK_TEXT, taskType)
      }
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
          click: sequenceFlowConfiguration
        }
      },
      'message-outgoing-configuration': {
        group: 'default',
        className: customPadClassNames[7],
        title: this.translate('Sequence Flow configuration'),
        action: {
          click: messageEventConfiguration
        }
      },
      'remove-element': {
        group: 'edit',
        className: customPadClassNames[3],
        title: this.translate('Remove'),
        action: {
          click: customRemoveElement
        }
      },
      'append.script-validation-task': {
        group: 'model',
        className: `${customPadClassNames[5]} script-task-validation-label`,
        title: this.translate('Append Script Validation Task'),
        action: {
          click: appendServiceTask(SCRIPT_VALIDATION_TASK_TEXT, 'bpmn:ScriptTask'),
          dragstart: appendServiceTaskStart(SCRIPT_VALIDATION_TASK_TEXT, 'bpmn:ScriptTask')
        }
      },
      'append.user-validation-task': {
        group: 'model',
        className: `${customPadClassNames[6]} user-task-validation-label`,
        title: this.translate('Append User Validation Task'),
        action: {
          click: appendServiceTask(USER_VALIDATION_TASK_TEXT, 'bpmn:UserTask'),
          dragstart: appendServiceTaskStart(USER_VALIDATION_TASK_TEXT, 'bpmn:UserTask')
        }
      }
    }
  }
}

CustomContextPad.$inject = [
  'bpmnFactory',
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'translate'
]

export default CustomContextPad
