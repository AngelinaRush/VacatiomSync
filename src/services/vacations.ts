import { getAuth } from 'firebase/auth'
import { getDatabase, ref, get, set, push, remove } from 'firebase/database'
import { uniqBy, flatten } from 'lodash'

import { NewVacation, Team, Member } from '../types'

export const getVacations = async (teams: Team[]) => {
  const members = uniqBy(
    teams.reduce<Member[]>((acc, team) => {
      return acc.concat(team.members)
    }, []),
    (member) => member.uid,
  )

  const database = getDatabase()

  const vacations = await Promise.all(
    members.map(async (member) => {
      const vacationsRef = ref(database, `vacations/${member.uid}`)
      const vacationsSnapsot = await get(vacationsRef)
      const userVacations = vacationsSnapsot.val()

      if (!userVacations) {
        return []
      }

      Object.keys(userVacations).forEach((vacationId) => {
        userVacations[vacationId].id = vacationId
        userVacations[vacationId].member = member
      })

      return Object.values(userVacations)
    }),
  )

  return flatten(vacations)
}

export const addVacation = async (newVacations: NewVacation) => {
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

export const editVacation = async (newVacation: NewVacation, vacationId: string) => {
  try {
    const user = getAuth().currentUser

    if (!user) {
      throw new Error('No authenticated user')
    }

    const userId = user.uid
    const database = getDatabase()

    const { start, end } = newVacation

    await set(ref(database, `vacations/${userId}/${vacationId}`), {
      start,
      end,
    })
  } catch (error) {
    console.error('Error edited vacation:', error)
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
