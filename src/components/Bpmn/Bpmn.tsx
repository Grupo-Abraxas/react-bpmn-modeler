import React, { useRef, useEffect, FC, useCallback } from 'react'

import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import minimapModule from 'diagram-js-minimap'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

import { i18nSpanish } from './translations'
import CustomControlsModule, { TASK_SETTINGS_EVENT } from './CustomControlsModule'
import { newBpmnDiagram } from './default-bpmn-layout'

import { BpmnType } from './types'

import '../../styles/index.css'
import '../../bpmn-font/css/bpmn-embedded.css'
import '../../bpmn-font/css/bpmn.css'

const customTranslateModule = {
  translate: [
    'value',
    (template: string, replacements: { type: string } | undefined): string => {
      const templateTranslated = i18nSpanish[template] || template
      if (replacements && i18nSpanish[replacements.type]) {
        return templateTranslated.replace(
          /{([^}]+)}/g,
          (): string => `${i18nSpanish[replacements.type]}`
        )
      }

      return templateTranslated
    }
  ]
}

const Bpmn: FC<BpmnType> = ({
  bpmnStringFile,
  onTaskTarget,
  onError,
  modelerInnerHeight,
  modelerRef,
  onElementChange,
  children,
}) => {
  const canvas = useRef<HTMLDivElement>(null)

  const fitViewport = useCallback((): void => {
    if (modelerRef && modelerRef.current) {
      modelerRef.current.get('canvas').zoom('fit-viewport', true)
    }
  }, [modelerRef])

  const memorizeImportXML = useCallback((): void => {
    if (modelerRef && modelerRef.current) {
      modelerRef.current.importXML(bpmnStringFile || newBpmnDiagram, (error: Error): void =>
        error ? onError(error) : fitViewport()
      )
    }
  }, [onError, bpmnStringFile, modelerRef, fitViewport])

  const removeCustomIcon = (divGroupIndex: number): void => {
    const groups = document.querySelectorAll('.group')
    const group = groups[divGroupIndex]
    if (group.lastChild) {
      group.lastChild.remove()
    }
  }

  const removeCustomTaskButton = useCallback((type: string) => {
    type bpmnElementPadDivType = {
      [key: string]: number
    }
    const bpmnElementPadDiv: bpmnElementPadDivType = {
      StartEvent: 1,
      IntermediateThrowEvent: 1,
      IntermediateCatchEvent: 1,
      EndEvent: 0,
      CallActivity: 1,
      SubProcess: 1,
      Gateway: 1,
      SequenceFlow: 0,
      TextAnnotation: 0,
      Participant: 3,
      DataStoreReference: 2,
      DataObjectReference: 2
    }
    for (const key in bpmnElementPadDiv) {
      if (type.includes(key)) {
        const divGroupIndex: number = bpmnElementPadDiv[key]
        removeCustomIcon(divGroupIndex)
      }
    }
  }, [])

  const saveModel = useCallback((): void => {
    if (modelerRef && modelerRef.current) {
      modelerRef.current.saveXML(
        {
          format: true
        },
        (err: any, xml: string) => {
          if (err) {
            onError(err)
          } else {
            if (onElementChange) {
              onElementChange(xml)
            }
          }
        }
      )
    }
  }, [modelerRef, onElementChange, onError])

  const bpmnPadCustomButtonEventBus = useCallback((): void => {
    type eventBusType = { current: { element: { type: string } } }
    if (modelerRef && modelerRef.current) {
      const eventBus = modelerRef.current.get('eventBus')
      eventBus.on('elements.changed', (): void => {
        saveModel()
      })
      eventBus.on(
        'contextPad.open',
        ({
          current: {
            element: { type }
          }
        }: eventBusType): void => {
          removeCustomTaskButton(type)
        }
      )
    }
  }, [modelerRef, removeCustomTaskButton, saveModel])

  const memorizeSetModeler = useCallback((): void => {
    modelerRef.current = new BpmnModeler({
      container: canvas.current,
      keyboard: { bindTo: document },
      additionalModules: [
        propertiesProviderModule,
        minimapModule,
        customTranslateModule,
        CustomControlsModule
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      },
      height: modelerInnerHeight || window.innerHeight
    })
    memorizeImportXML()
    bpmnPadCustomButtonEventBus()
  }, [memorizeImportXML, modelerInnerHeight, bpmnPadCustomButtonEventBus, modelerRef])

  useEffect((): void => {
    memorizeSetModeler()
  }, [memorizeSetModeler])

  useEffect((): void => {
    document.addEventListener(TASK_SETTINGS_EVENT, (e: Event): void => onTaskTarget(e), false)
  }, [onTaskTarget])

  return (
    <div className="content" id="js-drop-zone">
      <div className="canvas" ref={canvas} />
      {children}
    </div>
  )
}

export default Bpmn
