import CustomContextPad from './CustomContextPad'
import CustomPalette from './CustomPalette'
import CustomRenderer from './CustomRenderer'

export {
  TASK_SETTINGS_EVENT,
  TASK_DOCUMENTATION_EVENT,
  SEQUENCE_FLOW_CONFIGURATION_EVENT,
  CUSTOM_REMOVE_ELEMENT_EVENT,
  customPadClassNames
} from './CustomContextPad.types'

export default {
  __init__: ['customContextPad', 'customPalette', 'customRenderer'],
  customContextPad: ['type', CustomContextPad],
  customPalette: ['type', CustomPalette],
  customRenderer: ['type', CustomRenderer]
}
