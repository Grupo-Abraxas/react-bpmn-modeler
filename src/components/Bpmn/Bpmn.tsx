import React, { useRef, useEffect, useState, FC, useCallback } from 'react'
import Fullscreen from 'react-full-screen'

import {
  GpsNotFixed as CenterFocusStrongIcon,
  Add as ZoomInIcon,
  Remove as ZoomOutIcon,
  FullscreenSharp as FullscreenSharpIcon,
  FullscreenExitSharp as FullscreenExitSharpIcon
} from '@material-ui/icons'

import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import minimapModule from 'diagram-js-minimap'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

import { i18nSpanish } from './translations'
import BpmnActionButton from './BpmnActionButton'
import CustomControlsModule, { TASK_SETTINGS_EVENT } from './CustomControlsModule'
import { newBpmnDiagram } from './default-bpmn-layout'

import { BpmnType } from './types'

import { useBpmnActionButtons } from './Bpmn.styles'
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
  onElementChange
}) => {
  const classes = useBpmnActionButtons()
  const [zLevel, setZLevel] = useState(1)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const Z_STEP = 0.4
  const canvas = useRef<HTMLDivElement>(null)

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Custom button handlers
  const fitViewport = useCallback((): void => {
    if (modelerRef && modelerRef.current) {
      modelerRef.current.get('canvas').zoom('fit-viewport', true)
      setZLevel(1)
    }
  }, [modelerRef])

  const handleZoom = (zoomScale: number): void => {
    if (modelerRef && modelerRef.current) {
      modelerRef.current.get('canvas').zoom(zoomScale, 'auto')
      setZLevel(zoomScale)
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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
    <Fullscreen
      enabled={isFullScreen}
      onChange={(isFull: boolean): void => setIsFullScreen(isFull)}
    >
      <div className="content" id="js-drop-zone">
        <div className="canvas" ref={canvas} />
        <BpmnActionButton
          stringStyles={classes.bpmnCenterButton}
          icon={<CenterFocusStrongIcon fontSize="large" />}
          tooltipTitle="Centrar"
          onClick={fitViewport}
        />
        <BpmnActionButton
          stringStyles={classes.bpmnZoomInButton}
          icon={<ZoomInIcon fontSize="large" />}
          tooltipTitle="Acercar"
          onClick={(): void => handleZoom(Math.min(zLevel + Z_STEP, 7))}
        />
        <BpmnActionButton
          stringStyles={classes.bpmnZoomOutButton}
          icon={<ZoomOutIcon fontSize="large" />}
          tooltipTitle="Alejar"
          onClick={(): void => handleZoom(Math.max(zLevel - Z_STEP, Z_STEP))}
        />
        {isFullScreen ? (
          <BpmnActionButton
            stringStyles={classes.bpmnFullscreenButton}
            icon={<FullscreenExitSharpIcon fontSize="large" />}
            tooltipTitle="Salir de pantalla completa"
            onClick={(): void => setIsFullScreen(false)}
          />
        ) : (
          <BpmnActionButton
            stringStyles={classes.bpmnFullscreenButton}
            icon={<FullscreenSharpIcon fontSize="large" />}
            tooltipTitle="Pantalla completa"
            onClick={(): void => setIsFullScreen(true)}
          />
        )}
      </div>
    </Fullscreen>
  )
}

export default Bpmn
