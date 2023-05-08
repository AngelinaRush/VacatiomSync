import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useNavigate } from 'react-router-dom'

import styles from './Login.module.css'

import { useAuth } from '../../context/AuthContext'

import { fieldIsEmpty, validateEmail } from '../../utils/validators'

type LoginProps = {}

const Login: React.FC<LoginProps> = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [validated, setValidated] = useState<boolean>(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signup, signin } = useAuth()
  const navigate = useNavigate()

  const handleSignup = (evt: any) => {
    evt.preventDefault()

    if (fieldIsEmpty(email) || fieldIsEmpty(password)) {
      setValidated(true)
      return
    }

    if (!validateEmail(email)) {
      setValidated(true)
      return
    }
    setError('')
    setLoading(true)
    setValidated(false)
    signup(email, password)
      .then((ref: any) => {
        setLoading(false)
        navigate('/vacations')
      })
      .catch((err: any) => {
        setError(err.message)
        setLoading(false)
      })
  }

  const handleSignin = (evt: any) => {
    evt.preventDefault()
    if (!validateEmail(email)) {
      setValidated(true)
      return
    }

    if (fieldIsEmpty(email) || fieldIsEmpty(password)) {
      setValidated(true)
      return
    }

    setError('')
    setLoading(true)
    setValidated(false)
    signin(email, password)
      .then((ref: any) => {
        setLoading(false)
        navigate('/vacations')
      })
      .catch((err: any) => {
        setError(err.message)
        setLoading(false)
      })
  }

  const handleEmailChange = (evt: any) => {
    setEmail(evt.target.value)
  }

  const handlePasswordChange = (evt: any) => {
    setPassword(evt.target.value)
  }

  return (
    <div className={styles.login}>
      <Form noValidate validated={validated}>
        <h2>Вход в VacationSync</h2>
        <label>Введите почту и пароль, чтобы войти или зарегистрироваться</label>
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
            value={password}
            onChange={handlePasswordChange}
            aria-label='password'
            aria-describedby='password'
          />
          <Form.Control.Feedback type='invalid'>Введите пароль</Form.Control.Feedback>
        </InputGroup>
        <div className={styles['buttons']}>
          <Button disabled={loading} onClick={handleSignin}>
            Войти
          </Button>
          <Button disabled={loading} onClick={handleSignup}>
            Зарегистрироваться
          </Button>
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </Form>
    </div>
  )
}

export default Login
