import { combineReducers } from 'redux'

import teams from './teams/reducer'
import vacations from './vacations/reducer'

export default combineReducers({
  teams,
  vacations,
})
