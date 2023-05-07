import vacations from '../mocks/vacationsMock'
import { Vacation } from '../types'

const promiseResponse = (data: Vacation[] | object) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 500)
  })

export const getVacations = (teamId: number) => {
  const teamVacations = (vacations as Vacation[]).filter((vacation) => vacation.teamId === teamId)
  return promiseResponse(teamVacations)
}

export const addVacation = (_newVacations: Vacation) => {
  return promiseResponse({})
}

export const removeVacation = (_id: number) => promiseResponse({})
