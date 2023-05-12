import React, { Dispatch, useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import styles from './EditTeamPage.module.css'

import { RootState } from '../redux/rootReducer'
import { loadTeam } from '../redux/team/actions'
import { editTeam } from '../services/teams'
import { Member } from '../types'
import { fieldIsEmpty, validateEmail } from '../utils/validators'

type EditPageProps = {}

const EditTeamPage: React.FC<EditPageProps> = () => {
  const team = useSelector((state: RootState) => state.team)
  const { teamId } = useParams()
  const [validated, setValidated] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [invites, setInvites] = useState<string[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const dispatch: Dispatch<any> = useDispatch()

  useEffect(() => {
    teamId && loadTeam(teamId)(dispatch)
  }, [dispatch, teamId])

  useEffect(() => {
    if (team.data) {
      setTitle(team.data?.title)
      setInvites(team.data?.invites)
      setMembers(team.data?.members)
    }
  }, [dispatch, team.data])

  const navigate = useNavigate()

  const handleSubmit = (evt: any) => {
    evt.preventDefault()

    if (fieldIsEmpty(title) || fieldIsEmpty(invites)) {
      setValidated(true)
      return
    }

    const editedTeam = {
      title: title,
      invites,
      members,
      id: teamId || '',
    }

    editTeam(editedTeam)
      .then(() => {
        navigate(`/team/${teamId}`)
      })
      .catch((error) => {
        console.error('Произошла ошибка при обновлении команды', error)
      })
    setValidated(false)
  }

  const handleTitleChange = (evt: any) => {
    setTitle(evt.target.value)
  }

  const handleEmailChange = (evt: any) => {
    setEmail(evt.target.value)
  }

  const handleAddInvite = () => {
    if (!validateEmail(email)) {
      setValidated(true)
      return
    }

    setEmail('')
    setInvites([...invites, email])
    setValidated(false)
  }

  const renderTeamNameInput = () => (
    <InputGroup className='mb-3'>
      <InputGroup.Text id='title'>Название команды</InputGroup.Text>
      <Form.Control
        required
        type='text'
        placeholder='Название команды'
        value={title}
        onChange={handleTitleChange}
        aria-label='title'
        aria-describedby='title'
      />
      <Form.Control.Feedback type='invalid'>Введите название команды</Form.Control.Feedback>
    </InputGroup>
  )

  const renderEmailInput = () => (
    <InputGroup className='mb-3'>
      <InputGroup.Text id='email'>E-mail</InputGroup.Text>
      <Form.Control
        required
        type='email'
        placeholder='Электронная почта'
        value={email}
        onChange={handleEmailChange}
        aria-label='email'
        aria-describedby='email'
      />
      <Form.Control.Feedback type='invalid'>Адрес электронной почты должен содержать символ '@'</Form.Control.Feedback>
      <Button type='button' onClick={handleAddInvite}>
        Добавить приглашение
      </Button>
    </InputGroup>
  )

  const renderInvitesList = () => (
    <React.Fragment>
      <h3>Приглашённые</h3>
      <ListGroup className='mb-3'>
        {invites.map((invite, index) => (
          <ListGroup.Item key={invite}>
            <div className={styles.listItem}>
              {invite}
              <CloseButton
                onClick={() => {
                  const newInvites = [...invites]
                  newInvites.splice(index, 1)
                  setInvites(newInvites)
                }}
              />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </React.Fragment>
  )

  const renderMembersList = () => (
    <React.Fragment>
      <h3>Участники</h3>
      <ListGroup className='mb-3'>
        {members.map((member, index) => (
          <ListGroup.Item key={member.uid}>
            <div className={styles.listItem}>
              {member.displayName}
              <CloseButton
                onClick={() => {
                  const newMembers = [...members]
                  newMembers.splice(index, 1)
                  setMembers(newMembers)
                }}
              />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </React.Fragment>
  )

  return (
    <Form className={styles.form} noValidate validated={validated} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Редактирование команды</h2>
      {renderTeamNameInput()}
      {renderEmailInput()}
      {renderInvitesList()}
      {renderMembersList()}
      <Button type='submit' onClick={handleSubmit}>
        Сохранить
      </Button>
    </Form>
  )
}

export default EditTeamPage
