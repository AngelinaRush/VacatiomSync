import { getAuth } from 'firebase/auth'
import { getDatabase, ref, get, set, push, remove } from 'firebase/database'

import { Team, NewTeam, EditedTeam } from '../types'

export const getTeams = async () => {
  try {
    // Получить текущего аутентифицированного пользователя
    const user = getAuth().currentUser

    if (!user) {
      throw new Error('Пользователь не аутентифицирован')
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
        team.members = Object.keys(team.members || {}).map((uid) => ({
          uid,
          displayName: team.members[uid].displayName,
        }))
        teams.push(team)
      }
    }

    return teams
  } catch (error) {
    console.error('Ошибка при получении команд:', error)
    throw error
  }
}

export const addTeam = async (newTeam: NewTeam) => {
  try {
    const user = getAuth().currentUser

    if (!user) {
      throw new Error('Пользователь не аутентифицирован')
    }

    const userId = user.uid
    const displayName = user.displayName || userId

    const database = getDatabase()

    const teamRef = push(ref(database, 'teams'))
    const teamId = teamRef.key

    const { title, invites } = newTeam

    const emailInvites = invites.reduce<Record<string, boolean>>((acc, email) => {
      const preparedEmail = email.replace('.', ',')
      acc[preparedEmail] = true
      return acc
    }, {})

    await Promise.all([
      set(ref(database, `teams/${teamId}`), {
        title,
        invites: emailInvites,
        members: { [userId]: { displayName } },
        responsible: userId,
      }),
      ...Object.keys(emailInvites).map((email: string) => {
        const userInvitesRef = ref(database, `user_invites/${email}/${teamId}`)
        return set(userInvitesRef, true)
      }),
      set(ref(database, `user_teams/${userId}/${teamId}`), true),
    ])

    return teamId
  } catch (error) {
    console.error('Ошибка при добавлении команды:', error)
    throw error
  }
}

export const editTeam = async (editedTeam: EditedTeam) => {
  try {
    const user = getAuth().currentUser

    if (!user) {
      throw new Error('Пользователь не аутентифицирован')
    }

    const database = getDatabase()

    const { title, invites, members, id: teamId } = editedTeam

    const invitesTeamRef = ref(database, `teams/${editedTeam.id}/invites`)
    const invitesTeamSnapshot = await get(invitesTeamRef)
    const prevInvites = invitesTeamSnapshot.val()
    const prevInviteUids = Object.keys(prevInvites || {})

    const inviteUids = invites.map((invite) => invite)

    const removedInvites = prevInviteUids.filter((email: string) => !inviteUids.includes(email))

    const membersTeamRef = ref(database, `teams/${editedTeam.id}/members`)
    const membersTeamSnapshot = await get(membersTeamRef)
    const prevMembers = membersTeamSnapshot.val()
    const prevMemberUids = Object.keys(prevMembers || {})

    const memberUids = members.map((member) => member.uid)

    const removedMembers = prevMemberUids.filter((uid: string) => !memberUids.includes(uid))

    const emailInvites = invites.reduce<Record<string, boolean>>((acc, email) => {
      const preparedEmail = email.replace('.', ',')
      acc[preparedEmail] = true
      return acc
    }, {})

    await Promise.all([
      ...removedInvites.map((email: string) => {
        const userTeamsRef = ref(database, `user_invites/${email}/${editedTeam.id}`)
        return remove(userTeamsRef)
      }),
      ...removedMembers.map((uid: string) => {
        const userTeamsRef = ref(database, `user_teams/${uid}/${editedTeam.id}`)
        return remove(userTeamsRef)
      }),
      set(ref(database, `teams/${teamId}/title`), title),
      set(ref(database, `teams/${teamId}/invites`), emailInvites),
      ...Object.keys(emailInvites).map((email: string) => {
        const userInvitesRef = ref(database, `user_invites/${email}/${teamId}`)
        return set(userInvitesRef, true)
      }),
      set(
        ref(database, `teams/${teamId}/members`),
        members.reduce<Record<string, { displayName: string }>>((acc, member) => {
          acc[member.uid] = { displayName: member.displayName }
          return acc
        }, {}),
      ),
    ])
  } catch (error) {
    console.error('Ошибка при редактировании команды:', error)
    throw error
  }
}

export const removeTeam = async (teamId: string) => {
  try {
    const user = getAuth().currentUser

    if (!user) {
      throw new Error('Пользователь не аутентифицирован')
    }

    const userId = user.uid
    const database = getDatabase()

    const teamRef = ref(database, `teams/${teamId}`)
    const teamSnapshot = await get(teamRef)
    const team = teamSnapshot.val()

    if (team.responsible !== userId) {
      throw new Error('Нет прав на удаление команды')
    }

    await remove(teamRef)
  } catch (error) {
    console.error('Ошибка при удалении команды:', error)
    throw error
  }
}

export const getInvites = async () => {
  try {
    const user = getAuth().currentUser
    if (!user) {
      throw new Error('Пользователь не аутентифицирован')
    }

    const email = user.email?.replace('.', ',')

    const database = getDatabase()

    const userInvitesRef = ref(database, `user_invites/${email}`)
    const userInvitesSnapshot = await get(userInvitesRef)
    const teamIds = Object.keys(userInvitesSnapshot.val() || {}) // получаем идентификаторы команд, в которые у пользователя есть приглашение

    const teams: Team[] = []

    for (const teamId of teamIds) {
      const teamRef = ref(database, `teams/${teamId}`)
      const teamSnapshot = await get(teamRef)
      const team = teamSnapshot.val()
      if (team) {
        team.id = teamId
        teams.push(team)
      }
    }

    return teams
  } catch (error) {
    console.error('Ошибка при загрузки приглашений:', error)
    throw error
  }
}
