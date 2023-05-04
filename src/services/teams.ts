import teams from '../mocks/teamsMock.json'
import vacations from '../mocks/vacationsMock'
import { Team, MemberVacations } from '../types'

const promiseResponse = (data: Team[] | MemberVacations[] | object) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 500)
  })

export const getTeams = () => promiseResponse(teams)

export const addTeam = (_newTeam: Team) => {
  return promiseResponse({})
}

export const removeTeam = (_id: number) => promiseResponse({})

export const getVacations = (teamId: number) => {
  const teamVacations = (vacations as unknown as Record<number, MemberVacations[]>)[teamId] || []
  return promiseResponse(teamVacations)
}
