import React, { useRef, useEffect } from 'react'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import axios from 'axios'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
import FileHandler, { LOADED_STATUS, IDLE_STATUS } from '../FileHandler'
import './index.scss'

const Input = props => <input
  type='file'
  accept='.bpmn'
  name='img-loader-input'
  multiple
  {...props}
/>


const Bpmn = () => {
  const canvas = useRef(null)
  const propertiesPanel = useRef(null)
  const {
    files,
    fileHandlerStatus,
    onChange,
  } = FileHandler()

  let modeler = useRef(null)

  useEffect(() => {
    const setModeler = async () => {
      let xmlDiagram = null
      if (fileHandlerStatus === LOADED_STATUS) {
        xmlDiagram = await getXMLFile(files[0].src)
        modeler.current.destroy()
      }
      else
        xmlDiagram = await getXMLFile()

      modeler.current = new BpmnModeler({
        container: canvas.current,
        keyboard: { bindTo: document },
        propertiesPanel: {
          parent: propertiesPanel.current
        },
        additionalModules: [
          propertiesPanelModule,
          propertiesProviderModule
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        },
        height: 927,
      })

      modeler.current.importXML(xmlDiagram, error => {
        if (error) {
          console.error('error rendering', error)
          alert(error.toString())
        } else {
          modeler.current.get('canvas').zoom('fit-viewport')
        }
      })
    }
    setModeler()
  }, [fileHandlerStatus, files])

  const getXMLFile = async source => {
    let response = null
    if (source)
      response = await axios.get(source)
    else
      response = await axios.get('/newDiagram.bpmn')
    return response.data
  }

  const saveModel = () => {
    modeler.current.saveXML(
      {
        format: true
      }, (error, xml) => {
        if (error) {
          console.error(error)
        } else {
          console.log(xml)
        }
      })
  }

  return <>
    <div className='header'>

      <div className='file-handler-container'>
        <form className='file-handler-form'>
          <div>
            <Input onChange={onChange} />
          </div>
        </form>
      </div>

    </div>
    <div className='content' id='js-drop-zone'>
      <div className='message intro'>
        <div className='note'>
          {fileHandlerStatus === IDLE_STATUS && <h1>Create a diagram</h1>}
          {fileHandlerStatus === LOADED_STATUS && <h1>Edit diagram</h1>}
        </div>
      </div>
      <div className='canvas' ref={canvas}>
        <button className='export-button' id='export-to-console' onClick={saveModel} >Print XML in console</button>
      </div>
      <div className='properties-panel' ref={propertiesPanel}></div>
    </div>
  </>
}


export default Bpmn
