import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCheckCircle} from '@fortawesome/free-regular-svg-icons';
import {faLink} from '@fortawesome/free-solid-svg-icons';
import {ProgressBar} from 'react-bootstrap';

export default function Project(props) {
  let Choice = ''
  // const check = <FontAwesomeIcon icon={faCheckCircle}/>

  if(props.id%5 === 1)
  Choice = 'ProjectContentItem1'
  else if(props.id%5 === 2)
  Choice = 'ProjectContentItem2'
  else if(props.id%5 ===3)
  Choice = 'ProjectContentItem3'
  else if(props.id%5 === 4)
  Choice = 'ProjectContentItem4'
  else if(props.id%5 === 0)
  Choice = 'ProjectContentItem5'
  else
  Choice = 'ProjectContent'
  return (
    <>
        <div className={Choice}>
          <div className='ProjectContentInfo'>
            <img src = {props.logo} alt='no!'/>
            <div className='ProjectNameDate'>
              <h3>{props.name}</h3>
              {props.sharedBy != props.currentUser && 
              <p>Shared By: {props.sharedBy.userName} ({props.sharedBy.userID})</p>}
              {/* {props.sharedBy!= props.currentUser &&
              <p>ID = {props.sharedBy.userID}</p>} */}
              <p>{props.deadline}</p>
            </div>
          </div>
          <div className = 'ProjectTasksInfo'>
            <p><FontAwesomeIcon icon={faCheckCircle}/>  {props.numberOfTasksCompleted}/{props.numberOfTasks}</p>
            <p><FontAwesomeIcon icon={faLink}/>  {props.numberOfMembers}</p>
          </div>
          <div className='ProjectProgressBar'>
            <ProgressBar now={(props.numberOfTasksCompleted/props.numberOfTasks)*100}
            id='progressBar1'/>
            <p>{Math.floor((props.numberOfTasksCompleted/props.numberOfTasks)*100)}%</p>
          </div>
        </div>
    </>
  )
}
