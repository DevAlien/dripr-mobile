import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/FileRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.fileRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.fileSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.fileFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
