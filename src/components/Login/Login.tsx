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
        <form>
          <h2>Вход в VacationSync</h2>
          <label>Введите почту и пароль, чтобы войти или зарегистрироваться</label>
          <InputGroup className='mb-3'>
            <InputGroup.Text id='email'>E-mail</InputGroup.Text>
            <Form.Control type='email' placeholder='Электронная почта' aria-label='email' aria-describedby='email' />
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Text id='password'>Password</InputGroup.Text>
            <Form.Control type='password' placeholder='Пароль' aria-label='password' aria-describedby='password' />
          </InputGroup>
          <div className={styles['buttons']}>
            <Button>Войти</Button>
            <Button>Зарегистрироваться</Button>
          </div>
        </form>
      </div>
    )
  }
}
