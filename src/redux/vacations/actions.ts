import { getVacations } from '../../services/teams'

export const LOAD_VACATIONS = 'LOAD_VACATIONS'
export const LOAD_VACATIONS_FAILURE = 'LOAD_VACATIONS_FAILURE'
export const LOAD_VACATIONS_SUCCESS = 'LOAD_VACATIONS_SUCCESS'

export const loadVacationsAction = () => ({
  type: LOAD_VACATIONS,
})

export const loadVacationsFailureAction = () => ({
  type: LOAD_VACATIONS_FAILURE,
})

export const loadVacationsSuccessAction = (payload: any) => ({
  type: LOAD_VACATIONS_SUCCESS,
  payload,
})

export const loadVacations = (teamId: number) => {
  return (dispatch: any) => {
    dispatch(loadVacationsAction())

    getVacations(teamId)
      .then((value) => {
        dispatch(loadVacationsSuccessAction(value))
      })
      .catch(() => {
        loadVacationsFailureAction()
      })
  }
}
