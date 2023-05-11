import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import styles from './VacationModal.module.css'

import { DateRangeValue } from '../../types'

import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css'
import 'react-calendar/dist/Calendar.css'

type VacationsModalProps = {
  dateRange: DateRangeValue
  onChangeDateRange: (value: DateRangeValue) => void
  show: boolean
  onHide: () => void
  onRemove: () => void
  onEdit: () => void
}

const VacationsModal: React.FC<VacationsModalProps> = (props) => {
  const { dateRange, onChangeDateRange, onRemove, onEdit } = props

  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Выберите даты отпуска</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.container}>
          <DateRangePicker
            calendarAriaLabel='Toggle calendar'
            clearAriaLabel='Clear value'
            dayAriaLabel='Day'
            monthAriaLabel='Month'
            nativeInputAriaLabel='Date'
            // @ts-ignore
            onChange={onChangeDateRange}
            value={dateRange}
            yearAriaLabel='Year'
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onRemove}>Удалить отпуск</Button>
        <Button onClick={onEdit}>Сохранить изменения</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default VacationsModal
