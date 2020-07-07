type PaletteEntryAction = (event: MouseEvent) => void

export type getPaletteEntriesType = {
  'append.script-validation-task': {
    group: string
    className: string
    title: string
    action: {
      click: PaletteEntryAction
      dragstart: PaletteEntryAction
    }
  }
}

type AppendCustomTaskStartReturnType = (event: MouseEvent) => void
export type AppendServiceTaskType = (taskLabelText: string) => AppendCustomTaskStartReturnType
