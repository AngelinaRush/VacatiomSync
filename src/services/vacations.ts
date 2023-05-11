import { getAuth } from 'firebase/auth'
import { getDatabase, ref, get, set, push, remove } from 'firebase/database'
import { uniq, flatten } from 'lodash'

import { newVacation, Team } from '../types'

export const getVacations = async (teams: Team[]) => {
  const users = uniq(
    teams.reduce<string[]>((acc, team) => {
      return acc.concat(team.members)
    }, []),
  )

  const database = getDatabase()

  const vacations = await Promise.all(
    users.map(async (user) => {
      const vacationsRef = ref(database, `vacations/${user}`)
      const vacationsSnapsot = await get(vacationsRef)
      const userVacations = vacationsSnapsot.val()

      if (!userVacations) {
        return []
      }

      Object.keys(userVacations).forEach((vacationId) => {
        userVacations[vacationId].id = vacationId
        userVacations[vacationId].member = user
      })

      return Object.values(userVacations)
    }),
  )

  return flatten(vacations)
}

export const addVacation = async (newVacations: newVacation) => {
  try {
    const user = getAuth().currentUser

    if (!user) {
      throw new Error('No authenticated user')
    }

    const userId = user.uid
    const database = getDatabase()
    const vacationRef = push(ref(database, `vacations/${userId}`))
    const vacationId = vacationRef.key

    const { start, end } = newVacations

    await set(ref(database, `vacations/${userId}/${vacationId}`), {
      start,
      end,
    })
    return vacationId
  } catch (error) {
    console.error('Error addind vacation:', error)
    throw error
  }
}

export const editVacation = async (newVacations: newVacation, vacationId: string) => {
  try {
    const user = getAuth().currentUser

    if (!user) {
      throw new Error('No authenticated user')
    }

    const userId = user.uid
    const database = getDatabase()

    const { start, end } = newVacations

    await set(ref(database, `vacations/${userId}/${vacationId}`), {
      start,
      end,
    })
    return newVacations
  } catch (error) {
    console.error('Error addind vacation:', error)
    throw error
  }
}

export const removeVacation = async (vacationId: string) => {
  try {
    const user = getAuth().currentUser

    if (!user) {
      throw new Error('No authenticated user')
    }

    const userId = user.uid
    const database = getDatabase()
    const vacationRef = ref(database, `vacations/${userId}/${vacationId}`)

    await remove(vacationRef)
  } catch (error) {
    console.error('Error remove vacation:', error)
    throw error
  }
}
