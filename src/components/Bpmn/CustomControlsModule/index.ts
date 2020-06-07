import CustomContextPad from './CustomContextPad'
import CustomPalette from './CustomPalette'

export { TASK_SETTINGS_EVENT, TASK_LABEL_EVENT } from './types'

export default {
  __init__: ['customContextPad', 'customPalette'],
  customContextPad: ['type', CustomContextPad],
  customPalette: ['type', CustomPalette]
}
