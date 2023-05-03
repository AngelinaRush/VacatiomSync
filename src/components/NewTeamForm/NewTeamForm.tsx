import React from 'react'

import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'

import styles from './NewTeamForm.module.css'

import { Team } from '../../types'

type NewTeamFormProps = {
  handleSubmit?: (newTeam: Team) => void
}

type NewTeamFormState = {
  title: string
  email: string
  members: string[]
}

export default class NewTeamForm extends React.Component<NewTeamFormProps, NewTeamFormState> {
  constructor(props: any) {
    super(props)

    this.state = {
      title: '',
      email: '',
      members: [],
    }
  }

  handleSubmit = (evt: any) => {
    if (!this.props.handleSubmit) {
      return
    }

    evt.preventDefault()

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
    this.setState({
      email: '',
      members: [...this.state.members, this.state.email],
    })
  }
  render() {
    const members = this.state.members

    console.log(members)
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Создание команды</h2>
        <InputGroup className='mb-3'>
          <InputGroup.Text id='title'>Название команды</InputGroup.Text>
          <Form.Control
            type='text'
            placeholder='Название команды'
            value={this.state.title}
            onChange={this.handleTitleChange}
            aria-label='title'
            aria-describedby='title'
          />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Text id='email'>E-mail</InputGroup.Text>
          <Form.Control
            type='email'
            placeholder='Электронная почта'
            value={this.state.email}
            onChange={this.handleEmailChange}
            aria-label='email'
            aria-describedby='email'
          />
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
      </form>
    )
  }
}
