import React, { useRef, useEffect, FC, useCallback, useState } from 'react'
import Fullscreen from 'react-full-screen'

import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import minimapModule from 'diagram-js-minimap'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

import { i18nSpanish } from './translations'
import CustomControlsModule, {
  TASK_SETTINGS_EVENT,
  TASK_DOCUMENTATION_EVENT
} from './CustomControlsModule'
import { newBpmnDiagram } from './default-bpmn-layout'
import ActionButton from './ActionButton'

import { BpmnType } from './types'
import { findLateralPadEntries, removeElementsByClass } from './utils'

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
  modelerRef,
  bpmnStringFile,
  modelerInnerHeight,
  actionButtonClassName = '',
  zStep = 0.4,
  elementClassesToRemove,
  padEntriesToRemove,
  onElementChange,
  onTaskTarget,
  onTaskDocumentationTarget,
  onError,
  children
}) => {
  const [zLevel, setZLevel] = useState(1)
  const [isFullScreen, setIsFullScreen] = useState(false)

  const canvas = useRef<HTMLDivElement>(null)

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Button handlers
  const fitViewport = useCallback((): void => {
    modelerRef?.current?.get('canvas').zoom('fit-viewport', true)
    setZLevel(1)
  }, [modelerRef])

  const handleZoom = (zoomScale: number): void => {
    modelerRef?.current?.get('canvas').zoom(zoomScale, 'auto')
    setZLevel(zoomScale)
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Custom pad entries
  const memorizeImportXML = useCallback((): void => {
    modelerRef?.current?.importXML(
      bpmnStringFile ? bpmnStringFile : newBpmnDiagram,
      (error: Error): void => (error instanceof Error ? onError(error) : fitViewport())
    )
  }, [onError, bpmnStringFile, modelerRef, fitViewport])

  const removeCustomTaskEntry = useCallback(
    (type: string) => {
      const lateralPadEntries: Element[] = findLateralPadEntries(type, padEntriesToRemove)

      if (lateralPadEntries.length > 0) {
        lateralPadEntries.forEach((element: Element) => {
          element.parentNode?.removeChild(element)
        })
      }
    },
    [padEntriesToRemove]
  )

  const saveModel = useCallback((): void => {
    modelerRef?.current?.saveXML(
      {
        format: true
      },
      (error: Error, xml: string) => {
        if (error instanceof Error) {
          onError(error)
        } else {
          if (onElementChange) {
            onElementChange(xml)
          }
        }
      }
    )
  }, [modelerRef, onElementChange, onError])

  const handleEventBus = useCallback((): void => {
    type eventBusType = { current: { element: { type: string } } }
    const eventBus = modelerRef?.current?.get('eventBus')
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
        removeCustomTaskEntry(type)
      }
    )
    eventBus.on('popupMenu.open', () => {
      setTimeout(() => removeElementsByClass(elementClassesToRemove), 1)
    })
  }, [modelerRef, removeCustomTaskEntry, saveModel, elementClassesToRemove])
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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
      height: modelerInnerHeight ? modelerInnerHeight : window.innerHeight
    })
    memorizeImportXML()
    handleEventBus()
    removeElementsByClass(elementClassesToRemove)
  }, [memorizeImportXML, modelerInnerHeight, handleEventBus, modelerRef, elementClassesToRemove])

  useEffect((): void => {
    memorizeSetModeler()
  }, [memorizeSetModeler])

  useEffect((): void => {
    document.addEventListener(
      TASK_SETTINGS_EVENT,
      (event: Event): void => onTaskTarget?.(event),
      false
    )
  }, [onTaskTarget])

  useEffect((): void => {
    document.addEventListener(
      TASK_DOCUMENTATION_EVENT,
      (event: Event): void => onTaskDocumentationTarget?.(event),
      false
    )
  }, [onTaskDocumentationTarget])

  return (
    <Fullscreen
      enabled={isFullScreen}
      onChange={(isFull: boolean): void => setIsFullScreen(isFull)}
    >
      <div className="content" id="js-drop-zone">
        <div className="canvas" ref={canvas} />
        <ActionButton
          actionButtonId="action-button-fit"
          actionButtonClass={`action-button-fit ${actionButtonClassName}`}
          onClick={fitViewport}
        />
        <ActionButton
          actionButtonId="action-button-zoom-in"
          actionButtonClass={`action-button-zoom-in ${actionButtonClassName}`}
          onClick={(): void => handleZoom(Math.min(zLevel + zStep, 7))}
        />
        <ActionButton
          actionButtonId="action-button-zoom-out"
          actionButtonClass={`action-button-zoom-out ${actionButtonClassName}`}
          onClick={(): void => handleZoom(Math.max(zLevel - zStep, zStep))}
        />
        {isFullScreen ? (
          <ActionButton
            actionButtonId="action-button-full-screen-exit"
            actionButtonClass={`action-button-full-screen-exit ${actionButtonClassName}`}
            onClick={(): void => setIsFullScreen(false)}
          />
        ) : (
          <ActionButton
            actionButtonId="action-button-full-screen"
            actionButtonClass={`action-button-full-screen ${actionButtonClassName}`}
            onClick={(): void => setIsFullScreen(true)}
          />
        )}
        {children}
      </div>
    </Fullscreen>
  )
}

export default Bpmn
