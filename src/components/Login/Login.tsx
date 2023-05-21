import React, { useState } from 'react'

import { Tabs, Tab } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useNavigate } from 'react-router-dom'

import styles from './Login.module.css'

import { ReactComponent as Logo } from '../../assets/logo.svg'

import { useAuth } from '../../context/AuthContext'

import { fieldIsEmpty, validateEmail } from '../../utils/validators'

type LoginProps = {}

const Login: React.FC<LoginProps> = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [validated, setValidated] = useState<boolean>(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullname] = useState('')

  const { signup, signin } = useAuth()
  const navigate = useNavigate()

  const handleSignup = (evt: any) => {
    evt.preventDefault()

    if (fieldIsEmpty(email) || fieldIsEmpty(password) || fieldIsEmpty(fullname)) {
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
    signup(email, password, fullname)
      .then((ref: any) => {
        setLoading(false)
        navigate('/teams')
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

  const handleFullnameChange = (evt: any) => {
    setFullname(evt.target.value)
  }

  const renderAuthError = () => {
    const match = error.match(/\(([^)]+)\)/)
    if (!match) {
      return
    }

    const errorCode = match[1]
    let preparedError = ''

    switch (errorCode) {
      case 'auth/user-not-found':
        preparedError = 'Пользователь не найден'
        break
      case 'auth/wrong-password':
        preparedError = 'Неверный пароль'
        break
      case 'auth/weak-password':
        preparedError = 'Пароль должен содержать не менее 6 символов'
        break
      default:
        preparedError = error
        break
    }

    return <div className={styles.error}>{preparedError}</div>
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.login}>
        <div>
          <div className={styles.logo}>
            <Logo className={styles.logoImg} />
            <div className={styles.logoText}>VacationSync</div>
          </div>
          <div className={styles.tabs}>
            <Tabs defaultActiveKey='signin'>
              <Tab eventKey='signin' title='Вход'>
                <div className={styles.description}>Введите почту и пароль, чтобы войти</div>
                <Form noValidate validated={validated}>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={styles.label} id='email'>
                      Почта
                    </InputGroup.Text>
                    <Form.Control
                      className={styles.input}
                      required
                      type='email'
                      placeholder='example@domain.com'
                      value={email}
                      onChange={handleEmailChange}
                      aria-label='email'
                      aria-describedby='email'
                    />
                    <Form.Control.Feedback type='invalid'>
                      Введите корректный e-mail в формате example@domain.com
                    </Form.Control.Feedback>
                  </InputGroup>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={styles.label} id='password'>
                      Пароль
                    </InputGroup.Text>
                    <Form.Control
                      className={styles.input}
                      required
                      type='password'
                      value={password}
                      onChange={handlePasswordChange}
                      aria-label='password'
                      aria-describedby='password'
                    />
                    <Form.Control.Feedback type='invalid'>Введите пароль</Form.Control.Feedback>
                  </InputGroup>
                  <Button disabled={loading} onClick={handleSignin}>
                    Войти
                  </Button>
                </Form>
              </Tab>
              <Tab eventKey='signup' title='Регистрация'>
                <div className={styles.description}>Введите почту пароль, и полное имя чтобы зарегистрироваться</div>
                <Form noValidate validated={validated}>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={styles.label} id='email'>
                      Почта
                    </InputGroup.Text>
                    <Form.Control
                      className={styles.input}
                      required
                      type='email'
                      placeholder='example@domain.com'
                      value={email}
                      onChange={handleEmailChange}
                      aria-label='email'
                      aria-describedby='email'
                    />
                    <Form.Control.Feedback type='invalid'>
                      Введите корректный e-mail в формате example@domain.com
                    </Form.Control.Feedback>
                  </InputGroup>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={styles.label} id='fullname'>
                      ФИО
                    </InputGroup.Text>
                    <Form.Control
                      className={styles.input}
                      required
                      type='text'
                      placeholder='Иванов Иван Иванович'
                      value={fullname}
                      onChange={handleFullnameChange}
                      aria-label='fullname'
                      aria-describedby='fullname'
                    />
                  </InputGroup>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={styles.label} id='password'>
                      Пароль
                    </InputGroup.Text>
                    <Form.Control
                      className={styles.input}
                      required
                      type='password'
                      value={password}
                      onChange={handlePasswordChange}
                      aria-label='password'
                      aria-describedby='password'
                    />
                    <Form.Control.Feedback type='invalid'>Введите пароль</Form.Control.Feedback>
                  </InputGroup>
                  <Button disabled={loading} onClick={handleSignup}>
                    Зарегистрироваться
                  </Button>
                </Form>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      {error && renderAuthError()}
    </div>
  )
}

export default Login
