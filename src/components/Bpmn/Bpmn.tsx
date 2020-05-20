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

import { BpmnType, BpmnModelerType } from './types'

import { useBpmnActionButtons } from './Bpmn.styles'
import 'styles/index.scss'
import 'bpmn-font/css/bpmn-embedded.css'
import 'bpmn-font/css/bpmn.css'

const customTranslateModule = {
  translate: [
    'value',
    (template: string, replacements: { type: string } | undefined): string => {
      const templateTranslated = i18nSpanish[template] || template
      if (replacements && i18nSpanish[replacements.type]) {
        return templateTranslated.replace(
          /{([^}]+)}/g,
          (_: string, key: number): string => `${i18nSpanish[replacements.type]}`
        )
      }

      return templateTranslated
    }
  ]
}

const Bpmn: FC<BpmnType> = ({ bpmnStringFile, onTaskTarget, onError }) => {
  const classes = useBpmnActionButtons()
  const [zLevel, setZLevel] = useState(1)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const Z_STEP = 0.4
  const canvas = useRef<HTMLDivElement>(null)

  const modeler = useRef<BpmnModelerType>()

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Custom button handlers
  const fitViewport = (): void => {
    if (modeler && modeler.current) {
      modeler.current.get('canvas').zoom('fit-viewport', true)
    }
  }

  const handleZoom = (zoomScale: number): void => {
    if (modeler && modeler.current) {
      modeler.current.get('canvas').zoom(zoomScale, 'auto')
    }
    setZLevel(zoomScale)
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  const memorizeImportXML = useCallback((): void => {
    if (modeler && modeler.current) {
      modeler.current.importXML(bpmnStringFile || newBpmnDiagram, (error: Error): void =>
        error ? onError(error) : fitViewport()
      )
    }
  }, [onError, bpmnStringFile])

  const bpmnPadCustomButtonEventBus = (): void => {
    if (modeler && modeler.current) {
      const eventBus = modeler.current.get('eventBus')
      eventBus.on('contextPad.open', (e: { current: { element: { type: string } } }): void => {
        if (e.current.element.type !== 'bpmn:Task') {
          const groups = document.querySelectorAll('.group')
          const group = groups[1]
          if (group.lastChild) {
            group.lastChild.remove()
          }
        }
      })
    }
  }

  const memorizeSetModeler = useCallback((): void => {
    modeler.current = new BpmnModeler({
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
      height: window.innerHeight
    })
    memorizeImportXML()
    bpmnPadCustomButtonEventBus()
  }, [memorizeImportXML])

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
        <div className="canvas" ref={canvas}>
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
      </div>
    </Fullscreen>
  )
}

export default Bpmn
