import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import minimapModule from 'diagram-js-minimap'
import Fullscreen from 'react-full-screen'
import customTranslate from './translations'
import BpmnActionButton, {
  FOCUS_ICON,
  ZOOM_IN_ICON,
  ZOOM_OUT_ICON,
  FULLSCREEN_ICON,
  FULLSCREEN_EXIT_ICON,
} from './BpmnActionButton'
import 'styles/index.scss'
import 'bpmn-font/css/bpmn-embedded.css'


const customTranslateModule = {
  translate: ['value', customTranslate]
}

const Bpmn = () => {
  const [zLevel, setZLevel] = useState(1)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const Z_STEP = 0.4
  const canvas = useRef(null)

  let modeler = useRef(null)

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

      modeler.current.importXML(xmlDiagram, error => {
        if (error) {
          console.error('error rendering', error)
          alert(error.toString())
        } else {
          modeler.current.get('canvas').zoom('fit-viewport', true)
        }
      })
    }
    setModeler()
  }, [])

  const getXMLFile = async source => {
    let response = null
    if (source)
      response = await axios.get(source)
    else
      response = await axios.get('/newDiagram.bpmn')
    return response.data
  }

  const fitToCenter = () => {
    modeler.current.get('canvas').zoom('fit-viewport', true)
  }

  const zoomIn = () => {
    const zoomScale = Math.min(zLevel + Z_STEP, 7)
    modeler.current.get('canvas').zoom(zoomScale, 'auto')
    setZLevel(zoomScale)
  }

  const zoomOut = () => {
    const zoomScale = Math.max(zLevel - Z_STEP, Z_STEP)
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
          <BpmnActionButton iconType={FOCUS_ICON} tooltipTitle='Centrar' onClick={fitToCenter} />
          <BpmnActionButton iconType={ZOOM_IN_ICON} tooltipTitle='Acercar' onClick={zoomIn} />
          <BpmnActionButton iconType={ZOOM_OUT_ICON} tooltipTitle='Alejar' onClick={zoomOut} />
          {isFullScreen ? <BpmnActionButton
            iconType={FULLSCREEN_EXIT_ICON}
            tooltipTitle='Salir de pantalla completa'
            onClick={
              () => setIsFullScreen(false)
            }
          /> :
            <BpmnActionButton
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
