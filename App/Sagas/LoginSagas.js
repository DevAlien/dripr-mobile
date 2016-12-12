import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function * login (api, { data }) {
  try {
    const loginData = yield call([api, api.request], '/login-facebook', 'POST', data);
    api.setToken(loginData.accessToken);
    yield put(LoginActions.loginSuccess(loginData))
  } catch (e) {
    yield put(LoginActions.loginFailure('WRONG'))
  }
}
