// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  filesRequest: ['data'],
  filesSuccess: ['data'],
  filesFailure: ['error']
})

export const FilesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  files: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to fetch files
export const request = (state: Object) => state.merge({ fetching: true })

// we've successfully fetched the files
export const success = (state: Object, { data }: Object) => 
  state.merge({ fetching: false, error: null, files: data })


// we've had a problem fetching the files
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FILES_REQUEST]: request,
  [Types.FILES_SUCCESS]: success,
  [Types.FILES_FAILURE]: failure
})

/* ------------- Selectors ------------- */