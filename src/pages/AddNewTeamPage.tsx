import React from 'react'
import { connect } from 'react-redux'

import NewTeamForm from '../components/NewTeamForm/NewTeamForm'
import * as actions from '../redux/teams/actions'
import { Team } from '../types'

type AddNewTeamPageProps = {
  addTeam: (newTeam: Team) => void
}
const AddNewTeamPage: React.FC<AddNewTeamPageProps> = (props) => {
  const { addTeam } = props

  const handleSubmit = (newTeam: Team) => addTeam(newTeam)

  return <NewTeamForm handleSubmit={handleSubmit} />
}
const mapStateToProps = (state: any) => ({ teams: state.teams })
const mapDispatchToProps = (dispatch: any) => ({
  addTeam: (newTeam: any) => dispatch(actions.addTeam(newTeam)),
})

export { AddNewTeamPage }

export default connect(mapStateToProps, mapDispatchToProps)(AddNewTeamPage)
