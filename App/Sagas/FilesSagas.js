import { call, put } from 'redux-saga/effects'
import FilesActions from '../Redux/FilesRedux'

// attempts to login
export function * fetchFiles (api) {
  try {
    const filesData = yield call([api, api.request], '/files');
    console.log('filesData, ', filesData)
    yield put(FilesActions.filesSuccess(filesData))
  } catch (e) {
    yield put(FilesActions.filesFailure('WRONG'))
  }
}
