export type Team = {
  title: string
  id: number
  responsible?: string
  members?: string[]
}

export type Vacation = { id: number; teamId: number; member: string; start: number; end: number }

export type DateRangeValue = [Date | null, Date | null]
