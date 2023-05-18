/* eslint-disable no-bitwise */

import { MONTHS_PER_YEAR } from './constants'

const COLORS = ['FF005D', '0085B6', '0BB4C1', '00D49D', 'FE2903', '233D4D', 'C32DFE', '5B6E48', '376356']

let color = -1
export const nextColor = () => {
  color = (color + 1) % COLORS.length
  return COLORS[color]
}

export const addMonthsToYear = (year, monthsToAdd) => {
  let y = year
  let m = monthsToAdd
  while (m >= MONTHS_PER_YEAR) {
    m -= MONTHS_PER_YEAR
    y += 1
  }
  return { year: y, month: m + 1 }
}

export const addMonthsToYearAsDate = (year, monthsToAdd) => {
  const r = addMonthsToYear(year, monthsToAdd)
  return new Date(`${r.year}-${r.month}`)
}
