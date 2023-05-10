import * as teamService from '../../services/team'

export const LOAD_TEAM = 'LOAD_TEAM'
export const LOAD_TEAM_FAILURE = 'LOAD_TEAM_FAILURE'
export const LOAD_TEAM_SUCCESS = 'LOAD_TEAM_SUCCESS'
export const JOIN_TEAM = 'JOIN_TEAM'
export const JOIN_TEAM_FAILURE = 'JOIN_TEAM_FAILURE'
export const JOIN_TEAM_SUCCESS = 'JOIN_TEAM_SUCCESS'

export const loadTeamAction = () => ({
  type: LOAD_TEAM,
})

export const loadTeamFailureAction = () => ({
  type: LOAD_TEAM_FAILURE,
})

export const loadTeamSuccessAction = (payload: any) => ({
  type: LOAD_TEAM_SUCCESS,
  payload,
})

export const loadTeam = (teamId: string) => {
  return (dispatch: any) => {
    dispatch(loadTeamAction())

    teamService
      .getTeam(teamId)
      .then((data) => {
        dispatch(loadTeamSuccessAction(data))
      })
      .catch(() => {
        dispatch(loadTeamFailureAction())
      })
  }
}

export const joinTeamAction = () => ({
  type: JOIN_TEAM,
})

export const joinTeamFailureAction = () => ({
  type: JOIN_TEAM_FAILURE,
})

export const joinTeamSuccessAction = (payload: any) => ({
  type: JOIN_TEAM_SUCCESS,
  payload,
})

export const joinTeam = (teamId: string) => {
  return (dispatch: any) => {
    dispatch(joinTeamAction())

    teamService
      .joinTeam(teamId)
      .then((data) => {
        dispatch(joinTeamSuccessAction(data))
      })
      .catch(() => {
        dispatch(joinTeamFailureAction())
      })
  }
}
