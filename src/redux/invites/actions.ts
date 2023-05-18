import * as teamService from '../../services/teams'

export const LOAD_INVITES = 'LOAD_INVITES'
export const LOAD_INVITES_FAILURE = 'LOAD_INVITES_FAILURE'
export const LOAD_INVITES_SUCCESS = 'LOAD_INVITES_SUCCESS'

export const loadInvitesAction = () => ({
  type: LOAD_INVITES,
})

export const loadInvitesFailureAction = () => ({
  type: LOAD_INVITES_FAILURE,
})

export const loadInvitesSuccessAction = (payload: any) => ({
  type: LOAD_INVITES_SUCCESS,
  payload,
})

export const loadInvites = () => {
  return (dispatch: any) => {
    dispatch(loadInvitesAction())

    teamService
      .getInvites()
      .then((data) => {
        dispatch(loadInvitesSuccessAction(data))
      })
      .catch(() => {
        dispatch(loadInvitesFailureAction())
      })
  }
}
