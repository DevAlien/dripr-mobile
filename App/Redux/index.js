// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    login: require('./LoginRedux').reducer,
    files: require('./FilesRedux').reducer,
    file: require('./FileRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}