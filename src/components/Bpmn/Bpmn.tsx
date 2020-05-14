import React, { useRef, useEffect, useState, FC, MutableRefObject } from 'react'
import Fullscreen from 'react-full-screen'
import axios from 'axios'

import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import minimapModule from 'diagram-js-minimap'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

import { i18nSpanish } from './translations'
import BpmnActionButton, {
  FOCUS_ICON,
  ZOOM_IN_ICON,
  ZOOM_OUT_ICON,
  FULLSCREEN_ICON,
  FULLSCREEN_EXIT_ICON,
} from './BpmnActionButton'
import CustomControlsModule from './CustomControlsModule'

import { BpmnModelerType } from './types'
import { TASK_SETTINGS_EVENT } from './CustomControlsModule'

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

type BpmnType = {
  onTaskTarget?: Function
}

const Bpmn: FC<BpmnType> = ({ onTaskTarget }) => {
  const classes = useBpmnActionButtons()
  const [zLevel, setZLevel] = useState(1)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const Z_STEP = 0.4
  const canvas = useRef<HTMLDivElement>(null)

  let modeler = useRef<BpmnModelerType>()

  // Task settings event listeners
  useEffect(() => {
    document.addEventListener(TASK_SETTINGS_EVENT, (e: Event) => {
      if (onTaskTarget)
        onTaskTarget(e)
    }, false)
  }, [onTaskTarget])


  // Helpers, definition and inicialization of BpmnModeler
  const getXMLFile = async (source?: string) => {
    let response = null
    if (source)
      response = await axios.get(source)
    else
      response = await axios.get('/newDiagram.bpmn')
    return response.data
  }

  const importBpmnFile = (
    modeler: MutableRefObject<BpmnModelerType | undefined>,
    xmlDiagram: any
  ): void => {
    if (modeler && modeler.current)
      modeler.current.importXML(xmlDiagram, (error: any) => {
        if (error) {
          console.error('error rendering', error)
          alert(error.toString())
        } else {
          if (modeler && modeler.current)
            modeler.current.get('canvas').zoom('fit-viewport', true)
        }
      })
  }

  const bpmnPadCustomButtonEventBus = (modeler: MutableRefObject<BpmnModelerType | undefined>): void => {
    if (modeler && modeler.current) {
      const eventBus = modeler.current.get('eventBus')
      eventBus.on('contextPad.open', (e: any) => {
        if (e.current.element)
          if (e.current.element.type !== 'bpmn:Task') {
            const groups = document.querySelectorAll('.group')
            const group = groups[1]
            if (group.lastChild)
              group.lastChild.remove()
          }
      })
    }
  }

  const setModeler = async () => {
    let xmlDiagram = await getXMLFile()

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
      height: 927,
    })

    importBpmnFile(modeler, xmlDiagram)
    bpmnPadCustomButtonEventBus(modeler)
  }

  useEffect(() => {
    setModeler()
  }, [])


  const fitToCenter = () => {
    if (modeler && modeler.current)
      modeler.current.get('canvas').zoom('fit-viewport', true)
  }

  const zoomIn = () => {
    const zoomScale = Math.min(zLevel + Z_STEP, 7)
    if (modeler && modeler.current)
      modeler.current.get('canvas').zoom(zoomScale, 'auto')
    setZLevel(zoomScale)
  }

  const zoomOut = () => {
    const zoomScale = Math.max(zLevel - Z_STEP, Z_STEP)
    if (modeler && modeler.current)
      modeler.current.get('canvas').zoom(zoomScale, 'auto')
    setZLevel(zoomScale)
  }


  return <>
    <Fullscreen
      enabled={isFullScreen}
      onChange={isFull => setIsFullScreen(isFull)}
    >
      <div className='content' id='js-drop-zone'>
        <div className='canvas' ref={canvas}>
          <BpmnActionButton
            stringStyles={classes.bpmnCenterButton}
            iconType={FOCUS_ICON}
            tooltipTitle='Centrar'
            onClick={fitToCenter}
          />
          <BpmnActionButton
            stringStyles={classes.bpmnZoomInButton}
            iconType={ZOOM_IN_ICON}
            tooltipTitle='Acercar'
            onClick={zoomIn}
          />
          <BpmnActionButton
            stringStyles={classes.bpmnZoomOutButton}
            iconType={ZOOM_OUT_ICON}
            tooltipTitle='Alejar'
            onClick={zoomOut}
          />
          {isFullScreen ? <BpmnActionButton
            stringStyles={classes.bpmnFullscreenButton}
            iconType={FULLSCREEN_EXIT_ICON}
            tooltipTitle='Salir de pantalla completa'
            onClick={
              () => setIsFullScreen(false)
            }
          /> :
            <BpmnActionButton
              stringStyles={classes.bpmnFullscreenButton}
              iconType={FULLSCREEN_ICON}
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
