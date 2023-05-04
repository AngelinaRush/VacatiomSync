import { LOAD_VACATIONS, LOAD_VACATIONS_FAILURE, LOAD_VACATIONS_SUCCESS } from './actions'

import { MemberVacations } from '../../types'

type VacationState = MemberVacations[]

const vacations = (state: VacationState = [], actions: any) => {
  switch (actions.type) {
    case LOAD_VACATIONS:
      return null
    case LOAD_VACATIONS_FAILURE:
      return null
    case LOAD_VACATIONS_SUCCESS:
      return actions.payload
    default:
      return state
  }
}
export default vacations
