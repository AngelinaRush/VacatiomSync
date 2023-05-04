import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import Vacations from '../components/Vacations/Vacations'
import { loadVacations } from '../redux/vacations/actions'
import { Team, MemberVacations } from '../types'

type VacationsPageProps = {
  teams: Team[] | null
  vacations: MemberVacations[] | null
  loadVacations: (id: number) => void
}

const VacationsPage: React.FC<VacationsPageProps> = (props) => {
  const { teams, vacations, loadVacations } = props

  const { teamId } = useParams()
  const team = teams?.find((item: any) => item.id === Number(teamId))

  useEffect(() => {
    loadVacations(Number(teamId))
  }, [teamId, loadVacations])
  return <Vacations vacations={vacations} members={team?.members}></Vacations>
}

const mapStateToProps = (state: any) => ({ vacations: state.vacations, teams: state.teams })
const mapDispatchToProps = (dispatch: any) => ({
  loadVacations: (teamId: number) => dispatch(loadVacations(teamId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(VacationsPage)
