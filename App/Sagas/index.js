import { takeLatest } from 'redux-saga'

/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux'
import { FilesTypes } from '../Redux/FilesRedux'
import { FileTypes } from '../Redux/FileRedux'

/* ------------- Sagas ------------- */

import { login } from './LoginSagas'
import { fetchFiles } from './FilesSagas'
import { fetchFile, postFile } from './FileSaga'

/* ------------- Connect Types To Sagas ------------- */

export default function * root (api) {
  yield [
    takeLatest(FilesTypes.FILES_REQUEST, fetchFiles, api),
    takeLatest(FileTypes.FILE_REQUEST, fetchFile, api),
    takeLatest(FileTypes.FILE_UPLOAD, postFile, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
  ]
}
