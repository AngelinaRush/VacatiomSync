import React from 'react'

import styles from './TeamsPage.module.css'

type NotFoundPageProps = {}

const TeamsPage: React.FC<NotFoundPageProps> = () => {
  return (
    <div className={styles.content}>
      <h2>Приветствуем!</h2>
      <p>Для просмотра выберите команду слева</p>
    </div>
  )
}

export default TeamsPage
