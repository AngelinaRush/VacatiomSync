import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import styles from './AddVacationModal.module.css'

import { DateRangeValue } from '../../types'

import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css'
import 'react-calendar/dist/Calendar.css'

type AddVacationsModalProps = {
  dateRange: DateRangeValue
  onChangeDateRange: (value: DateRangeValue) => void
  show: boolean
  onHide: () => void
  onSubmit: () => void
}

const AddVacationsModal: React.FC<AddVacationsModalProps> = (props) => {
  const { dateRange, onChangeDateRange, onSubmit } = props
  const [start, end] = dateRange
  const isDisabled = !start || !end

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
        <Button onClick={onSubmit} disabled={isDisabled}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddVacationsModal
