import React, { useRef, useEffect, useState, FC, useCallback } from 'react'
import Fullscreen from 'react-full-screen'
import axios from 'axios'

import {
  GpsNotFixed as CenterFocusStrongIcon,
  Add as ZoomInIcon,
  Remove as ZoomOutIcon,
  FullscreenSharp as FullscreenSharpIcon,
  FullscreenExitSharp as FullscreenExitSharpIcon,
} from '@material-ui/icons'

import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import minimapModule from 'diagram-js-minimap'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

import { i18nSpanish } from './translations'
import BpmnActionButton from './BpmnActionButton'

import { BpmnType, BpmnModelerType } from './types'
import CustomControlsModule, { TASK_SETTINGS_EVENT } from './CustomControlsModule'

import { useBpmnActionButtons } from './Bpmn.styles'
import 'styles/index.scss'
import 'bpmn-font/css/bpmn-embedded.css'
import 'bpmn-font/css/bpmn.css'


const customTranslateModule = {
  translate: ['value', (template: string, replacements: object): string => {
    template = Object(i18nSpanish)[template] || template
    return template.replace(/{([^}]+)}/g, (_: string, key: number): string => Object(replacements)[key] || `${key}`)
  }]
}

const Bpmn: FC<BpmnType> = ({ onTaskTarget, onError }) => {
  const classes = useBpmnActionButtons()
  const [zLevel, setZLevel] = useState(1)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const Z_STEP = 0.4
  const canvas = useRef<HTMLDivElement>(null)

  let modeler = useRef<BpmnModelerType>()

  // Task settings event listeners
  useEffect(() => {
    document.addEventListener(TASK_SETTINGS_EVENT, (e: Event) => onTaskTarget(e), false)
  }, [onTaskTarget])


  // Custom button handlers
  const fitViewport = (): void => (modeler && modeler.current)
    && modeler.current.get('canvas').zoom('fit-viewport', true)

  const handleZoom = (zoomScale: number): void => {
    (modeler && modeler.current) && modeler.current.get('canvas').zoom(zoomScale, 'auto')
    setZLevel(zoomScale)
  }

  // Helpers, definition and inicialization of BpmnModeler
  const getXMLFile = async (source?: string): Promise<string> => {
    let response = null
    if (source)
      response = await axios.get(source)
    else
      response = await axios.get('/newDiagram.bpmn')
    return response.data
  }

  const memorizeImportXML = useCallback((): void => {
    const importXML = async (): Promise<any> => {
      let xmlDiagram: string = await getXMLFile()
      if (modeler && modeler.current)
        modeler.current.importXML(xmlDiagram, (error: any) => {
          if (error) {
            console.error('error rendering', error)
            alert(error.toString())
          } else {
            fitViewport()
          }
        })
    }
    importXML()
  }, [])

  const bpmnPadCustomButtonEventBus = (): void => {
    if (modeler && modeler.current) {
      const eventBus = modeler.current.get('eventBus')
      eventBus.on('contextPad.open', (e: { current: { element: { 'type': string } } }) => {
        if (e.current.element.type !== 'bpmn:Task') {
          const groups = document.querySelectorAll('.group')
          const group = groups[1]
          if (group.lastChild)
            group.lastChild.remove()
        }
      })
    }
  }

  const memorizeSetModeler = useCallback(async () => {
    modeler.current = new BpmnModeler({
      container: canvas.current,
      keyboard: { bindTo: document },
      additionalModules: [
        propertiesProviderModule,
        minimapModule,
        customTranslateModule,
        CustomControlsModule,
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor,
      },
      height: window.innerHeight,
    })
    memorizeImportXML()
    bpmnPadCustomButtonEventBus()
  }, [memorizeImportXML])

  useEffect(() => {
    memorizeSetModeler()
  }, [memorizeSetModeler])

  return <>
    <Fullscreen
      enabled={isFullScreen}
      onChange={isFull => setIsFullScreen(isFull)}
    >
      <div className='content' id='js-drop-zone'>
        <div className='canvas' ref={canvas}>
          <BpmnActionButton
            stringStyles={classes.bpmnCenterButton}
            icon={<CenterFocusStrongIcon fontSize='large' />}
            tooltipTitle='Centrar'
            onClick={fitViewport}
          />
          <BpmnActionButton
            stringStyles={classes.bpmnZoomInButton}
            icon={<ZoomInIcon fontSize='large' />}
            tooltipTitle='Acercar'
            onClick={() => handleZoom(Math.min(zLevel + Z_STEP, 7))}
          />
          <BpmnActionButton
            stringStyles={classes.bpmnZoomOutButton}
            icon={<ZoomOutIcon fontSize='large' />}
            tooltipTitle='Alejar'
            onClick={() => handleZoom(Math.max(zLevel - Z_STEP, Z_STEP))}
          />
          {isFullScreen
            ? <BpmnActionButton
              stringStyles={classes.bpmnFullscreenButton}
              icon={<FullscreenExitSharpIcon fontSize='large' />}
              tooltipTitle='Salir de pantalla completa'
              onClick={
                () => setIsFullScreen(false)
              }
            />
            : <BpmnActionButton
              stringStyles={classes.bpmnFullscreenButton}
              icon={<FullscreenSharpIcon fontSize='large' />}
              tooltipTitle='Pantalla completa'
              onClick={() => setIsFullScreen(true)}
            />
          }
        </div>
      </div>
    </Fullscreen>
  </>
}


export default Bpmn
