import { useCallback, useEffect, useReducer, useRef } from 'react'
import {
  IDLE_STATUS,
  LOADED_STATUS,
  INIT_STATUS,
  PENDING_STATUS,
  FILES_UPLOADED_STATUS,
  UPLOAD_ERROR_STATUS,
  LOAD_ACTION,
  SUBMIT_ACTION,
  NEXT_ACTION,
  FILE_UPLOADED_ACTION,
  FILES_UPLOADED_ACTION,
  SET_UPLOAD_ERROR,
} from './constants'


const api = {
  uploadFile({ timeout = 550 }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, timeout)
    })
  },
}

const logUploadedFile = (num, color = 'green') => {
  const msg = `%cUploaded ${num} files.`
  const style = `color:${color};font-weight:bold;`
  console.log(msg, style)
}


const initialState = {
  files: [],
  pending: [],
  next: null,
  uploading: false,
  uploaded: {},
  fileHandlerStatus: IDLE_STATUS,
}

const reducer = (state, action) => {
  switch (action.type) {
    case LOAD_ACTION:
      return { ...state, files: action.files, fileHandlerStatus: LOADED_STATUS }
    case SUBMIT_ACTION:
      return { ...state, uploading: true, pending: state.files, fileHandlerStatus: INIT_STATUS }
    case NEXT_ACTION:
      return {
        ...state,
        next: action.next,
        fileHandlerStatus: PENDING_STATUS,
      }
    case FILE_UPLOADED_ACTION:
      return {
        ...state,
        next: null,
        pending: action.pending,
        uploaded: {
          ...state.uploaded,
          [action.prev.id]: action.prev.file,
        },
      }
    case FILES_UPLOADED_ACTION:
      return { ...state, uploading: false, fileHandlerStatus: FILES_UPLOADED_STATUS }
    case SET_UPLOAD_ERROR:
      return { ...state, uploadError: action.error, fileHandlerStatus: UPLOAD_ERROR_STATUS }
    default:
      return state
  }
}

const FileHandler = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (state.files.length) {
        dispatch({ type: SUBMIT_ACTION })
      } else {
        window.alert("You don't have any files loaded.")
      }
    },
    [state.files.length],
  )

  const onChange = e => {
    if (e.target.files.length) {
      const arrFiles = Array.from(e.target.files)
      const files = arrFiles.map((file, index) => {
        const src = window.URL.createObjectURL(file)
        return { file, id: index, src }
      })
      dispatch({ type: LOAD_ACTION, files })
    }
  }

  // Sets the next file when it detects that its ready to go
  useEffect(() => {
    if (state.pending.length && state.next == null) {
      const next = state.pending[0]
      dispatch({ type: NEXT_ACTION, next })
    }
  }, [state.next, state.pending])

  const countRef = useRef(0)

  // Processes the next pending thumbnail when ready
  useEffect(() => {
    if (state.pending.length && state.next) {
      const { next } = state
      api
        .uploadFile(next)
        .then(() => {
          const prev = next
          logUploadedFile(++countRef.current)
          const pending = state.pending.slice(1)
          dispatch({ type: FILE_UPLOADED_ACTION, prev, pending })
        })
        .catch((error) => {
          console.error(error)
          dispatch({ type: SET_UPLOAD_ERROR, error })
        })
    }
  }, [state])

  // Ends the upload process
  useEffect(() => {
    if (!state.pending.length && state.uploading) {
      dispatch({ type: FILES_UPLOADED_ACTION })
    }
  }, [state.pending.length, state.uploading])

  return {
    ...state,
    onSubmit,
    onChange,
  }
}

export default FileHandler
