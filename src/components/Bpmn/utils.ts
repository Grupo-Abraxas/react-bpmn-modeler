import { PadEntriesType } from './types'
import { customPadClassNames } from './CustomControlsModule'

const getElements = (elementClasses: string[]): Element[] => {
  let elements: Element[] = []

  elementClasses.forEach(elementClass => {
    const element = document.getElementsByClassName(elementClass)
    elements = [...elements, ...element]
  })

  return elements
}

export const findLateralPadEntries = (
  type: string,
  customPadEntries?: PadEntriesType,
  classesToAvoid?: string[]
): Element[] => {
  if (customPadEntries) {
    for (const [key, lateralPadEntryClasses] of Object.entries(customPadEntries)) {
      if (type.toLowerCase().includes(key.toLowerCase())) {
        let hiddenPadEntries = customPadClassNames.filter(
          customPadClass => !lateralPadEntryClasses.includes(customPadClass)
        )
        hiddenPadEntries = [...hiddenPadEntries, ...classesToAvoid]

        return getElements(hiddenPadEntries)
      }
    }
  }

  return []
}

export const removeElementsByClass = (classToRemove?: string[]): void => {
  let elements: Element[] = []
  if (!classToRemove) {
    return
  }
  elements = getElements(classToRemove)
  if (elements.length > 0) {
    elements.forEach((element: Element): void => {
      element.remove()
    })
  }
}
