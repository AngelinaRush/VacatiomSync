import React, { useState, useEffect } from 'react'
// @ts-ignore
import Timeline from 'react-timelines'

import 'react-timelines/lib/css/style.css'

import { buildTimebar } from './builders'

import { START_YEAR, NUM_OF_YEARS } from './constants'

import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css'
import 'react-calendar/dist/Calendar.css'

import { Vacation, Team } from '../../types'

const now = new Date()
const timebar = buildTimebar()

const MIN_ZOOM = 2
const MAX_ZOOM = 20

type VacationsProps = {
  teams: Team[]
  vacations: Vacation[]
}

type TimelineElement = {
  id: number
  title: string
  start: Date
  end: Date
}

type Track = {
  id: number
  title: string
  elenents: TimelineElement[]
  isOpen: boolean
  tracks: Track[]
}

const Vacations: React.FC<VacationsProps> = ({ teams, vacations }) => {
  const [tracksById, setTracksById] = useState<Record<number, Track>>({})

  useEffect(() => {
    const newTracksById = teams.reduce((acc, team) => {
      const teamVacations = vacations.filter((vacation: Vacation) => team.members?.includes(vacation.member))

      const track = {
        id: team.id,
        title: team.title,
        elements: teamVacations.map(({ id, member, start, end }) => ({
          id,
          title: `Отпуск для ${member}`,
          start: new Date(start),
          end: new Date(end),
        })),
        isOpen: true,
        tracks: team.members?.map((member) => {
          const memberVacations = teamVacations.filter((vacation) => member === vacation.member)

          return {
            id: member,
            title: member,
            elements:
              memberVacations?.map(({ id, start, end }) => ({
                id,
                title: 'Отпуск',
                start: new Date(start),
                end: new Date(end),
              })) || [],
            tracks: [],
          }
        }),
      }
      // @ts-ignore
      acc[track.id] = track
      return acc
    }, {})

    setTracksById(newTracksById)
  }, [teams, vacations])

  const start = new Date(`${START_YEAR}`)
  const end = new Date(`${START_YEAR + NUM_OF_YEARS}`)

  const handleToggleTrackOpen = (track: Track) => {
    setTracksById({
      ...tracksById,
      [track.id]: {
        ...track,
        isOpen: !track.isOpen,
      },
    })
  }

  return (
    <Timeline
      scale={{
        start,
        end,
        zoom: 10,
        zoomMin: MIN_ZOOM,
        zoomMax: MAX_ZOOM,
      }}
      timebar={timebar}
      tracks={Object.values(tracksById)}
      toggleTrackOpen={handleToggleTrackOpen}
      now={now}
      enableSticky
      scrollToNow
    />
  )
}

export default Vacations
