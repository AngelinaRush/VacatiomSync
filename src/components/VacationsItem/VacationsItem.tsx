import React from 'react'

import styles from './VacationsItem.module.css'

type VacationsItemProps = {
  member: string
}

const VacationsItem: React.FC<VacationsItemProps> = ({ member }) => {
  return <div className={styles.surname}>{member}</div>
}

export default VacationsItem
