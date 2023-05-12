import * as vacationService from '../../services/vacations'
import { NewVacation, Team } from '../../types'

export const LOAD_VACATIONS = 'LOAD_VACATIONS'
export const LOAD_VACATIONS_FAILURE = 'LOAD_VACATIONS_FAILURE'
export const LOAD_VACATIONS_SUCCESS = 'LOAD_VACATIONS_SUCCESS'
export const ADD_VACATION = 'ADD_VACATION'
export const ADD_VACATION_SUCCESS = 'ADD_VACATION_SUCCESS'
export const ADD_VACATION_FAILURE = 'ADD_VACATION_FAILURE'
export const EDIT_VACATION_SUCCESS = 'EDIT_VACATION_SUCCESS'
export const EDIT_VACATION_FAILURE = 'EDIT_VACATION_FAILURE'
export const REMOVE_VACATION_SUCCESS = 'REMOVE_VACATION_SUCCESS'
export const REMOVE_VACATION_FAILURE = 'REMOVE_VACATION_FAILURE'

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

export const loadVacations = (teams: Team[]) => {
  return (dispatch: any) => {
    dispatch(loadVacationsAction())

    vacationService
      .getVacations(teams)
      .then((value) => {
        dispatch(loadVacationsSuccessAction(value))
      })
      .catch(() => {
        dispatch(loadVacationsFailureAction())
      })
  }
}

export const addVacationSuccessAction = (payload: any) => ({
  type: ADD_VACATION_SUCCESS,
  payload,
})

export const addVacationFailureAction = () => ({
  type: ADD_VACATION_FAILURE,
})

export const addVacation = (newVacation: NewVacation) => {
  return (dispatch: any) => {
    vacationService
      .addVacation(newVacation)
      .then(() => {
        dispatch(addVacationSuccessAction(newVacation))
      })
      .catch(() => {
        dispatch(addVacationFailureAction())
      })
  }
}

export const editVacationSuccessAction = (payload: any) => ({
  type: EDIT_VACATION_SUCCESS,
  payload,
})

export const editVacationFailureAction = () => ({
  type: EDIT_VACATION_FAILURE,
})

export const editVacation = (vacation: NewVacation, vacationId: string) => {
  return (dispatch: any) => {
    vacationService
      .editVacation(vacation, vacationId)
      .then(() => {
        dispatch(editVacationSuccessAction(vacation))
      })
      .catch(() => {
        dispatch(editVacationFailureAction())
      })
  }
}

export const removeVacationSuccessAction = (id: string) => ({
  type: REMOVE_VACATION_SUCCESS,
  id,
})

export const removeVacationFailureAction = () => ({
  type: REMOVE_VACATION_FAILURE,
})

export const removeVacation = (id: string) => {
  return (dispatch: any) => {
    vacationService
      .removeVacation(id)
      .then(() => {
        dispatch(addVacationSuccessAction(id))
      })
      .catch(() => {
        dispatch(addVacationFailureAction())
      })
  }
}
