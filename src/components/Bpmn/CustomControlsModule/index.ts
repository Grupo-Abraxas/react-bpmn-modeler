import CustomContextPad from './CustomContextPad'
import CustomPalette from './CustomPalette'

export {
  TASK_SETTINGS_EVENT,
  TASK_DOCUMENTATION_EVENT,
  SEQUENCE_FLOW_CONFIGURATION_EVENT,
  customPadClassNames
} from './types'

export default {
  __init__: ['customContextPad', 'customPalette'],
  customContextPad: ['type', CustomContextPad],
  customPalette: ['type', CustomPalette]
}
