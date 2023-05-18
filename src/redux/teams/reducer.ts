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

export type TeamsState = {
  data: Team[]
  loading: boolean
  error: string
  newTeamId?: string
}

const defaultState = {
  loading: false,
  data: [],
  error: '',
}

const teams = (state: TeamsState = defaultState, action: any) => {
  switch (action.type) {
    case LOAD_TEAMS:
      return {
        loading: true,
        data: [],
        error: '',
      }
    case LOAD_TEAMS_FAILURE:
      return {
        loading: false,
        data: [],
        error: '',
      }
    case LOAD_TEAMS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: '',
      }
    case ADD_TEAM:
    case ADD_TEAM_FAILURE:
      return state
    case ADD_TEAM_SUCCESS:
      return {
        ...state,
        newTeamId: action.payload,
      }
    case REMOVE_TEAM:
    case REMOVE_TEAM_FAILURE:
      return state
    case REMOVE_TEAM_SUCCESS: {
      const newState = state.data.reduce<Team[]>((acc, team) => {
        if (!(team.id === action.id)) {
          acc.push(team)
        }
        return acc
      }, [])

      return { ...state, data: newState }
    }
    default:
      return state
  }
}

export default teams
