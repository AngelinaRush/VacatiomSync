import * as vacationService from '../../services/vacations'
import { Vacation } from '../../types'

export const LOAD_VACATIONS = 'LOAD_VACATIONS'
export const LOAD_VACATIONS_FAILURE = 'LOAD_VACATIONS_FAILURE'
export const LOAD_VACATIONS_SUCCESS = 'LOAD_VACATIONS_SUCCESS'
export const ADD_VACATION = 'ADD_VACATION'
export const ADD_VACATION_SUCCESS = 'ADD_VACATION_SUCCESS'
export const ADD_VACATION_FAILURE = 'ADD_VACATION_FAILURE'
export const REMOVE_VACATIONS = 'REMOVE_VACATION'
export const REMOVE_VACATIONS_SUCCESS = 'REMOVE_VACATION_SUCCESS'
export const REMOVE_VACATIONS_FAILURE = 'REMOVE_VACATION_FAILURE'

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

export const addVacationSuccessAction = (payload: any) => ({
  type: ADD_VACATION_SUCCESS,
  payload,
})

export const addVacationFailureAction = () => ({
  type: ADD_VACATION_FAILURE,
})

export const addVacation = (newVacation: Vacation) => {
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

export const loadVacations = (teamId: number) => {
  return (dispatch: any) => {
    dispatch(loadVacationsAction())

    vacationService
      .getVacations(teamId)
      .then((value) => {
        dispatch(loadVacationsSuccessAction(value))
      })
      .catch(() => {
        dispatch(loadVacationsFailureAction())
      })
  }
}
