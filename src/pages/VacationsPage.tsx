import React, { Dispatch, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'

import styles from './VacationsPage.module.css'

import AddVacationsModal from '../components/AddVacationModal/AddVacationModal'
import Vacations from '../components/Vacations/Vacations'
import { RootState } from '../redux/rootReducer'
import { loadTeams } from '../redux/teams/actions'
import { loadVacations } from '../redux/vacations/actions'
import { addVacation } from '../redux/vacations/actions'

import { newVacation, DateRangeValue } from '../types'

type TeamsPageProps = {}

const TeamsPage: React.FC<TeamsPageProps> = () => {
  const { newVacationId } = useSelector((state: RootState) => state.vacations)
  const { editedVacationId } = useSelector((state: RootState) => state.vacations)

  const teams = useSelector((state: RootState) => state.teams)
  const vacations = useSelector((state: RootState) => state.vacations)
  const dispatch: Dispatch<any> = useDispatch()

  useEffect(() => {
    loadTeams()(dispatch)
  }, [dispatch])

  useEffect(() => {
    loadVacations(teams.data)(dispatch)
  }, [dispatch, teams.data, newVacationId, editedVacationId])

  const [modalShow, setModalShow] = React.useState(false)
  const [dateRange, setDateRange] = React.useState<DateRangeValue>([null, null])

  return (
    <React.Fragment>
      <div className={styles.AddVacationButton}>
        <Button onClick={() => setModalShow(true)}>Добавить отпуск</Button>
      </div>
      <AddVacationsModal
        dateRange={dateRange}
        onChangeDateRange={setDateRange}
        show={modalShow}
        onHide={() => {
          setModalShow(false)
        }}
        onSubmit={() => {
          const [start, end] = dateRange
          const newVacation: newVacation = {
            start: +(start as Date),
            end: +(end as Date),
          }
          addVacation(newVacation)(dispatch)
          setDateRange([null, null])
          setModalShow(false)
        }}
      />
      <Vacations teams={teams.data} vacations={vacations.data}></Vacations>
      {/* {teams.data.map((team) => {
        const teamVacations = vacations.data.filter((vacation: Vacation) => team.members.includes(vacation.member))
        return <Vacations team={team} vacations={teamVacations}></Vacations>
      })} */}
    </React.Fragment>
  )
}

export default TeamsPage
