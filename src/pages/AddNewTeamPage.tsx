import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import { connect } from 'react-redux'

import styles from './AddNewTeamPage.module.css'

import * as actions from '../redux/teams/actions'
import { Team } from '../types'
import { fieldIsEmpty, validateEmail } from '../utils/validators'

type AddNewTeamPageProps = {
  addTeam: (newTeam: Team) => void
}

const AddNewTeamPage: React.FC<AddNewTeamPageProps> = (props) => {
  const [title, setTitle] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [members, setMembers] = useState<string[]>([])
  const [validated, setValidated] = useState<boolean>(false)

  const { addTeam } = props

  const handleSubmit = (evt: any) => {
    evt.preventDefault()

    if (fieldIsEmpty(title) || fieldIsEmpty(members)) {
      setValidated(true)
      return
    }

    const newTeam = {
      id: +Date.now(),
      title: title,
      members: members,
    }

    addTeam(newTeam)
    setTitle('')
    setEmail('')
    setMembers([])
    setValidated(false)
  }

  const handleTitleChange = (evt: any) => {
    setTitle(evt.target.value)
  }

  const handleEmailChange = (evt: any) => {
    setEmail(evt.target.value)
  }

  const handleAddMember = () => {
    if (!validateEmail(email)) {
      setValidated(true)
      return
    }

    setEmail('')
    setMembers([...members, email])
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
      <Button type='button' onClick={handleAddMember}>
        Добавить участника
      </Button>
    </InputGroup>
  )

  const renderMembersList = () => (
    <ListGroup className='mb-3'>
      {members.map((member, index) => (
        <ListGroup.Item key={member}>
          <div className={styles.listItem}>
            {member}
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
  )

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <h2>Создание команды</h2>
      {renderTeamNameInput()}
      {renderEmailInput()}
      {renderMembersList()}
      <Button type='submit' onClick={handleSubmit}>
        Создать
      </Button>
    </Form>
  )
}
const mapStateToProps = (state: any) => ({ teams: state.teams })
const mapDispatchToProps = (dispatch: any) => ({
  addTeam: (newTeam: any) => dispatch(actions.addTeam(newTeam)),
})

export { AddNewTeamPage }

export default connect(mapStateToProps, mapDispatchToProps)(AddNewTeamPage)
