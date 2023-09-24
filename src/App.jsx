import React, { useState, useRef, useEffect } from 'react'
import Calendar from 'react-calendar'
import {Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus,faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {Routes,Route,Link} from "react-router-dom"
import Keycloak from 'keycloak-js'

import ProjectData from './Project.json'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import TaskPanel from '../components/TaskPanel'
import Project from '../components/Project'
import TeamMembers from '../components/TeamMembers'
import Calander from '../components/Calander'
import AllProjects from '../components/AllProjects'
import MyModal from '../components/MyModal'
import Password from '../components/Password'
import UserDetails from '../components/UserDetails'
import './Keycloak-Login.css'

import Lindsley from '../image/Lindsley.jfif'
import Aaron from '../image/Aaron.jfif'
import Brian from '../image/Brian.jfif'
import Jessica from '../image/Jessica.jfif'
import Amelia from '../image/Amelia.jpg'

// import Fintech from '../image/Fintech.jfif'
// import DribbleShot from '../image/DribbleShot.avif'
// import UiKit from '../image/UiKit.jfif'
// import SmartCity from '../image/SmartCity.jpg'

export default function App() {
  const TaskArray = [
    {
      name:"WireFraming Concept",
      duration:"Today",
      isCompleted: false,
    },
    {
      name:"Create MoodBoard",
      duration:"Today",
      isCompleted: true,
    },
    {
      name:"Create Style Guide",
      duration:"Tomorrow",
      isCompleted: false,
    },
    {
      name:"UI Design Started",
      duration:"Tomorrow",
      isCompleted: true,
    }
]
const teamMembersArray = [
  {
    name : "Aaron Stanley",
    position: "UI Designer",
    profileImg: Aaron,
  },
  {
    name : "Amelia Martinej",
    position: "UI Designer",
    profileImg: Amelia,
  },
  {
    name : "Brian Artemayev",
    position: "Lead Product Designer",
    profileImg: Brian,
  },
  {
    name : "Jessica Naomi",
    position: "UX Designer",
    profileImg: Jessica,
  }
]

const [task,setTask] = useState(TaskArray);
const [project,setProject] = useState(ProjectData);
const [teamMember,setteamMember] = useState(teamMembersArray);
const [dateValue,setDateValue] = useState(new Date());
const [userName,setUserName] = useState("Lindsley Alison");
const [modalShow,setModalShow] = useState(false);
const [passwordModel,setPasswordModel] = useState(true);
const [loggedIn, setIsLoggedIn] = useState(false);

const date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let currentDate =  `${day}-${month+1}-${year}`;

const checkTask = (itemIndex)=>{
  const newTasks = [...task]
  newTasks[itemIndex].isCompleted = !newTasks[itemIndex].isCompleted
  setTask(newTasks)
}

// const keyCloak = new Keycloak({
//   url: "http://localhost:8080/auth",
//   realm: "karthikrealm",
//   clientId: "bcauth"
// });
const keyCloak = new Keycloak('/keycloak.json')
const checkKeyloak = async () => {
  try {
    const authenticated = await keyCloak.init({onLoad:"login-required"});
    console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
    console.log("client", keyCloak);
    console.log(keyCloak.token)
  } catch (error) {
    console.error('Failed to initialize adapter:', error);
  }
}
const isCalled = useRef(false);
useEffect( () => {
  if (isCalled.current)
    return;
  isCalled.current = true;
   checkKeyloak();
}, [])
  return (
    <>
      <Routes>
        <Route path='/' element = 
        {
          <>
            <Header
            name = "Lindsey"
            fullName = "Lindsley Alisson"
            position = "UI Designer"
            profileImg = {Lindsley}
            />
            <div className='MainContent'>
              <Sidebar
                project = {project}
                passwordModel = {passwordModel}
                passwordSetModel = {setPasswordModel}
                Keycloak = {keyCloak}
              />
              <div className='TaskContent'>
                <div className='TaskContentTopHeading'>
                    <h1>Recent Tasks</h1>
                    <a href='#'><p>All Tasks</p></a>
                    <h1 className='CalanderTitle'>Calander</h1>
                </div>
                <div className='TaskContentTop'>
                  <div className = 'TaskList'>
                    {
                      task.map((item,index) =>(
                        <TaskPanel
                          tasks = {item}
                          taskName = {item.name}
                          taskStatus = {item.isCompleted}
                          changeStatus = {() => {checkTask(index)}}
                        />
                      ))
                    }
                  </div>
                  <div className='TaskCalander'>
                    <Calander
                      date = {currentDate}
                      dateValue = {dateValue}
                      onChangeEvent = {setDateValue}
                    />
                  </div>
                </div>
                <div className='TaskContentBottomHeading'>
                  <h1 className='ProjectsHeading'>Ongoing Projects</h1>
                  <Link to="/AllProjects"><a href='#'><p>All Projects</p></a></Link>
                  <h1 className='TeamMembers'>Team Members</h1>
                </div>
                <div className='TaskContentBottom'>
                  <div className='TaskContentBottomProject'>
                    {
                      project.map((item,index)=>
                      {
                        if(item.sharedBy.userName == userName){
                          return (
                            <Project
                            name = {item.name}
                            deadline = {item.deadline}
                            numberOfTasks = {item.numberOfTasks}
                            numberOfTasksCompleted = {item.numberOfTasksCompleted}
                            numberOfMembers = {item.numberOfMembers}
                            id = {item.id}
                            favorite = {item.isFavorite}
                            logo = {item.logo}
                            sharedBy = {item.sharedBy.userName}
                            currentUser = {userName}
                          />
                          ) // return
                        } //if
                      } //callback function
                     ) //map function
                    } 
                  </div>
                  <div className='TaskContentBottomTeam'>
                    {
                      teamMember.map((item,index)=>(
                        <TeamMembers
                          name = {item.name}
                          position = {item.position}
                          profileImg = {item.profileImg}
                        />
                      ))
                    }
                  </div>
                </div>
                <div className='ProjectAddEditButton'>
                      <Button variant='primary' className='ProjectButton' onClick={()=>setModalShow(true)}>
                        <FontAwesomeIcon icon={faPlus} className='ProjectButtonIcon'/>Add New Projects</Button>
                        <MyModal
                        show = {modalShow}
                        onHide = {()=>setModalShow(false)}
                        />
                      <Button variant='primary' className='ProjectButton'>
                        <FontAwesomeIcon icon={faPenToSquare} className='ProjectButtonIcon'/>Edit Project Info</Button>
                </div>
              </div>
            </div>
          </>
        }
        />
      <Route path='/AllProjects' element = 
      {
        <AllProjects
          project = {project}
          currentUser = {userName}
        />
      }/>
      <Route path='/Password' element = {
      <Password
        show = {passwordModel}
        onHide = {()=>setPasswordModel(false)}
        passwordModel = {passwordModel}
        passwordSetModel = {setPasswordModel}
      />
      }/>
      <Route path='/UserDetails' element={
        <UserDetails
          show = {passwordModel}
          onHide = {()=>setPasswordModel(false)}
        />
      }>
      </Route>
      </Routes>
    </>
  )
}

