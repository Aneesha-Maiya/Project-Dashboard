import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCheckCircle} from '@fortawesome/free-regular-svg-icons';
import {faCaretRight, faLink} from '@fortawesome/free-solid-svg-icons';
import {ProgressBar,Button} from 'react-bootstrap';
import axios from 'axios';

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
  const projectInfoElectron = {
    action: "openedCodeBlock",
    projectId: props.id,
    url: props.url,
    webAppUrl: props.webUrl,
    type: props.projectTech,
  }
const startCodeBlockRequest = {
    "codeBlockId": "Project1",
    "userId": ""
  }
  const projectNameClick = () => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        console.log("Response from Axios on clicking project name(get): "+ JSON.stringify(response))
        console.log("data from axios (get): "+response.data)
      })
      .catch((error) => console.log("error msg: "+error))
      if(props.projectTech === "webapp"){
        window.electronAPI.sendWebURL(projectInfoElectron)
      }
      else{
        window.electronAPI.sendURL(projectInfoElectron)
      }
  }
  return (
    <>
        <div className={Choice}>
          <div className='ProjectContentInfo'>
            <img src = {props.logo} alt='no!'/>
            <div className='ProjectNameDate'>
              <a href = "#" onClick={projectNameClick}><h3>{props.name}</h3></a>
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
            {props.sharedBy == props.getUserDetailsAPIResponse.userName &&
            <Button variant = 'success' className='LaunchButton'
            onClick={()=>{
              // props.changeStartCodeblockResponse(props.id)
              startCodeBlockRequest.userId = props.getUserDetailsAPIResponse.id
              startCodeBlockRequest.codeBlockId = props.id
              window.electronAPI?.startCodeBlock(startCodeBlockRequest)
            }}>Launch <FontAwesomeIcon icon={faCaretRight} className='LaunchIcon'/></Button>}
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
