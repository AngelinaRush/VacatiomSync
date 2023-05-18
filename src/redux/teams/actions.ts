import * as teamService from '../../services/teams'
import { NewTeam } from '../../types'

export const LOAD_TEAMS = 'LOAD_TEAMS'
export const LOAD_TEAMS_FAILURE = 'LOAD_TEAMS_FAILURE'
export const LOAD_TEAMS_SUCCESS = 'LOAD_TEAMS_SUCCESS'
export const ADD_TEAM = 'ADD_TEAM'
export const ADD_TEAM_SUCCESS = 'ADD_TEAM_SUCCESS'
export const ADD_TEAM_FAILURE = 'ADD_TEAM_FAILURE'
export const REMOVE_TEAM = 'REMOVE_TEAM'
export const REMOVE_TEAM_SUCCESS = 'REMOVE_TEAM_SUCCESS'
export const REMOVE_TEAM_FAILURE = 'REMOVE_TEAM_FAILURE'

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

export const addTeamSuccessAction = (payload: string) => ({
  type: ADD_TEAM_SUCCESS,
  payload,
})

export const addTeamFailureAction = () => ({
  type: ADD_TEAM_FAILURE,
})

export const removeTeamSuccessAction = (id: string) => ({
  type: REMOVE_TEAM_SUCCESS,
  id,
})

export const removeTeamFailureAction = () => ({
  type: REMOVE_TEAM_FAILURE,
})

export const removeTeam = (id: string) => {
  return (dispatch: any) => {
    teamService
      .removeTeam(id)
      .then(() => {
        dispatch(removeTeamSuccessAction(id))
      })
      .catch(() => {
        dispatch(removeTeamFailureAction())
      })
  }
}

export const addTeam = (newTeam: NewTeam) => {
  return (dispatch: any) => {
    teamService
      .addTeam(newTeam)
      .then((teamId) => {
        dispatch(addTeamSuccessAction(teamId as string))
      })
      .catch(() => {
        dispatch(addTeamFailureAction())
      })
  }
}

export const loadTeams = () => {
  return (dispatch: any) => {
    dispatch(loadTeamsAction())

    teamService
      .getTeams()
      .then((data) => {
        dispatch(loadTeamsSuccessAction(data))
      })
      .catch(() => {
        dispatch(loadTeamsFailureAction())
      })
  }
}
