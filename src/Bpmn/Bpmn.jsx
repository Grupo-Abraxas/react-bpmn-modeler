import React, { useState, useRef, useEffect, createRef } from 'react'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import axios from 'axios'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
import './index.scss'
import './styles/main.scss'


const Bpmn = () => {
  const canvas = useRef(null)
  const propertiesPanel = useRef(null)

  // Create new Modeler
  let modeler = null

  useEffect(() => {
    const setModeler = async () => {
      modeler = new BpmnModeler({
        container: canvas.current,
        // keyboard: { bindTo: document },
        propertiesPanel: {
          parent: propertiesPanel.current
        },
        additionalModules: [
          propertiesPanelModule,
          propertiesProviderModule
        ],
        // needed if you'd like to maintain camunda:XXX properties in the properties panel
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        },
      })
      const newDiagramXML = await getXMLFile()
      modeler.importXML(newDiagramXML, function (err) {
        if (err) {
          console.log('error rendering', err)
        } else {
          console.log('rendered')
        }
      })
    }
    setModeler()
  }, [])

  const getXMLFile = async () => {
    const response = await axios.get('/newDiagram.bpmn')
    return response.data
  }

  const saveModel = () => {
    modeler.saveXML(
      {
        format: true
      }, (err, xml) => {
        if (err) {
          console.error(err)
        } else {
          console.log(xml)
        }
      })
  }

  return <div className='modeler'>
    <button className='export' id='export-to-console' onClick={saveModel} >export to console</button>
    <div className='canvas' ref={canvas}> </div>
    <div className='panel' ref={propertiesPanel}> </div>
  </div>
}


export default Bpmn
