import React, { useRef, useEffect, useState, FC } from 'react'
import Fullscreen from 'react-full-screen'
import axios from 'axios'

import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import minimapModule from 'diagram-js-minimap'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

import customTranslate from './translations'
import BpmnActionButton, {
  FOCUS_ICON,
  ZOOM_IN_ICON,
  ZOOM_OUT_ICON,
  FULLSCREEN_ICON,
  FULLSCREEN_EXIT_ICON,
} from './BpmnActionButton'

import { BpmnModelerType } from './types'

import { useBpmnActionButtons } from './Bpmn.styles'
import 'styles/index.scss'
import 'bpmn-font/css/bpmn-embedded.css'


const customTranslateModule = {
  translate: ['value', customTranslate]
}

const Bpmn: FC<{}> = () => {
  const classes = useBpmnActionButtons()
  const [zLevel, setZLevel] = useState(1)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const Z_STEP = 0.4
  const canvas = useRef<HTMLDivElement>(null)

  let modeler = useRef<BpmnModelerType>()

  useEffect(() => {
    const setModeler = async () => {
      let xmlDiagram = await getXMLFile()

      modeler.current = new BpmnModeler({
        container: canvas.current,
        keyboard: { bindTo: document },
        additionalModules: [
          propertiesProviderModule,
          minimapModule,
          customTranslateModule,
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor,
        },
        height: 927,
      })

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
    setModeler()
  }, [])

  const getXMLFile = async (source?: string) => {
    let response = null
    if (source)
      response = await axios.get(source)
    else
      response = await axios.get('/newDiagram.bpmn')
    return response.data
  }

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
            styles={classes.bpmnCenterButton}
            iconType={FOCUS_ICON}
            tooltipTitle='Centrar'
            onClick={fitToCenter}
          />
          <BpmnActionButton
            styles={classes.bpmnZoomInButton}
            iconType={ZOOM_IN_ICON}
            tooltipTitle='Acercar'
            onClick={zoomIn}
          />
          <BpmnActionButton
            styles={classes.bpmnZoomOutButton}
            iconType={ZOOM_OUT_ICON}
            tooltipTitle='Alejar'
            onClick={zoomOut}
          />
          {isFullScreen ? <BpmnActionButton
            styles={classes.bpmnFullscreenButton}
            iconType={FULLSCREEN_EXIT_ICON}
            tooltipTitle='Salir de pantalla completa'
            onClick={
              () => setIsFullScreen(false)
            }
          /> :
            <BpmnActionButton
              styles={classes.bpmnFullscreenButton}
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
