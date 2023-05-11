import { getAuth } from 'firebase/auth'
import { getDatabase, ref, get, set, push, remove } from 'firebase/database'

import { Team, NewTeam } from '../types'

export const getTeams = async () => {
  try {
    // Получить текущего аутентифицированного пользователя
    const user = getAuth().currentUser

    if (!user) {
      throw new Error('No authenticated user')
    }

    // Получаем ID пользователя
    const userId = user.uid

    // Запросите в базе данных команды
    const database = getDatabase()

    const userTeamsRef = ref(database, `user_teams/${userId}`)
    const userTeamSnapshot = await get(userTeamsRef)
    const teamIds = Object.keys(userTeamSnapshot.val() || {}) // получаем идентификаторы команд, членом которых является пользователь

    const teams: Team[] = []

    for (const teamId of teamIds) {
      const teamRef = ref(database, `teams/${teamId}`)
      const teamSnapshot = await get(teamRef)
      const team = teamSnapshot.val()
      if (team) {
        team.id = teamId
        team.members = Object.keys(team.members).map((email) => email.replace(',', '.'))
        teams.push(team)
      }
    }

    return teams
  } catch (error) {
    console.error('Error getting teams:', error)
    throw error
  }
}

export const addTeam = async (newTeam: NewTeam) => {
  try {
    const user = getAuth().currentUser

    if (!user) {
      throw new Error('No authenticated user')
    }

    const userId = user.uid
    const displayName = user.displayName || userId

    const database = getDatabase()

    const teamRef = push(ref(database, 'teams'))
    const teamId = teamRef.key

    const { title, invites } = newTeam

    await Promise.all([
      set(ref(database, `teams/${teamId}`), {
        title,
        invites: invites.reduce<Record<string, boolean>>((acc, email) => {
          const preparedEmail = email.replace('.', ',')
          acc[preparedEmail] = true
          return acc
        }, {}),
        members: { [displayName]: true },
        responsible: userId,
      }),
      set(ref(database, `user_teams/${userId}/${teamId}`), true),
    ])

    return teamId
  } catch (error) {
    console.error('Error addind team:', error)
    throw error
  }
}

export const removeTeam = async (teamId: string) => {
  try {
    const user = getAuth().currentUser

    if (!user) {
      throw new Error('No authenticated user')
    }

    const userId = user.uid
    const database = getDatabase()

    const teamRef = ref(database, `teams/${teamId}`)
    const teamSnapshot = await get(teamRef)
    const team = teamSnapshot.val()

    if (team.responsible !== userId) {
      throw new Error('No rights to delete the team')
    }

    await remove(teamRef)
  } catch (error) {
    console.error('Error remove team:', error)
    throw error
  }
}
