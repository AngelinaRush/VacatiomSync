import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import AddNewTeamPage from './AddNewTeamPage'

import styles from './HomePage.module.css'

import VacationsPage from './VacationsPage'

import Board from '../components/Board/Board'
import Header from '../components/Header/Header'

import * as actions from '../redux/teams/actions'
import { Team } from '../types'

type HomePageProps = {
  teams: Team[] | null
  loadTeams: () => void
}

const HomePage: React.FC<HomePageProps> = (props) => {
  const { teams, loadTeams } = props

  useEffect(() => {
    loadTeams()
  }, [loadTeams])

  return (
    <div>
      <Header />
      <Board teams={teams} />
      <div className={styles.pageContent}>
        <Routes>
          <Route path='/team/:teamId' element={<VacationsPage />}></Route>
          <Route path='/teams/add_team' element={<AddNewTeamPage />}></Route>
        </Routes>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({ teams: state.teams })
const mapDispatchToProps = (dispatch: any) => ({
  loadTeams: () => dispatch(actions.loadTeams()),
})

export { HomePage }

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
