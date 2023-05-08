import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

import styles from './TeamPage.module.css'

import { RootState } from '../redux/rootReducer'

type TeamsPageProps = {}

const TeamPage: React.FC<TeamsPageProps> = () => {
  const { teamId } = useParams()
  const teams = useSelector((state: RootState) => state.teams)
  const team = teams.data?.find((item: any) => item.id === Number(teamId)) //по teamId из параметров урла
  return (
    <div className={styles.team}>
      <h2 className={styles.title}>Список участников команды {team?.title}</h2>
      <ListGroup className='mb-3'>
        {team?.members.map((member) => (
          <ListGroup.Item key={member}>
            <div className={styles.listItem}>{member}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default TeamPage
