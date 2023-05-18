import React from 'react'

import styles from './TeamsPage.module.css'

type TeamsPageProps = {}

const TeamsPage: React.FC<TeamsPageProps> = () => {
  return (
    <div className={styles.content}>
      <h2>Приветствуем!</h2>
      <p>Для просмотра выберите команду слева или создайте команду</p>
    </div>
  )
}

export default TeamsPage
