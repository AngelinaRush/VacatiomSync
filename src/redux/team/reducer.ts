import { getAuth } from 'firebase/auth'

import {
  LOAD_TEAM,
  LOAD_TEAM_FAILURE,
  LOAD_TEAM_SUCCESS,
  JOIN_TEAM,
  JOIN_TEAM_FAILURE,
  JOIN_TEAM_SUCCESS,
} from './actions'

import { Team } from '../../types'

export type TeamState = {
  data: Team | null
  loading: boolean
  hasInvite: boolean
}

const defaultState = {
  loading: false,
  data: null,
  hasInvite: false,
}

const team = (state: TeamState = defaultState, action: any) => {
  switch (action.type) {
    case LOAD_TEAM:
      return {
        loading: true,
        data: null,
        hasInvite: false,
      }
    case LOAD_TEAM_FAILURE:
      return {
        loading: false,
        data: null,
        hasInvite: false,
      }
    case LOAD_TEAM_SUCCESS: {
      const email = getAuth().currentUser?.email
      return {
        loading: false,
        data: action.payload,
        hasInvite: action.payload.invites.includes(email),
      }
    }
    case JOIN_TEAM:
      return {
        loading: true,
        data: state.data,
        hasInvite: false,
      }
    case JOIN_TEAM_FAILURE:
      return {
        loading: false,
        data: state.data,
        hasInvite: false,
      }
    case JOIN_TEAM_SUCCESS:
      return {
        loading: false,
        data: state.data,
        hasInvite: false,
      }
    default:
      return state
  }
}

export default team
