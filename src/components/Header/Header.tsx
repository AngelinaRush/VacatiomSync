import React from 'react'
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom'

import styles from './Header.module.css'

import { useAuth } from '../../context/AuthContext'

const Header: React.FC = () => {
  const { signout, currentUser } = useAuth()

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <NavLink className={styles.logo} to={'/vacations'}>
          <div className={styles.logoImg}>
            <img src='/logo.svg' alt='логотип' />
          </div>
          VacationSync
        </NavLink>
        <div className={styles.menu}>
          <NavLink className={styles.menuItem} to={'/teams'}>
            Команды
          </NavLink>
          <NavLink className={styles.menuItem} to={'/vacations'}>
            Отпуска
          </NavLink>
        </div>
      </div>
      <div>
        <span className={styles.menuItem}>{currentUser.displayName}</span>
        <Button size='sm' onClick={signout}>
          Выйти
        </Button>
      </div>
    </header>
  )
}

export default Header
