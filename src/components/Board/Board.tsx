import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Board.module.css'

import { Team } from '../../types'

import BoardItem from '../BoardItem/BoardItem'

type BoardProps = {
  teams: Team[] | null
}

const Board: React.FC<BoardProps> = ({ teams }) => {
  if (!teams) {
    return <h3>Подождите идет загрузка</h3>
  }

  return (
    <div className={styles.board}>
      <h2 className={styles.heading}>Мои команды</h2>

      {teams.map((team) => (
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
