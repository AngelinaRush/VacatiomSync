import teams from '../mocks/teamsMock.json'
import { Team } from '../types'

const promiseResponse = (data: Team[] | object) =>
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
