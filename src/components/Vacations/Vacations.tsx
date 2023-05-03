import React from 'react'

import { Vacation } from '../../types'
import VacationsItem from '../VacationsItem/VacationsItem'

type VacationsProps = {
  vacations: Vacation[] | null
}

const Vacations: React.FC<VacationsProps> = ({ vacations }) => {
  if (!vacations) {
    return <h3>Подождите идет загрузка</h3>
  }
  if (!vacations.length) {
    return <h3>В данной команде еще не выбрали отпуска</h3>
  }

  return (
    <React.Fragment>
      <h3>Список участников с выбранными отпусками</h3>
      {vacations.map((vacation, index) => (
        <VacationsItem {...vacation} key={index}></VacationsItem>
      ))}
    </React.Fragment>
  )
}

export default Vacations
