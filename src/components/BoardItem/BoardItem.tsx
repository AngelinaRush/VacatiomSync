import cn from 'classname'
import React from 'react'

import styles from './BoardItem.module.css'

type BoardItemProps = {
  children: React.ReactNode
  className?: string
}

const BoardItem: React.FC<BoardItemProps> = ({ children, className = '' }) => {
  return (
    <div className={cn(styles.item, className)}>
      <div className={styles.title}>{children}</div>
    </div>
  )
}

export default BoardItem
