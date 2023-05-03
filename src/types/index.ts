export type Team = {
  title: string
  id: number
  responsible?: string
  members?: string[]
}

export type Member = {
  name: string
  id: number
  role?: string
}

export type Vacation = {
  id: number
  member: string
  start: number
  end: number
}
