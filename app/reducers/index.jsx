import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  projections: require('./projections').default
})

export default rootReducer
