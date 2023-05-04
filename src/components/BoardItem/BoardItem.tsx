import cn from 'classname'
import React from 'react'
import { CloseButton } from 'react-bootstrap'
import { connect } from 'react-redux'

import styles from './BoardItem.module.css'

import { removeTeam } from '../../redux/teams/actions'

type BoardItemProps = {
  children: React.ReactNode
  className?: string
  removeTeam?: (id: number) => void
  id?: number
}

const BoardItem: React.FC<BoardItemProps> = ({ children, className = '', removeTeam, id }) => {
  return (
    <div className={cn(styles.item, className)}>
      <div className={styles.title}>{children}</div>
      {id && removeTeam && (
        <CloseButton
          variant='white'
          onClick={(evt: any) => {
            evt.preventDefault()
            evt.stopPropagation()
            removeTeam(id)
          }}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state: any) => ({ teams: state.teams })
const mapDispatchToProps = (dispatch: any) => ({
  removeTeam: (id: number) => dispatch(removeTeam(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardItem)
