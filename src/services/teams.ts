import teams from '../mocks/teamsMock.json'
import vacations from '../mocks/vacationsMock'
import { Team, Vacation } from '../types'

const promiseResponse = (data: Team[] | Vacation[]) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 500)
  })

export const getTeams = () => promiseResponse(teams)

export const getVacations = (teamId: number) => {
  const teamVacations = (vacations as Record<number, Vacation[]>)[teamId] || []
  return promiseResponse(teamVacations)
}
