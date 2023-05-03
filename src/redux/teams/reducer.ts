import { LOAD_TEAMS, LOAD_TEAMS_FAILURE, LOAD_TEAMS_SUCCESS, ADD_TEAM } from './actions'

import { Team } from '../../types'

type TeamsState = Team[]

const teams = (state: TeamsState = [], action: any) => {
  switch (action.type) {
    case LOAD_TEAMS:
      return null
    case LOAD_TEAMS_FAILURE:
      return null
    case LOAD_TEAMS_SUCCESS:
      return action.payload
    case ADD_TEAM:
      return [...state, action.payload]
    default:
      return state
  }
}

export default teams
