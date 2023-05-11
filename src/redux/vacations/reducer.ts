import {
  LOAD_VACATIONS,
  LOAD_VACATIONS_FAILURE,
  LOAD_VACATIONS_SUCCESS,
  ADD_VACATION,
  ADD_VACATION_FAILURE,
  ADD_VACATION_SUCCESS,
  EDIT_VACATION_FAILURE,
  EDIT_VACATION_SUCCESS,
  REMOVE_VACATION_FAILURE,
  REMOVE_VACATION_SUCCESS,
} from './actions'

import { Vacation } from '../../types'

export type VacationState = {
  data: Vacation[]
  loading: boolean
  error: string
  newVacationId?: string
  editedVacationId?: string
}

const defaultState = {
  loading: false,
  data: [],
  error: '',
}

const vacations = (state: VacationState = defaultState, action: any) => {
  switch (action.type) {
    case LOAD_VACATIONS:
      return {
        loading: true,
        data: [],
        error: '',
      }
    case LOAD_VACATIONS_FAILURE:
      return {
        loading: false,
        data: [],
        error: '',
      }
    case LOAD_VACATIONS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: '',
      }
    case ADD_VACATION:
    case ADD_VACATION_FAILURE:
      return state
    case ADD_VACATION_SUCCESS:
      return { ...state, newVacationId: action.payload }
    case EDIT_VACATION_FAILURE:
      return state
    case EDIT_VACATION_SUCCESS:
      return { ...state, editedVacationId: action.payload }
    case REMOVE_VACATION_FAILURE:
      return state
    case REMOVE_VACATION_SUCCESS: {
      const newState = state.data.reduce<Vacation[]>((acc, vacation) => {
        if (!(vacation.id === action.id)) {
          acc.push(vacation)
        }
        return acc
      }, [])

      return { ...state, data: newState }
    }
    default:
      return state
  }
}
export default vacations
