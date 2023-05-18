import { getAuth } from 'firebase/auth'
import { getDatabase, ref, get, set, remove } from 'firebase/database'

export const getTeam = async (teamId: string) => {
  try {
    const database = getDatabase()
    const teamRef = ref(database, `teams/${teamId}`)
    const teamSnapshot = await get(teamRef)
    const team = teamSnapshot.val()

    if (team) {
      team.id = teamId
      team.members = Object.keys(team.members || {}).map((uid) => ({ uid, displayName: team.members[uid].displayName }))
      team.invites = Object.keys(team.invites || {}).map((email) => email.replace(',', '.'))
    }

    return team
  } catch (error) {
    console.error('Error getting team:', error)
    throw error
  }
}

export const joinTeam = async (teamId: string) => {
  try {
    const user = getAuth().currentUser

    if (!user) {
      throw new Error('Пользователь не аутентифицирован')
    }

    const userId = user.uid
    const email = user.email?.replace('.', ',')
    const displayName = user.displayName || userId
    const database = getDatabase()

    await Promise.all([
      set(ref(database, `teams/${teamId}/members/${userId}`), { displayName }),
      remove(ref(database, `teams/${teamId}/invites/${email}`)),
      remove(ref(database, `user_invites/${email}/${teamId}`)),
      set(ref(database, `user_teams/${userId}/${teamId}`), true),
    ])
  } catch (error) {
    console.error('Error joining team:', error)
    throw error
  }
}
