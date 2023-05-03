import React from 'react'
import Button from 'react-bootstrap/Button'

import styles from './Header.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>VacationSync</div>
      <Button size='sm'>Выйти</Button>
    </header>
  )
}

export default Header
