import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

import './Login.module.css'
import styles from './Login.module.css'

export default class Login extends React.Component {
  render() {
    return (
      <div className={styles.login}>
        <Form>
          <h2>Вход в VacationSync</h2>
          <label>Введите почту и пароль, чтобы войти или зарегистрироваться</label>
          <InputGroup className='mb-3'>
            <InputGroup.Text id='email'>E-mail</InputGroup.Text>
            <Form.Control
              required
              type='email'
              placeholder='Электронная почта'
              aria-label='email'
              aria-describedby='email'
            />
            <Form.Control.Feedback type='invalid'>
              Адрес электронной почты должен содержать символ '@'
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Text id='password'>Password</InputGroup.Text>
            <Form.Control
              required
              type='password'
              placeholder='Пароль'
              aria-label='password'
              aria-describedby='password'
            />
            <Form.Control.Feedback type='invalid'>Введите пароль</Form.Control.Feedback>
          </InputGroup>
          <div className={styles['buttons']}>
            <Button>Войти</Button>
            <Button>Зарегистрироваться</Button>
          </div>
        </Form>
      </div>
    )
  }
}
