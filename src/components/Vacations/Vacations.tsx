import React from 'react'
// @ts-ignore
import Timeline from 'react-timelines'

import 'react-timelines/lib/css/style.css'

import { buildTimebar } from './builders'

import { START_YEAR, NUM_OF_YEARS } from './constants'

import { MemberVacations } from '../../types'

const now = new Date('2023-05-03')

const timebar = buildTimebar()

const MIN_ZOOM = 2
const MAX_ZOOM = 20

type VacationsProps = {
  members?: string[] | null
  vacations: MemberVacations[] | null
}

const Vacations: React.FC<VacationsProps> = ({ members, vacations }) => {
  if (!vacations) {
    return <h3>Подождите идет загрузка</h3>
  }

  if (!vacations.length) {
    return <h3>В данной команде еще не выбрали отпуска</h3>
  }

  if (!members) {
    return null
  }

  const start = new Date(`${START_YEAR}`)
  const end = new Date(`${START_YEAR + NUM_OF_YEARS}`)

  const tracks = Object.values(
    members.reduce((acc, member, index) => {
      const track = {
        id: index,
        title: member,
        elements:
          vacations[index].vacations?.map(({ id, start, end }) => ({
            id,
            title: 'Отпуск',
            start: new Date(start),
            end: new Date(end),
          })) || [],
        tracks: [],
      }
      // @ts-ignore
      acc[track.id] = track
      return acc
    }, {}),
  )

  return (
    <React.Fragment>
      <h3>Список участников с выбранными отпусками</h3>
      <Timeline
        scale={{
          start,
          end,
          zoom: 10,
          zoomMin: MIN_ZOOM,
          zoomMax: MAX_ZOOM,
        }}
        timebar={timebar}
        tracks={tracks}
        now={now}
        enableSticky
        scrollToNow
      />
    </React.Fragment>
  )
}

export default Vacations
