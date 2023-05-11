import React, { Dispatch, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import styles from './Board.module.css'

import { RootState } from '../../redux/rootReducer'
import * as actions from '../../redux/teams/actions'

import BoardItem from '../BoardItem/BoardItem'

type BoardProps = {}

const Board: React.FC<BoardProps> = () => {
  const teams = useSelector((state: RootState) => state.teams)
  const team = useSelector((state: RootState) => state.team)

  const dispatch: Dispatch<any> = useDispatch()

  useEffect(() => {
    dispatch(actions.loadTeams())
  }, [dispatch])

  useEffect(() => {
    if (teams.newTeamId) {
      dispatch(actions.loadTeams())
    }
  }, [dispatch, teams.newTeamId])

  useEffect(() => {
    if (!team.hasInvite) {
      dispatch(actions.loadTeams())
    }
  }, [dispatch, team.hasInvite])

  if (teams.loading) {
    return (
      <div className={styles.load}>
        <Spinner animation='border' variant='light' />
      </div>
    )
  }

  return (
    <div className={styles.board}>
      <h2 className={styles.heading}>Мои команды</h2>

      {teams.data.map((team) => (
        <NavLink className={styles.link} to={`/team/${team.id}`}>
          <BoardItem team={team} key={team.id}>
            {team.title}
          </BoardItem>
        </NavLink>
      ))}

      <NavLink className={styles.link} to='/teams/add_team'>
        <BoardItem className={styles.addTeam}>Создать команду</BoardItem>
      </NavLink>
    </div>
  )
}

export default Board
