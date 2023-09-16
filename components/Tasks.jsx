import React from 'react'

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
      </div> :
      <div className='TasksContentFalse'>
        <h3>{props.taskName}</h3>
        {props.taskStatus ? <i class = 'fa fa-check-circle' id='checked-circle' onClick={props.changeStatus}/>:
        <i class='fa fa-circle-thin' id = 'unchecked-circle' onClick={props.changeStatus}/>}
        <p>{props.taskDuration}</p>
      </div>
    }
    </>
  )
}
