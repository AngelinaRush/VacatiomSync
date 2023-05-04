export type Team = {
  title: string
  id: number
  responsible?: string
  members?: string[]
}

export type MemberVacations = {
  member: string
  vacations: [{ id: number; start: number; end: number }]
}
