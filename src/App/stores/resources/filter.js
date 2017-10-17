import createReducer from '../utils/createReducer'

import t from './actions/constants'

export const defaultState = 'all'

export default (type) => createReducer({
  initialState: defaultState,

  [t.SET_FILTER]: (state, { payload: { filter }}) => {
    return filter
  }
})

export const getFilter = state => state
