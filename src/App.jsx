import React, { useState, useRef, useEffect, useContext } from 'react'
import Calendar from 'react-calendar'
import {Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus,faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {Routes,Route,Link} from "react-router-dom"
import {useIdleTimer} from "react-idle-timer"
import Keycloak from 'keycloak-js'
import axios from 'axios'

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
import AuthContext from './contexts/authContext'
import newProjectInfoContext from './contexts/newprojectInfoContext'

import Lindsley from '../image/Lindsley.jfif'
import Aaron from '../image/Aaron.jfif'
import Brian from '../image/Brian.jfif'
import Jessica from '../image/Jessica.jfif'
import Amelia from '../image/Amelia.jpg'

// import Fintech from '../image/Fintech.jfif'
// import DribbleShot from '../image/DribbleShot.avif'
// import UiKit from '../image/UiKit.jfif'
// import SmartCity from '../image/SmartCity.jpg'
const keyCloak = new Keycloak('/keycloak.json')
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
const [searchVal,setSearchVal] = useState("")
const [kcToken,setkcToken] = useState("") 
const [appState,setAppState] = useState("Active")
const [count,setCount] = useState(0)
const [remaining,setRemaining] = useState(0)

const addProjectInfo = useContext(newProjectInfoContext)

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

const setSearchBarInput = (value) => {
  setSearchVal(value)
}
// const keyCloak = new Keycloak({
//   url: "http://localhost:8080/auth",
//   realm: "karthikrealm",
//   clientId: "bcauth"
// });

let keycloakToken = null
const checkKeyloak = async () => {
  try {
    const authenticated = await keyCloak.init({onLoad:"login-required"});
    console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
    console.log("client", keyCloak);
    console.log(keyCloak.token)
    setkcToken(keyCloak.token)
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
   axios.post("https://jsonplaceholder.typicode.com/posts",{})
      .then((response) => {
        console.log("Response from Axios after receiving token(Post): "+ JSON.stringify(response))
        console.log("data from axios (Post): "+response.data)
      })
  .catch((error) => console.log("error msg: "+error))
}, [])
  const onIdle = () => {
    setAppState('Idle')
  }

  const onActive = () => {
    setAppState('Active')
  }

  const onAction = () => {
    setCount(count + 1)
  }
  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: 300_000,
    throttle: 500
  })
  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000))
    }, 500)
    if(appState == "Idle"){
      alert("You have been idle for a long time!")
      axios.post("https://jsonplaceholder.typicode.com/posts",{})
      .then((response) => {
        console.log("Response from Axios on Idle State(Post): "+ JSON.stringify(response))
        console.log("data from axios (Post): "+response.data)
      })
      .catch((error) => console.log("error msg: "+error))
    }
    else{
      alert("Welcome Back Again!")
      axios.post("https://jsonplaceholder.typicode.com/posts",{})
      .then((response) => {
        console.log("Response from Axios on Active State(Post): "+ JSON.stringify(response))
        console.log("data from axios (Post): "+response.data)
      })
      .catch((error) => console.log("error msg: "+error))
    }
    console.log("App state: ",appState)
    return () => {
      clearInterval(interval)
    }
  },[appState])
// console.log("token value is (App.js): "+ kcToken)
//console.log("added Project details info: ",addProjectInfo)

  return (
    <>
      <Routes>
      <Route path='/Password' element = {
      <Password
        show = {passwordModel}
        onHide = {()=>setPasswordModel(false)}
        passwordModel = {passwordModel}
        passwordSetModel = {setPasswordModel}
      />
      }/>
        <Route path='/' element = 
        {
          <>
            <Header
            name = "Lindsey"
            fullName = "Lindsley Alisson"
            position = "UI Designer"
            profileImg = {Lindsley}
            setSearchBarValue = {setSearchBarInput}
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
                      <Button variant='primary' className='ProjectButton' onClick={()=>{
                        setModalShow(true)
                        axios.get("https://jsonplaceholder.typicode.com/posts")
                        .then((response) => {
                          console.log("Response from Axios before getting new project details(Get): "+ JSON.stringify(response))
                          console.log("data from axios (Get): "+response.data)
                        })
                        .catch((error) => console.log("error msg: "+error))
                        }}>
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
          searchValue = {searchVal}
          setSearchBarValue = {setSearchBarInput}
        />
      }/>
      <Route path='/UserDetails' element={
        <AuthContext.Provider value={{token: kcToken }}>
          <UserDetails
          show = {passwordModel}
          onHide = {()=>setPasswordModel(false)}
          token = {"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlU3NBaU81ZTFHUkJsNVJjbmZvR0hRc1lqZ2tvRGtxdURtT3BKMXM2VjYwIn0.eyJleHAiOjE2OTYxNjcyNTUsImlhdCI6MTY5NjE2Njk1NSwiYXV0aF90aW1lIjoxNjk2MTY1MDU0LCJqdGkiOiJmZjJhNTE0Mi1iZmVlLTQyYmUtYTg0Ni1iMDc3MDVjM2Q0ZTYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMva2FydGhpa3JlYWxtIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjJlOTE4Y2RhLWMwMTgtNDkyZS1hNWQ2LTIwNmVjNmU4N2Q3YyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJjYXV0aCIsIm5vbmNlIjoiNmQxZDlkZGUtMjZiYS00YzcwLWJmY2UtNjNjNmMyYmNjMTM5Iiwic2Vzc2lvbl9zdGF0ZSI6ImQ2OWRjZDMwLTc4ZGMtNGE0Ni1iYzczLTg4MmQ5N2IzM2U0YiIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJKb2huIERvZSIsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIxIiwibG9jYWxlIjoiZW4iLCJnaXZlbl9uYW1lIjoiSm9obiIsImZhbWlseV9uYW1lIjoiRG9lIiwiZW1haWwiOiJ1c2VyMUB0ZXN0LmdtYWlsLmNvbSJ9.Com1mwmaUYybozi3eC3x0uMqF8f6uu9_zljlzZRfPIHpcs_KxeJEHMZf5b-jhD8b-UcpF_enScSs2Xe85m08JsCo3iX-r6W3ywvUfkH085L6QgQ3aIrdbLlEoOwoDhRuBpV8nv7120C55OOVstO3WFcJESJ5u52VWBIKUjjlbz7PuIHyhzrTOEehVks69Je6UFtqzOYD5WRmG5xSmMRE1X3lm99gj8p94N9BE4kWY23uO1xC9lHmgwvAa-846OFR0a5-dZBmhItTKQNGE6VIHDdPeimI2HpaPXpK9ywQrxXf6jOTN-IyHgAG9TWixjs-KgRxAhXXNJjcXjm5WCf0oQ"}
          />
        </AuthContext.Provider>
      }>
      </Route>
      </Routes>
    </>
  )
}

