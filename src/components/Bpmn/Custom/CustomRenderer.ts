import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer'

import {
  append as svgAppend,
  attr as svgAttr,
  classes as svgClasses,
  create as svgCreate
} from 'tiny-svg'

import { getRoundRectPath } from 'bpmn-js/lib/draw/BpmnRenderUtil'

import { is, getBusinessObject } from 'bpmn-js/lib/util/ModelUtil'

const HIGH_PRIORITY = 1500
const TASK_BORDER_RADIUS = 10
const SCRIPT_TASK_VALIDATION_COLOR = '#2AC4C1'
const USER_TASK_VALIDATION_COLOR = '#FBB344'

const drawRect = (
  parentNode: Element,
  width: number,
  height: number,
  borderRadius: number,
  color: string
): SVGRectElement => {
  const rect = svgCreate('rect')

  svgAttr(rect, {
    width,
    height,
    rx: borderRadius,
    ry: borderRadius,
    stroke: color,
    strokeWidth: 2,
    fill: color
  })

  svgAppend(parentNode, rect)

  return rect
}

export default class CustomRenderer extends BaseRenderer {
  public static $inject: string[]
  private bpmnRenderer: { drawShape: Function; getShapePath: Function }

  public constructor(
    eventBus: object,
    bpmnRenderer: { drawShape: Function; getShapePath: Function }
  ) {
    super(eventBus, HIGH_PRIORITY)

    this.bpmnRenderer = bpmnRenderer
  }

  public canRender = (element: { labelTarget: object }): boolean => {
    return !element.labelTarget
  }

  public drawShape = (parentNode: Element, element: object): object => {
    const shape = this.bpmnRenderer.drawShape(parentNode, element)
    const validationText = this.getValidationText(element)

    if (validationText) {
      const validationTagColor: { [key: string]: string } = {
        'bpmn:ScriptTask': SCRIPT_TASK_VALIDATION_COLOR,
        'bpmn:UserTask': USER_TASK_VALIDATION_COLOR,
        '': ''
      }
      const rect = drawRect(
        parentNode,
        125,
        20,
        TASK_BORDER_RADIUS,
        validationTagColor[Object(element).type]
      )
      svgAttr(rect, { transform: 'translate(-11, -23)' })

      const text = svgCreate('text')

      svgAttr(text, {
        fill: '#fff',
        transform: 'translate(-2, -9)',
        'font-size': '10px'
      })

      svgClasses(text).add('djs-label')

      text.textContent = validationText

      svgAppend(parentNode, text)
    }

    return shape
  }

  public getShapePath = (shape: object): string => {
    if (is(shape, 'bpmn:ScriptTask') || is(shape, 'bpmn:UserTask')) {
      return getRoundRectPath(shape, TASK_BORDER_RADIUS)
    }

    return this.bpmnRenderer.getShapePath(shape)
  }

  public getValidationText = (element: object): string => {
    const businessObject = getBusinessObject(element)
    const { validation } = businessObject

    return validation ? validation : ''
  }
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer']
