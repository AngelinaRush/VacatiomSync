import React from 'react'

import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

import styles from './HomePage.module.css'

type HomePageProps = {}

const HomePage: React.FC<HomePageProps> = () => {
  const navigate = useNavigate()

  const handleSignin = (evt: any) => {
    evt.preventDefault()
    navigate('/login')
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.leadBlockContent}>
          <div>
            <h1 className={styles.title}>VacationSync</h1>
            <p className={styles.description}>
              Путешествуйте по одному, работайте вместе! Отпускодновременно? Никогда!
            </p>
            <Button className={styles.login} onClick={handleSignin}>
              Поехали!
            </Button>
          </div>
          <img src='/vacation.jpg' alt='vacation' className={styles.vacationPic} />
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.stepsBlockContent}>
          <img src='/meditating.png' alt='meditating' className={styles.vacationPic} />
          <div className={styles.steps}>
            <h2>Как пользоваться</h2>
            <ol className={styles.stepsContent}>
              <li>Зарегистрируйся</li>
              <li>Создай команду или вступи в нее по приглашению</li>
              <li>Выбери даты своего отпуска, убедись, что они не пересекаются с отпусками членов твоей команды</li>
              <li>Редактируй и отменяй свои отпуска при необходимости</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
