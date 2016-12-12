import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fileUpload: ['data'],
  fileRequest: ['data'],
  fileSuccess: ['payload'],
  fileReset: null,
  fileFailure: null
})

export const FileTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, payload: null })

export const reset = (state, { data }) =>
  state.merge({ fetching: false, data: null })

export const upload = (state, { data }) =>
  state.merge({ fetching: true, data: null })

// successful api lookup
export const success = (state, action) => {
  console.log('reeeeee', action)
  const { payload } = action
  return state.merge({ fetching: false, error: null, data: payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FILE_REQUEST]: request,
  [Types.FILE_SUCCESS]: success,
  [Types.FILE_FAILURE]: failure,
  [Types.FILE_RESET]: reset,
  [Types.FILE_UPLOAD]: upload
})
