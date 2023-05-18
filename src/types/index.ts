export type Member = {
  uid: string
  displayName: string
}

export type Team = {
  title: string
  id: string
  responsible: string
  members: Member[]
  invites: string[]
}

export type NewTeam = {
  title: string
  invites: string[]
}

export type EditedTeam = {
  title: string
  id: string
  invites: string[]
  members: Member[]
}

export type Vacation = { id: number; member: Member; start: number; end: number; color: string }

export type NewVacation = { start: number; end: number; color?: string }

export type DateRangeValue = [Date | null, Date | null]
