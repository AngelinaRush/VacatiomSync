import React from 'react'
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom'

import styles from './Header.module.css'
import logo from './pic/logo.svg'

import { useAuth } from '../../context/AuthContext'

const Header: React.FC = () => {
  const { signout } = useAuth()

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <NavLink className={styles.logo} to={'/vacations'}>
          <div className={styles.logoImg}>
            <img src={logo} alt='логотип' />
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
      <Button size='sm' onClick={signout}>
        Выйти
      </Button>
    </header>
  )
}

export default Header
