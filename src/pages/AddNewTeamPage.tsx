import React, { Dispatch, useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './AddNewTeamPage.module.css'

import { RootState } from '../redux/rootReducer'
import { addTeam } from '../redux/teams/actions'
import { fieldIsEmpty, validateEmail } from '../utils/validators'

type AddNewTeamPageProps = {}

const AddNewTeamPage: React.FC<AddNewTeamPageProps> = () => {
  const { newTeamId } = useSelector((state: RootState) => state.teams)

  const [title, setTitle] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [invites, setInvites] = useState<string[]>([])
  const [validated, setValidated] = useState<boolean>(false)
  const navigate = useNavigate()

  const dispatch: Dispatch<any> = useDispatch()

  useEffect(() => {
    if (newTeamId) {
      navigate(`/team/${newTeamId}`)
    }
  }, [newTeamId, navigate])

  const handleSubmit = (evt: any) => {
    evt.preventDefault()

    if (fieldIsEmpty(title) || fieldIsEmpty(invites)) {
      setValidated(true)
      return
    }

    const newTeam = {
      title: title,
      invites,
    }

    addTeam(newTeam)(dispatch)
    setTitle('')
    setEmail('')
    setInvites([])
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
        className={styles.input}
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
        className={styles.input}
        required
        type='email'
        placeholder='Электронная почта'
        value={email}
        onChange={handleEmailChange}
        aria-label='email'
        aria-describedby='email'
      />
      <Button type='button' onClick={handleAddInvite}>
        Добавить приглашение
      </Button>
      <Form.Control.Feedback type='invalid'>
        Введите корректный e-mail в формате example@domain.com
      </Form.Control.Feedback>
    </InputGroup>
  )

  const renderInvitesList = () => (
    <React.Fragment>
      <h3>Приглашенные</h3>
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

  return (
    <Form className={styles.form} noValidate validated={validated} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Создание команды</h2>
      {renderTeamNameInput()}
      {renderEmailInput()}
      {renderInvitesList()}
      <Button type='submit' onClick={handleSubmit}>
        Создать
      </Button>
    </Form>
  )
}

export default AddNewTeamPage
