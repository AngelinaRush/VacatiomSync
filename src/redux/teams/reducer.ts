import {
  LOAD_TEAMS,
  LOAD_TEAMS_FAILURE,
  LOAD_TEAMS_SUCCESS,
  ADD_TEAM,
  ADD_TEAM_FAILURE,
  ADD_TEAM_SUCCESS,
  REMOVE_TEAM,
  REMOVE_TEAM_FAILURE,
  REMOVE_TEAM_SUCCESS,
} from './actions'

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
    case ADD_TEAM_FAILURE:
      return state
    case ADD_TEAM_SUCCESS:
      return [...state, action.payload]
    case REMOVE_TEAM:
    case REMOVE_TEAM_FAILURE:
      return state
    case REMOVE_TEAM_SUCCESS: {
      const newState = state.reduce((acc, team) => {
        if (!(team.id === action.id)) {
          acc.push(team)
        }
        return acc
      }, [] as TeamsState)

      return newState
    }
    default:
      return state
  }
}

export default teams
