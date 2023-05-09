export type Team = {
  title: string
  id: string
  responsible: string
  members: string[]
  invites: string[]
}

export type NewTeam = {
  title: string
  invites: string[]
}

export type Vacation = { id: number; member: string; start: number; end: number }

export type DateRangeValue = [Date | null, Date | null]
