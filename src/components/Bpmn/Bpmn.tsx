import React, { useRef, useEffect, FC, useCallback, useState } from 'react'
import Fullscreen from 'react-full-screen'

import minimapModule from 'diagram-js-minimap'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'

import { i18nSpanish } from './translations'
import CustomControlsModule, {
  TASK_SETTINGS_EVENT,
  TASK_DOCUMENTATION_EVENT,
  SEQUENCE_FLOW_CONFIGURATION_EVENT,
  CUSTOM_REMOVE_ELEMENT_EVENT
} from './CustomControlsModule'
import { newBpmnDiagram } from './default-bpmn-layout'
import ActionButton from './ActionButton'

import { BpmnType, RemoveCustomTaskEntryType } from './Bpmn.types'
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
  bpmnJsModeler,
  moddleExtensions,
  bpmnStringFile,
  modelerInnerHeight,
  actionButtonClassName = '',
  zStep = 0.4,
  defaultStrokeColor = 'black',
  showPropertiesPanel = false,
  elementClassesToRemove,
  customPadEntries,
  onElementChange,
  onTaskConfigurationClick,
  onTaskDocumentationClick,
  onSequenceFlowConfigurationClick,
  onRemoveClick,
  onShapeCreate,
  onRootShapeUpdate,
  onError,
  children
}) => {
  const [zLevel, setZLevel] = useState(1)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [openPropertiesPanel, setOpenPropertiesPanel] = useState(false)

  const canvas = useRef<HTMLDivElement>(null)

  const fitViewportButtonHandler = useCallback((): void => {
    modelerRef.current?.get('canvas').zoom('fit-viewport', true)
    setZLevel(1)
  }, [modelerRef])

  const handleZoomButtonHandler = (zoomScale: number): void => {
    modelerRef.current?.get('canvas').zoom(zoomScale, 'auto')
    setZLevel(zoomScale)
  }

  const memorizeImportXMLCustomPadEntry = useCallback((): void => {
    modelerRef.current?.importXML(
      bpmnStringFile ? bpmnStringFile : newBpmnDiagram,
      (error: Error): void => (error instanceof Error ? onError(error) : fitViewportButtonHandler())
    )
  }, [onError, bpmnStringFile, modelerRef, fitViewportButtonHandler])

  const removeCustomPadTaskEntry = useCallback(
    (type: string, sourceRefType?: string) => {
      const classesToAvoid = []
      if (!sourceRefType?.toLowerCase().includes('gateway')) {
        classesToAvoid.push('bpmn-icon-custom-sequence-flow-configuration')
      }
      const lateralPadEntries: Element[] = findLateralPadEntries(
        type,
        customPadEntries,
        classesToAvoid
      )

      if (lateralPadEntries.length > 0) {
        lateralPadEntries.forEach((element: Element) => {
          element.parentNode?.removeChild(element)
        })
      }
    },
    [customPadEntries]
  )

  const saveModel = useCallback((): void => {
    modelerRef.current?.saveXML(
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
    const eventBus = modelerRef.current?.get('eventBus')
    const modeling = modelerRef.current?.get('modeling')

    eventBus.on('elements.changed', (): void => saveModel())

    eventBus.on('contextPad.open', ({ current: { element } }: RemoveCustomTaskEntryType): void => {
      const sourceRefType = Object(element).businessObject.sourceRef?.$type
      removeCustomPadTaskEntry(Object(element).type, sourceRefType)
    })
    eventBus.on(
      'commandStack.shape.create.postExecuted',
      ({ context: { shape } }: { context: { shape: object } }): void => {
        modeling.setColor(shape, {
          stroke: defaultStrokeColor
        })
        if (onShapeCreate) {
          onShapeCreate(Object(shape).id)
        }
      }
    )

    eventBus.on(
      'commandStack.canvas.updateRoot.postExecute',
      ({
        context: {
          newRoot: { id, type }
        }
      }: {
        context: { newRoot: { id: string; type: string } }
      }): void => {
        if (onRootShapeUpdate) {
          onRootShapeUpdate(id, type)
        }
      }
    )

    eventBus.on('popupMenu.open', () => {
      setTimeout(() => removeElementsByClass(elementClassesToRemove), 1)
    })

    eventBus.on('bpmnElement.added', (event: object): void => {
      if (!Object(event).element.type.toLowerCase().includes('flow')) {
        modeling.setColor(Object(event).element, {
          stroke: defaultStrokeColor
        })
      }
    })
  }, [
    modelerRef,
    removeCustomPadTaskEntry,
    saveModel,
    onShapeCreate,
    elementClassesToRemove,
    defaultStrokeColor,
    onRootShapeUpdate
  ])

  const memorizeSetModeler = useCallback((): void => {
    modelerRef.current = new bpmnJsModeler({
      container: canvas.current,
      keyboard: { bindTo: document },
      additionalModules: [
        minimapModule,
        propertiesPanelModule,
        propertiesProviderModule,
        customTranslateModule,
        CustomControlsModule
      ],
      propertiesPanel: {
        parent: '#panel-properties'
      },
      moddleExtensions,
      height: modelerInnerHeight ? modelerInnerHeight : window.innerHeight
    })
    memorizeImportXMLCustomPadEntry()
    handleEventBus()
    removeElementsByClass(elementClassesToRemove)
  }, [
    bpmnJsModeler,
    memorizeImportXMLCustomPadEntry,
    modelerInnerHeight,
    handleEventBus,
    modelerRef,
    elementClassesToRemove,
    moddleExtensions
  ])

  useEffect((): void => {
    memorizeSetModeler()
  }, [memorizeSetModeler])

  useEffect((): void => {
    document.addEventListener(
      TASK_SETTINGS_EVENT,
      (event: Event): void => onTaskConfigurationClick?.(event),
      false
    )
  }, [onTaskConfigurationClick])

  useEffect((): void => {
    document.addEventListener(
      TASK_DOCUMENTATION_EVENT,
      (event: Event): void => onTaskDocumentationClick?.(event),
      false
    )
  }, [onTaskDocumentationClick])

  useEffect((): void => {
    document.addEventListener(
      SEQUENCE_FLOW_CONFIGURATION_EVENT,
      (event: Event): void => onSequenceFlowConfigurationClick?.(event),
      false
    )
  }, [onSequenceFlowConfigurationClick])

  useEffect((): void => {
    document.addEventListener(
      CUSTOM_REMOVE_ELEMENT_EVENT,
      (event: Event): void => onRemoveClick?.(event),
      false
    )
  }, [onRemoveClick])

  return (
    <Fullscreen
      enabled={isFullScreen}
      onChange={(isFull: boolean): void => setIsFullScreen(isFull)}
    >
      <div
        className="content"
        style={openPropertiesPanel ? { display: 'flex' } : {}}
        id="js-drop-zone"
      >
        <div className="canvas" ref={canvas}>
          {showPropertiesPanel ? (
            <ActionButton
              actionButtonId="action-button-panel"
              actionButtonClass={`action-button-panel ${actionButtonClassName}`}
              onClick={(): void => setOpenPropertiesPanel(!openPropertiesPanel)}
            />
          ) : (
            ''
          )}
          <ActionButton
            actionButtonId="action-button-fit"
            actionButtonClass={`action-button-fit ${actionButtonClassName}`}
            onClick={fitViewportButtonHandler}
          />
          <ActionButton
            actionButtonId="action-button-zoom-in"
            actionButtonClass={`action-button-zoom-in ${actionButtonClassName}`}
            onClick={(): void => handleZoomButtonHandler(Math.min(zLevel + zStep, 7))}
          />
          <ActionButton
            actionButtonId="action-button-zoom-out"
            actionButtonClass={`action-button-zoom-out ${actionButtonClassName}`}
            onClick={(): void => handleZoomButtonHandler(Math.max(zLevel - zStep, zStep))}
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
        </div>
        <div id="panel-properties" hidden={!openPropertiesPanel} />
        {children}
      </div>
    </Fullscreen>
  )
}

export default Bpmn
