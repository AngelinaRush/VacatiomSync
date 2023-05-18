import { LOAD_INVITES, LOAD_INVITES_FAILURE, LOAD_INVITES_SUCCESS } from './actions'

import { Team } from '../../types'

export type InvitesState = {
  data: Team[]
  loading: boolean
  error: string
}

const defaultState = {
  loading: false,
  data: [],
  error: '',
}

const invites = (state: InvitesState = defaultState, action: any) => {
  switch (action.type) {
    case LOAD_INVITES:
      return {
        loading: true,
        data: [],
        error: '',
      }
    case LOAD_INVITES_FAILURE:
      return {
        loading: false,
        data: [],
        error: '',
      }
    case LOAD_INVITES_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: '',
      }
    default:
      return state
  }
}

export default invites
