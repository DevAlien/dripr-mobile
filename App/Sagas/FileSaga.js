import { call, put } from 'redux-saga/effects'
import FileActions from '../Redux/FileRedux'

// attempts to login
export function * fetchFile (api, data) {
  try {
    console.log('dataaaa', data)
    const fileData = yield call([api, api.request], `/files/${data.data}`);
    yield put(FileActions.fileSuccess(fileData))
  } catch (e) {
    yield put(FileActions.fileFailure('WRONG'))
  }
}

export function * postFile (api, data) {
  try {
    console.log('dataaaa', data)
    const fileData = yield call([api, api.postFile], data.data);
    yield put(FileActions.fileSuccess(fileData))
  } catch (e) {
    yield put(FileActions.fileFailure('WRONG'))
  }
}