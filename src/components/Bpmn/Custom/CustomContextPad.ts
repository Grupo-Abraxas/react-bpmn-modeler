import { v4 as uuidv4 } from 'uuid'
import {
  TASK_SETTINGS_EVENT,
  TASK_DOCUMENTATION_EVENT,
  SEQUENCE_FLOW_CONFIGURATION_EVENT,
  MESSAGE_CONFIGURATION_EVENT,
  CUSTOM_REMOVE_ELEMENT_EVENT,
  getContextPadEntriesType,
  ContextPadEntriesType,
  customPadClassNames,
  AppendCustomTaskType,
  AppendCustomTaskStartType,
  SCRIPT_VALIDATION_TASK_TEXT,
  USER_VALIDATION_TASK_TEXT
} from './CustomContextPad.types'

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

    const appendCustomTaskStart: AppendCustomTaskStartType = (
      taskLabelText,
      taskType,
      selectedExtensionElements
    ) => (event: MouseEvent): void => {
      const businessObject = bpmnFactory.create()

      if (selectedExtensionElements) {
        businessObject.extensionElements = selectedExtensionElements
      } else {
        const extensionElements = bpmnFactory.create('bpmn:ExtensionElements')
        businessObject.extensionElements = extensionElements
      }
      businessObject.extensionElements.validationType = taskLabelText

      const shape = elementFactory.createShape({
        type: taskType,
        businessObject: businessObject
      })

      create.start(event, shape, element)
    }

    const copyBpmnObject = (BpmnElementvalue: object): object => {
      const oldBpmnObjectDefinition = { ...BpmnElementvalue }
      let $type = ''
      if (oldBpmnObjectDefinition.hasOwnProperty('$type')) {
        $type = Object(oldBpmnObjectDefinition).$type
        delete Object(oldBpmnObjectDefinition).$type
      }
      const bpmnElementProto: { [key: string]: string | object[] | object } = {}
      for (const [key, value] of Object.entries(oldBpmnObjectDefinition)) {
        if (typeof value === 'string') {
          if (key === 'id' && $type.toLocaleLowerCase().includes('arkon:input')) {
            const newId = `Id_${uuidv4()}`
            bpmnElementProto[key] = newId
          } else {
            bpmnElementProto[key] = value
          }
        } else if (typeof value === 'object' && Array.isArray(value)) {
          bpmnElementProto[key] = value.map((bpmnElement: object) => {
            return copyBpmnObject(bpmnElement)
          })
        } else if (typeof value === 'object') {
          bpmnElementProto[key] = copyBpmnObject(Object(value))
        }
      }

      return bpmnFactory.create($type, bpmnElementProto)
    }

    const getExtensionElements = (values: object[]): object => {
      const extensionElements = bpmnFactory.create('bpmn:ExtensionElements')
      if (values && values.length > 0) {
        extensionElements.values = []
        const newValues = values.map((value: object) => {
          return copyBpmnObject(value)
        })
        extensionElements.values = [...newValues]
      }

      return extensionElements
    }

    const appendCustomTask: AppendCustomTaskType = (taskLabelText, taskType) => (
      event: MouseEvent,
      taskElement: object
    ): void => {
      const selectedBusinessObject = Object(taskElement).businessObject
      let selectedExtensionElements = undefined
      let values = undefined

      if (selectedBusinessObject?.extensionElements) {
        values = selectedBusinessObject.extensionElements.get('values')
        selectedExtensionElements = JSON.parse(
          JSON.stringify(selectedBusinessObject.extensionElements)
        )
      }

      if (autoPlace && event) {
        const businessObject = bpmnFactory.create(taskType)
        const extensionElements = getExtensionElements(values)
        businessObject.extensionElements = extensionElements
        businessObject.extensionElements.validationType = taskLabelText

        const shape = elementFactory.createShape({
          type: taskType,
          businessObject: businessObject
        })

        Object(autoPlace).append(taskElement, shape)
      } else {
        appendCustomTaskStart(SCRIPT_VALIDATION_TASK_TEXT, taskType, selectedExtensionElements)
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
          click: appendCustomTask(SCRIPT_VALIDATION_TASK_TEXT, 'bpmn:ScriptTask'),
          dragstart: appendCustomTaskStart(SCRIPT_VALIDATION_TASK_TEXT, 'bpmn:ScriptTask')
        }
      },
      'append.user-validation-task': {
        group: 'model',
        className: `${customPadClassNames[6]} user-task-validation-label`,
        title: this.translate('Append User Validation Task'),
        action: {
          click: appendCustomTask(USER_VALIDATION_TASK_TEXT, 'bpmn:UserTask'),
          dragstart: appendCustomTaskStart(USER_VALIDATION_TASK_TEXT, 'bpmn:UserTask')
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
