import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import Vacations from '../components/Vacations/Vacations'
import { RootState } from '../redux/rootReducer'
import { TeamsState } from '../redux/teams/reducer'
import { loadVacations } from '../redux/vacations/actions'
import { VacationState } from '../redux/vacations/reducer'

type VacationsPageProps = {
  teams: TeamsState
  vacations: VacationState
  loadVacations: (id: number) => void
}

const VacationsPage: React.FC<VacationsPageProps> = (props) => {
  const { teams, vacations, loadVacations } = props

  const { teamId } = useParams()
  const team = teams.data?.find((item: any) => item.id === Number(teamId))

  useEffect(() => {
    loadVacations(Number(teamId))
  }, [teamId, loadVacations])
  return <Vacations team={team} vacations={vacations}></Vacations>
}

const mapStateToProps = (state: RootState) => ({ vacations: state.vacations, teams: state.teams })
const mapDispatchToProps = (dispatch: any) => ({
  loadVacations: (teamId: number) => dispatch(loadVacations(teamId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(VacationsPage)
