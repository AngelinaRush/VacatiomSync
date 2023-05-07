import React, { Dispatch, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import styles from './Board.module.css'

import { RootState } from '../../redux/rootReducer'
import * as actions from '../../redux/teams/actions'

import BoardItem from '../BoardItem/BoardItem'

type BoardProps = {}

const Board: React.FC<BoardProps> = () => {
  const teams = useSelector((state: RootState) => state.teams)
  const dispatch: Dispatch<any> = useDispatch()
  useEffect(() => {
    dispatch(actions.loadTeams())
  }, [dispatch])

  if (teams.loading) {
    return <h3>Подождите идет загрузка</h3>
  }

  return (
    <div className={styles.board}>
      <h2 className={styles.heading}>Мои команды</h2>

      {teams.data.map((team) => (
        <NavLink className={styles.link} to={`/team/${team.id}`}>
          <BoardItem id={team.id} key={team.id}>
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
