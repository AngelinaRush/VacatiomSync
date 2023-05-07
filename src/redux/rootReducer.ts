import { combineReducers } from 'redux'

import teams, { TeamsState } from './teams/reducer'
import vacations, { VacationState } from './vacations/reducer'

export type RootState = {
  teams: TeamsState
  vacations: VacationState
}

export default combineReducers({
  teams,
  vacations,
})
