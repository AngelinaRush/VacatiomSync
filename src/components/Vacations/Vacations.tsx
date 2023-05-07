import React from 'react'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
// @ts-ignore
import Timeline from 'react-timelines'

import 'react-timelines/lib/css/style.css'

import { buildTimebar } from './builders'

import { START_YEAR, NUM_OF_YEARS } from './constants'

import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css'
import 'react-calendar/dist/Calendar.css'
import styles from './Vacations.module.css'

import { addVacation } from '../../redux/vacations/actions'

import { VacationState } from '../../redux/vacations/reducer'
import { Vacation, DateRangeValue, Team } from '../../types'
import AddVacationsModal from '../AddVacationModal/AddVacationModal'

const now = new Date()
const timebar = buildTimebar()

const MIN_ZOOM = 2
const MAX_ZOOM = 20

type VacationsProps = {
  team?: Team
  vacations: VacationState
  addVacation?: (vacation: Vacation) => void
}

const Vacations: React.FC<VacationsProps> = ({ team, vacations, addVacation }) => {
  const [modalShow, setModalShow] = React.useState(false)
  const [dateRange, setDateRange] = React.useState<DateRangeValue>([null, null])

  if (!team?.members) {
    return null
  }

  const start = new Date(`${START_YEAR}`)
  const end = new Date(`${START_YEAR + NUM_OF_YEARS}`)

  const tracks = Object.values(
    team.members.reduce((acc, member, index) => {
      const memberVacations = vacations.data?.filter((vacation) => member === vacation.member)
      const track = {
        id: index,
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
      // @ts-ignore
      acc[track.id] = track
      return acc
    }, {}),
  )

  return (
    <React.Fragment>
      <div className={styles.title}>
        <h3>{team.title}</h3>
        <Button onClick={() => setModalShow(true)}>Добавить отпуск</Button>
        <AddVacationsModal
          dateRange={dateRange}
          onChangeDateRange={setDateRange}
          show={modalShow}
          onHide={() => {
            setModalShow(false)
          }}
          onSubmit={() => {
            const [start, end] = dateRange
            const newVacation: Vacation = {
              id: +new Date(),
              teamId: team.id,
              member: 'Charlie@gmail.com',
              start: +(start as Date),
              end: +(end as Date),
            }
            addVacation && addVacation(newVacation)
            setDateRange([null, null])
            setModalShow(false)
          }}
        />
      </div>
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

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch: any) => ({
  addVacation: (newVacation: any) => dispatch(addVacation(newVacation)),
})

export { Vacations }

export default connect(mapStateToProps, mapDispatchToProps)(Vacations)
