import { combineReducers } from 'redux'

import team, { TeamState } from './team/reducer'
import teams, { TeamsState } from './teams/reducer'
import vacations, { VacationState } from './vacations/reducer'

export type RootState = {
  teams: TeamsState
  vacations: VacationState
  team: TeamState
}

export default combineReducers({
  teams,
  vacations,
  team,
})
