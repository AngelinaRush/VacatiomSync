import { getTeams } from '../../services/teams'

export const LOAD_TEAMS = 'LOAD_TEAMS'
export const LOAD_TEAMS_FAILURE = 'LOAD_TEAMS_FAILURE'
export const LOAD_TEAMS_SUCCESS = 'LOAD_TEAMS_SUCCESS'
export const ADD_TEAM = 'ADD_TEAM'

export const loadTeamsAction = () => ({
  type: LOAD_TEAMS,
})

export const loadTeamsFailureAction = () => ({
  type: LOAD_TEAMS_FAILURE,
})

export const loadTeamsSuccessAction = (payload: any) => ({
  type: LOAD_TEAMS_SUCCESS,
  payload,
})

export const addTeamAction = (payload: any) => ({
  type: ADD_TEAM,
  payload,
})

export const loadTeams = () => {
  return (dispatch: any) => {
    dispatch(loadTeamsAction())

    getTeams()
      .then((data) => {
        dispatch(loadTeamsSuccessAction(data))
      })
      .catch(() => {
        loadTeamsFailureAction()
      })
  }
}
