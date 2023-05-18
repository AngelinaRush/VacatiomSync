import React, { Dispatch, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { useSelector, useDispatch } from 'react-redux'

import styles from './VacationsPage.module.css'

import AddVacationsModal from '../components/AddVacationModal/AddVacationModal'
import { nextColor } from '../components/Vacations/utils'
import Vacations from '../components/Vacations/Vacations'
import { RootState } from '../redux/rootReducer'
import { loadTeams } from '../redux/teams/actions'
import { loadVacations } from '../redux/vacations/actions'
import { addVacation } from '../redux/vacations/actions'

import { NewVacation, DateRangeValue } from '../types'

type VacationsPageProps = {}

const VacationsPage: React.FC<VacationsPageProps> = () => {
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

  const renderVacations = () => {
    if (teams.loading || vacations.loading) {
      return <Spinner animation='border' variant='light' />
    }

    if (!teams.data || !teams.data.length) {
      return <h2>Вы не состоите ни в одной команде</h2>
    }

    return <Vacations teams={teams.data} vacations={vacations.data}></Vacations>
  }

  return (
    <React.Fragment>
      <div className={styles.AddVacationButton}>
        <Button onClick={() => setModalShow(true)}>Добавить отпуск</Button>
      </div>
      <AddVacationsModal
        dateRange={dateRange}
        onChangeDateRange={(value) => {
          setDateRange(value ? value : [null, null])
        }}
        show={modalShow}
        onHide={() => {
          setModalShow(false)
        }}
        onSubmit={() => {
          const [start, end] = dateRange
          const newVacation: NewVacation = {
            start: +(start as Date),
            end: +(end as Date),
            color: `#${nextColor()}`,
          }
          addVacation(newVacation)(dispatch)
          setDateRange([null, null])
          setModalShow(false)
        }}
      />
      {renderVacations()}
    </React.Fragment>
  )
}

export default VacationsPage
