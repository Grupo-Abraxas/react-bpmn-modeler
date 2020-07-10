import { SCRIPT_VALIDATION_TASK_TEXT, customPadClassNames } from './CustomContextPad.types'
import { AppendServiceTaskType, getPaletteEntriesType } from './CustomPalette.types'

export default class CustomPalette {
  public static $inject: string[]
  private bpmnFactory: { create: Function }
  private create: { start: Function }
  private elementFactory: { createShape: Function }
  private translate: Function

  public constructor(
    bpmnFactory: { create: Function },
    create: { start: Function },
    elementFactory: { createShape: Function },
    palette: { registerProvider: Function },
    translate: Function
  ) {
    this.bpmnFactory = bpmnFactory
    this.create = create
    this.elementFactory = elementFactory
    this.translate = translate

    palette.registerProvider(this)
  }

  public getPaletteEntries = (): getPaletteEntriesType => {
    const { bpmnFactory, create, elementFactory, translate } = this

    const appendServiceTask: AppendServiceTaskType = (taskLabelText: string) => (
      event: MouseEvent
    ): void => {
      const businessObject = bpmnFactory.create('bpmn:Task')
      const extensionElements = bpmnFactory.create('bpmn:ExtensionElements')

      extensionElements.validationType = taskLabelText
      businessObject.extensionElements = extensionElements

      const shape = elementFactory.createShape({
        type: 'bpmn:ScriptTask',
        businessObject: businessObject
      })

      create.start(event, shape)
    }

    return {
      'append.script-validation-task': {
        group: 'activity',
        className: `${customPadClassNames[5]} script-task-validation-label`,
        title: translate('Append Script Validation Task'),
        action: {
          click: appendServiceTask(SCRIPT_VALIDATION_TASK_TEXT),
          dragstart: appendServiceTask(SCRIPT_VALIDATION_TASK_TEXT)
        }
      }
    }
  }
}

CustomPalette.$inject = ['bpmnFactory', 'create', 'elementFactory', 'palette', 'translate']
