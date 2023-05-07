import React, { ReactNode } from 'react'

import styles from './withMenu.module.css'

import Board from '../components/Board/Board'
import Header from '../components/Header/Header'

const withMenuHOC = (page: ReactNode) => (
  <main>
    <Header />
    <Board />
    <div className={styles.pageContent}>{page}</div>
  </main>
)

export default withMenuHOC
