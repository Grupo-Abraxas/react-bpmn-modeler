import { PadEntriesToRemoveType } from './types'

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
  entriesToRemove?: PadEntriesToRemoveType
): Element[] => {
  if (entriesToRemove) {
    for (const [key, lateralPadEntryClasses] of Object.entries(entriesToRemove)) {
      if (type.includes(key) && lateralPadEntryClasses.length > 0) {
        return getElements(lateralPadEntryClasses)
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
