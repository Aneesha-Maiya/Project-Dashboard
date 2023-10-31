import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Tasks(props) {
  return (
    <>
    {
      props.taskStatus ?
      <div className='TasksContentTrue'>
        <h3>{props.taskName}</h3>
        {props.taskStatus ? <i class = 'fa fa-check-circle' id='checked-circle' onClick={props.changeStatus}/>:
         <i class='fa fa-circle-thin' id = 'unchecked-circle' onClick={props.changeStatus}/>}
        <p>{props.taskDuration}</p>
        <div className = 'TasksOperation'>
          <FontAwesomeIcon icon={faPenToSquare} className='ProjectButtonIcon'
            onClick={props.setEditTasksValues}
          />
          <FontAwesomeIcon icon={faTrash} className='ProjectButtonIcon'/>
        </div>
      </div> :
      <div className='TasksContentFalse'>
        <h3>{props.taskName}</h3>
        {props.taskStatus ? <i class = 'fa fa-check-circle' id='checked-circle' onClick={props.changeStatus}/>:
        <i class='fa fa-circle-thin' id = 'unchecked-circle' onClick={props.changeStatus}/>}
        <p>{props.taskDuration}</p>
        <FontAwesomeIcon icon={faPenToSquare} className='ProjectButtonIcon'
          onClick={props.setEditTasksValues}
        />
      </div>
    }
    </>
  )
}
