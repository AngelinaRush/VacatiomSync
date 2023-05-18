import React, { useState, useEffect, Dispatch } from 'react'
import { useDispatch } from 'react-redux'
// @ts-ignore
import Timeline from 'react-timelines'

import 'react-timelines/lib/css/style.css'

import { buildTimebar } from './builders'

import { START_YEAR, NUM_OF_YEARS } from './constants'

import { useAuth } from '../../context/AuthContext'

import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css'
import 'react-calendar/dist/Calendar.css'

import { editVacation, removeVacation } from '../../redux/vacations/actions'
import { Vacation, Team, DateRangeValue, NewVacation } from '../../types'
import VacationsModal from '../VacationModal/VacationModal'

const now = new Date()
const timebar = buildTimebar()

const MIN_ZOOM = 2
const MAX_ZOOM = 20

type VacationsProps = {
  teams: Team[]
  vacations: Vacation[]
}

type TimelineElement = {
  id: string
  title: string
  start: Date
  end: Date
  uid: string
}

type Track = {
  id: number
  title: string
  elenents: TimelineElement[]
  isOpen: boolean
  tracks: Track[]
}

const Vacations: React.FC<VacationsProps> = ({ teams, vacations }) => {
  const { currentUser } = useAuth()
  const [tracksById, setTracksById] = useState<Record<number, Track>>({})
  const [modalShow, setModalShow] = useState(false)
  const [dateRange, setDateRange] = useState<DateRangeValue>([null, null])
  const dispatch: Dispatch<any> = useDispatch()
  const [clickedId, setClickedId] = useState('')

  useEffect(() => {
    const newTracksById = teams.reduce((acc, team) => {
      const teamVacations = vacations.filter((vacation: Vacation) => {
        const uids = team.members.map((member) => member.uid)
        return uids.includes(vacation.member.uid)
      })

      const track = {
        id: team.id,
        title: team.title,
        elements: teamVacations.map(({ id, member, start, end, color }) => ({
          id,
          title: `${member.displayName} в отпуске`,
          start: new Date(start),
          end: new Date(end),
          style: {
            backgroundColor: color,
            borderRadius: '4px',
            boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.5)',
          },
        })),
        isOpen: true,
        tracks: team.members?.map((member) => {
          const memberVacations = teamVacations.filter((vacation) => member.uid === vacation.member.uid)

          return {
            id: member.uid,
            title: member.displayName,
            elements:
              memberVacations?.map(({ id, start, end, member, color }) => ({
                id,
                uid: member.uid,
                title: 'Отпуск',
                start: new Date(start),
                end: new Date(end),
                style: {
                  backgroundColor: color,
                  borderRadius: '4px',
                  boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
                },
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

  const clickElement = (element: TimelineElement) => {
    if (element.uid === currentUser.uid) {
      setClickedId(element.id)
      setDateRange([element.start, element.end])
      setModalShow(true)
    }
  }

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
    <React.Fragment>
      <Timeline
        scale={{
          start,
          end,
          zoom: 20,
          zoomMin: MIN_ZOOM,
          zoomMax: MAX_ZOOM,
        }}
        timebar={timebar}
        tracks={Object.values(tracksById)}
        toggleTrackOpen={handleToggleTrackOpen}
        clickElement={clickElement}
        now={now}
        enableSticky
        scrollToNow
      />
      <VacationsModal
        dateRange={dateRange}
        onChangeDateRange={setDateRange}
        show={modalShow}
        onHide={() => {
          setModalShow(false)
        }}
        onRemove={() => {
          removeVacation(clickedId)(dispatch)
          setModalShow(false)
          setClickedId('')
        }}
        onEdit={() => {
          const [start, end] = dateRange
          const vacation: NewVacation = {
            start: +(start as Date),
            end: +(end as Date),
          }
          editVacation(vacation, clickedId)(dispatch)
          setModalShow(false)
        }}
      />
    </React.Fragment>
  )
}

export default Vacations
