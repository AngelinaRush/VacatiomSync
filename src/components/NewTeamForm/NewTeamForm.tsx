import React from 'react'

import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'

import styles from './NewTeamForm.module.css'

import { Team } from '../../types'
import { fieldIsEmpty, validateEmail } from '../../utils/validators'

type NewTeamFormProps = {
  handleSubmit?: (newTeam: Team) => void
}

type NewTeamFormState = {
  title: string
  email: string
  members: string[]
  validated: boolean
}

export default class NewTeamForm extends React.Component<NewTeamFormProps, NewTeamFormState> {
  constructor(props: any) {
    super(props)

    this.state = {
      title: '',
      email: '',
      members: [],
      validated: false,
    }
  }

  handleSubmit = (evt: any) => {
    if (!this.props.handleSubmit) {
      this.setState({ validated: true })
      return
    }

    evt.preventDefault()

    if (fieldIsEmpty(this.state.title) || fieldIsEmpty(this.state.members)) {
      this.setState({ validated: true })
      return
    }

    const newTeam = {
      id: +Date.now(),
      title: this.state.title,
      members: this.state.members,
    }

    this.props.handleSubmit(newTeam)
    this.setState({
      title: '',
      email: '',
      members: [],
      validated: false,
    })
  }

  handleTitleChange = (evt: any) => {
    this.setState({
      title: evt.target.value,
    })
  }

  handleEmailChange = (evt: any) => {
    this.setState({
      email: evt.target.value,
    })
  }

  handleAddMember = () => {
    if (!validateEmail(this.state.email)) {
      this.setState({ validated: true })
      return
    }

    this.setState({
      email: '',
      members: [...this.state.members, this.state.email],
      validated: false,
    })
  }
  render() {
    const members = this.state.members
    const { validated } = this.state

    return (
      <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
        <h2>Создание команды</h2>
        <InputGroup className='mb-3'>
          <InputGroup.Text id='title'>Название команды</InputGroup.Text>
          <Form.Control
            required
            type='text'
            placeholder='Название команды'
            value={this.state.title}
            onChange={this.handleTitleChange}
            aria-label='title'
            aria-describedby='title'
          />
          <Form.Control.Feedback type='invalid'>Введите название команды</Form.Control.Feedback>
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Text id='email'>E-mail</InputGroup.Text>
          <Form.Control
            required
            type='email'
            placeholder='Электронная почта'
            value={this.state.email}
            onChange={this.handleEmailChange}
            aria-label='email'
            aria-describedby='email'
          />
          <Form.Control.Feedback type='invalid'>
            Адрес электронной почты должен содержать символ '@'
          </Form.Control.Feedback>
          <Button type='button' onClick={this.handleAddMember}>
            Добавить участника
          </Button>
        </InputGroup>
        <ListGroup className='mb-3'>
          {members.map((member, index) => (
            <ListGroup.Item key={member}>
              <div className={styles.listItem}>
                {member}
                <CloseButton
                  onClick={() => {
                    const newMembers = [...this.state.members]
                    newMembers.splice(index, 1)
                    this.setState({
                      members: newMembers,
                    })
                  }}
                />
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Button type='submit' onClick={this.handleSubmit}>
          Создать
        </Button>
      </Form>
    )
  }
}
