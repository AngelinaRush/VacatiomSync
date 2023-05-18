import cn from 'classnames'
import React, { Dispatch } from 'react'
import { CloseButton } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './BoardItem.module.css'

import { useAuth } from '../../context/AuthContext'
import { removeTeam } from '../../redux/teams/actions'
import { Team } from '../../types'

type BoardItemProps = {
  children: React.ReactNode
  className?: string
  team?: Team
}

const BoardItem: React.FC<BoardItemProps> = ({ children, className = '', team }) => {
  const dispatch: Dispatch<any> = useDispatch()
  const { currentUser } = useAuth()
  const isResponsible = team && currentUser.uid === team?.responsible
  const navigate = useNavigate()

  return (
    <div className={cn(styles.item, className)}>
      <div className={styles.title}>{children}</div>
      {isResponsible && (
        <div className={styles.controls}>
          <button
            type='button'
            className={cn(styles.editButton, styles.button)}
            onClick={(evt: any) => {
              evt.preventDefault()
              evt.stopPropagation()
              navigate(`/teams/edit_team/${team.id}`)
            }}
          />
          <CloseButton
            variant='white'
            onClick={(evt: any) => {
              evt.preventDefault()
              evt.stopPropagation()
              removeTeam(team.id)(dispatch)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default BoardItem
