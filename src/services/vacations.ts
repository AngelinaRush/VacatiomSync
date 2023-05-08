import vacations from '../mocks/vacationsMock'
import { Vacation, Team } from '../types'

const promiseResponse = (data: Vacation[] | object) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 500)
  })

export const getVacations = (teams: Team[]) => {
  const allVacations = teams.reduce<Vacation[]>((acc, team) => {
    const filterVacation = vacations.filter((vacation) => team.members.includes(vacation.member))
    return acc.concat(filterVacation)
  }, [])

  return promiseResponse(allVacations)
}

export const addVacation = (_newVacations: Vacation) => {
  return promiseResponse({})
}

export const removeVacation = (_id: number) => promiseResponse({})
