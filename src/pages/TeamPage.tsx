import React, { Dispatch, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

import styles from './TeamPage.module.css'

import { RootState } from '../redux/rootReducer'
import { loadTeam, joinTeam } from '../redux/team/actions'

type TeamsPageProps = {}

const TeamPage: React.FC<TeamsPageProps> = () => {
  const team = useSelector((state: RootState) => state.team)
  const dispatch: Dispatch<any> = useDispatch()
  const { teamId } = useParams()
  const hasInvite = team.hasInvite

  useEffect(() => {
    teamId && loadTeam(teamId)(dispatch)
  }, [dispatch, teamId])

  useEffect(() => {
    if (!hasInvite && teamId) {
      loadTeam(teamId)(dispatch)
    }
  }, [dispatch, teamId, hasInvite])

  const handleSubmit = (evt: any) => {
    evt.preventDefault()
    teamId && joinTeam(teamId)(dispatch)
  }

  if (team.loading) {
    return <div className={styles.team}>Идет загрузка...</div>
  }

  if (!team.data) {
    return <div className={styles.team}>Команда удалена или не существует</div>
  }

  return (
    <div className={styles.team}>
      <h2 className={styles.title}>Список участников команды {team.data.title}</h2>
      {hasInvite && <Button onClick={handleSubmit}>Вступить</Button>}
      <ListGroup className='mb-3'>
        {team.data.members?.map((member) => (
          <ListGroup.Item key={member}>
            <div className={styles.listItem}>{member}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default TeamPage
