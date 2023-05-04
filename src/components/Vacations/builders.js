import {
  START_YEAR,
  NUM_OF_YEARS,
  MONTH_NAMES,
  MONTHS_PER_YEAR,
  QUARTERS_PER_YEAR,
  MONTHS_PER_QUARTER,
} from './constants'

import { addMonthsToYear, addMonthsToYearAsDate } from './utils'

export const buildQuarterCells = () => {
  const v = []
  for (let i = 0; i < QUARTERS_PER_YEAR * NUM_OF_YEARS; i += 1) {
    const quarter = (i % 4) + 1
    const startMonth = i * MONTHS_PER_QUARTER
    const s = addMonthsToYear(START_YEAR, startMonth)
    const e = addMonthsToYear(START_YEAR, startMonth + MONTHS_PER_QUARTER)
    v.push({
      id: `${s.year}-q${quarter}`,
      title: `Q${quarter} ${s.year}`,
      start: new Date(`${s.year}-${s.month}-01`),
      end: new Date(`${e.year}-${e.month}-01`),
    })
  }
  return v
}

export const buildMonthCells = () => {
  const v = []
  for (let i = 0; i < MONTHS_PER_YEAR * NUM_OF_YEARS; i += 1) {
    const startMonth = i
    const start = addMonthsToYearAsDate(START_YEAR, startMonth)
    const end = addMonthsToYearAsDate(START_YEAR, startMonth + 1)
    v.push({
      id: `m${startMonth}`,
      title: MONTH_NAMES[i % 12],
      start,
      end,
    })
  }
  return v
}

export const buildTimebar = () => [
  {
    id: 'quarters',
    title: 'Quarters',
    cells: buildQuarterCells(),
    style: {},
  },
  {
    id: 'months',
    title: 'Months',
    cells: buildMonthCells(),
    useAsGrid: true,
    style: {},
  },
]
