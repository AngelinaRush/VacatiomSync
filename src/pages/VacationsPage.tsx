import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import Vacations from '../components/Vacations/Vacations'
import { loadVacations } from '../redux/vacations/actions'
import { Vacation } from '../types'

type VacationsPageProps = {
  vacations: Vacation[] | null
  loadVacations: (id: number) => void
}

const VacationsPage: React.FC<VacationsPageProps> = (props) => {
  const { vacations, loadVacations } = props

  const { teamId } = useParams()

  useEffect(() => {
    loadVacations(Number(teamId))
  }, [teamId, loadVacations])
  return <Vacations vacations={vacations}></Vacations>
}

const mapStateToProps = (state: any) => ({ vacations: state.vacations })
const mapDispatchToProps = (dispatch: any) => ({
  loadVacations: (teamId: number) => dispatch(loadVacations(teamId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(VacationsPage)
