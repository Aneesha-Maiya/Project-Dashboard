import React, { useState, useRef, useEffect, useContext } from 'react'
import Calendar from 'react-calendar'
import {Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus,faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {Routes,Route,Link,useNavigate} from "react-router-dom"
import {useIdleTimer} from "react-idle-timer"
import Keycloak from 'keycloak-js'
import axios from 'axios'
import signalR from '@microsoft/signalr/dist/browser/signalr'
import {HubConnectionBuilder,LogLevel } from '@microsoft/signalr'

import ProjectData from './Project.json'
import TasksData from './tasks.json'
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
import Example from '../components/example'
import getUserDetails from './API/getUserDetails'
import getAllProjectInfo from './API/getAllProjectInfo'
import AddTasksForm from '../components/AddTasksForm'

import Lindsley from '../image/Lindsley.jfif'
import Aaron from '../image/Aaron.jfif'
import Brian from '../image/Brian.jfif'
import Jessica from '../image/Jessica.jfif'
import Amelia from '../image/Amelia.jpg'

// import Fintech from '../image/Fintech.jfif'
// import DribbleShot from '../image/DribbleShot.avif'
// import UiKit from '../image/UiKit.jfif'
// import SmartCity from '../image/SmartCity.jpg'
// const keyCloak = new Keycloak('/keycloak.json')
const keyCloak = new Keycloak({
  url: "http://15.207.145.148:8080/",
  realm: "Perspectify",
  clientId: "FrontEndAuth"
});
export default function App() {
const TaskArray = TasksData
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
const processUserLoginAPIRequest = {
  "newLogin": false,
  "datasRequired": null,
  "userRole": "Admin"
}
const getUserDetailsAPIResponse ={
  "userName": "Lindsley Alison",
  "id":"LA2345",
  "email": null
}
const stopCodeBlockRequest = {
  "codeBlockId": "Project1",
  "userId": getUserDetailsAPIResponse.id
}
const startCodeBlockRequest = {
  "codeBlockId": "Project1",
  "userId": getUserDetailsAPIResponse.id
}
const [task,setTask] = useState(TaskArray);
const [project,setProject] = useState(ProjectData);
const [teamMember,setteamMember] = useState(teamMembersArray);
const [dateValue,setDateValue] = useState(new Date());
const [userName,setUserName] = useState(getUserDetailsAPIResponse.userName);
const [modalShow,setModalShow] = useState(false);
const [passwordModel,setPasswordModel] = useState(true);
const [loggedIn, setIsLoggedIn] = useState(false);
const [searchVal,setSearchVal] = useState("")
const [kcToken,setkcToken] = useState("") 
const [appState,setAppState] = useState("Active")
const [count,setCount] = useState(0)
const [remaining,setRemaining] = useState(0)
const [newLogin, setNewLogin] = useState(processUserLoginAPIRequest.newLogin)
const [startCode_BlockRequest,setStartCode_BlockRequest] = useState(startCodeBlockRequest)
const [stopCode_BlockRequest,setstopCode_BlockRequest] = useState(stopCodeBlockRequest)
const [modelDisplay,setModelDisplay] = useState("")
const [editTaskId,setEditTaskId] = useState(0)

const addProjectInfo = useContext(newProjectInfoContext)
const baseUrl = import.meta.env.VITE_BASE_URL
let x,y,z
const navigate = useNavigate()
// function changeLoginValue(value){
//   setNewLogin(value)
// }

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
const baseURL = import.meta.env.VITE_BASE_URL
const checkKeyloak = async () => {
  try {
    const authenticated = await keyCloak.init({onLoad:"login-required"});
    console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
    console.log("client", keyCloak);
    setkcToken(keyCloak.token)
    console.log("keycloak token value is",keyCloak.token )
    console.log("keycloak token value is",kcToken)
  } catch (error) {
    console.error('Failed to initialize adapter:', error);
  }
}
const isCalled = useRef(false);
useEffect(() => async()=>{
  if (isCalled.current)
    return;
  isCalled.current = true;
   await checkKeyloak();
   console.log("keycloak token before api call",keyCloak.token)
   window.electronAPI?.sendKeyCloakToken(keyCloak.token)
   axios.post(`${baseURL}api/User/ProcessUserLogin?token=${keyCloak.token}`,)
      .then((response) => {
        console.log("Response from Axios after receiving token(Post): "+ JSON.stringify(response))
        console.log("data from axios (Post): "+JSON.stringify(response.data))
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
  useEffect(getAllProjectInfo,[])
  useEffect(()=>{
    const getAllProjectInfoAPIResponse = ProjectData
    setProject(getAllProjectInfoAPIResponse)
  },[])
  useEffect(getUserDetails,[])
  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000))
    }, 500)
    if(appState == "Idle"){
      alert("You have been idle for a long time!")
      // axios.post(`${baseURL}api/v0/`,{})
      // .then((response) => {
      //   console.log("Response from Axios on Idle State(Post): "+ JSON.stringify(response))
      //   console.log("data from axios (Post): "+response.data)
      // })
      // .catch((error) => console.log("error msg: "+error))
      window.electronAPI?.stopCodeBlock(stopCode_BlockRequest)
    }
    else{
      alert("Welcome Back Again!")
      // axios.post(`${baseURL}api/v0/`,{})
      // .then((response) => {
      //   console.log("Response from Axios on Active State(Post): "+ JSON.stringify(response))
      //   console.log("data from axios (Post): "+response.data)
      // })
      // .catch((error) => console.log("error msg: "+error))
       window.electronAPI?.startCodeBlock(startCode_BlockRequest)
       window.electronAPI?.processUserLogin(processUserLoginAPIRequest)
    }
    console.log("App state: ",appState)
    return () => {
      clearInterval(interval)
    }
  },[appState])
// console.log("token value is (App.js): "+ kcToken)
//console.log("added Project details info: ",addProjectInfo)
useEffect(()=>{
  const testEnv = import.meta.env.VITE_TEST_VAR
  console.log("Test env variable is: ",testEnv)
},[])
// const connection = new signalR.HubConnectionBuilder()
// .withUrl("/codehub")
// .configureLogging(signalR.LogLevel.Information)
// .build();

// async function start() {
//     try {
//         await connection.start();
//         console.log("SignalR Connected.");
//     } catch (err) {
//         console.log(err);
//         setTimeout(start, 5000);
//     }
// };
//in app component did mount or global
// connection.on("LaunchedCodeBlock", (CodeBlockResponse) => {
//   //Response structure 
//   /*
//   {
//     "port": 0,
//     "url": null,
//     "appPortNumber": 0,
//     "action": "launchedCodeBlock",
//     "codeBlockId": null
//   }*/
//   //use this to open the url to codewindow and appurl in secondaryWindow
//   });
// function changeStartCodeblockResponse(value){
//     setStartCode_BlockRequest({
//       // ...startCode_BlockRequest,
//       userId: getUserDetailsAPIResponse.id,
//       codeBlockId: value
//     })
//   console.log("Updated state value from projects page after clicking launch button")
//   window.electronAPI?.startCodeBlock(startCode_BlockRequest)
// }
function changeTasksList(value1,value2){
  const newTasks = {
    "name" : value1,
    "duration": value2,
    "isCompleted": false
  }
  setTask([...task,newTasks])
}

function setEditTasksValues(value1){
  setModalShow(true)
  setEditTaskId(value1)
  setModelDisplay("EditTasksForm")
  // alert(editTaskId)
}
function editTasksList(value1,value2){
  alert(editTaskId)
  task[editTaskId].name = value1
  task[editTaskId].duration = value2
}
  return (
    <>
      <Routes>
      {/* {processUserLoginAPIRequest.newLogin == true ? 
         <Route path='/Password' element = {
            <Password
              show = {passwordModel}
              onHide = {()=>setPasswordModel(false)}
              passwordModel = {passwordModel}
              passwordSetModel = {setPasswordModel}
              processUserLoginAPIRequest = {processUserLoginAPIRequest}
            /> 
          }/> 
       :  */}
      <>
      {/* <Route path='/Password' element = {
      <Password
        show = {passwordModel}
        onHide = {()=>setPasswordModel(false)}
        passwordModel = {passwordModel}
        passwordSetModel = {setPasswordModel}
        processUserLoginAPIRequest = {processUserLoginAPIRequest}
      />
      }/> */}
      <Route path='/Password' element = {
      <Password
        show = {passwordModel}
        onHide = {()=>setPasswordModel(false)}
        passwordModel = {passwordModel}
        passwordSetModel = {setPasswordModel}
        processUserLoginAPIRequest = {processUserLoginAPIRequest}
        // newLoginAPI = {processUserLoginAPIRequest.newLogin}
        // changeNewLogin = {()=>changeLoginValue(value)}
      />
      }/>
      <Route path='/UserDetails' element={
        <AuthContext.Provider value={{token: kcToken }}>
          <UserDetails
          show = {passwordModel}
          onHide = {()=>setPasswordModel(false)}
          token = {"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlU3NBaU81ZTFHUkJsNVJjbmZvR0hRc1lqZ2tvRGtxdURtT3BKMXM2VjYwIn0.eyJleHAiOjE2OTYxNjcyNTUsImlhdCI6MTY5NjE2Njk1NSwiYXV0aF90aW1lIjoxNjk2MTY1MDU0LCJqdGkiOiJmZjJhNTE0Mi1iZmVlLTQyYmUtYTg0Ni1iMDc3MDVjM2Q0ZTYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMva2FydGhpa3JlYWxtIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjJlOTE4Y2RhLWMwMTgtNDkyZS1hNWQ2LTIwNmVjNmU4N2Q3YyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJjYXV0aCIsIm5vbmNlIjoiNmQxZDlkZGUtMjZiYS00YzcwLWJmY2UtNjNjNmMyYmNjMTM5Iiwic2Vzc2lvbl9zdGF0ZSI6ImQ2OWRjZDMwLTc4ZGMtNGE0Ni1iYzczLTg4MmQ5N2IzM2U0YiIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJKb2huIERvZSIsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIxIiwibG9jYWxlIjoiZW4iLCJnaXZlbl9uYW1lIjoiSm9obiIsImZhbWlseV9uYW1lIjoiRG9lIiwiZW1haWwiOiJ1c2VyMUB0ZXN0LmdtYWlsLmNvbSJ9.Com1mwmaUYybozi3eC3x0uMqF8f6uu9_zljlzZRfPIHpcs_KxeJEHMZf5b-jhD8b-UcpF_enScSs2Xe85m08JsCo3iX-r6W3ywvUfkH085L6QgQ3aIrdbLlEoOwoDhRuBpV8nv7120C55OOVstO3WFcJESJ5u52VWBIKUjjlbz7PuIHyhzrTOEehVks69Je6UFtqzOYD5WRmG5xSmMRE1X3lm99gj8p94N9BE4kWY23uO1xC9lHmgwvAa-846OFR0a5-dZBmhItTKQNGE6VIHDdPeimI2HpaPXpK9ywQrxXf6jOTN-IyHgAG9TWixjs-KgRxAhXXNJjcXjm5WCf0oQ"}
          newLoginAPI = {processUserLoginAPIRequest.newLogin}
          changeNewLogin = {(value)=>setNewLogin(value)}
          userInfo = {teamMembersArray}
          getUserDetailsAPIResponse = {getUserDetailsAPIResponse}
          />
        </AuthContext.Provider>
      }>
      </Route> 
        <Route path='/' element = 
        {
          newLogin == false ?
          <>
            <Header
            name = {getUserDetailsAPIResponse.userName}
            fullName = {getUserDetailsAPIResponse.userName}
            // position = "UI Designer"
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
                      task.map((item,index) =>{
                      if (index <= 5) {
                        return(
                          <TaskPanel
                            tasks = {item}
                            taskName = {item.name}
                            taskStatus = {item.isCompleted}
                            changeStatus = {() => {checkTask(index)}}
                            setEditTasksValues = {() => {setEditTasksValues(index)}}
                          />
                        )
                      }
                      })
                    }
                      <div className='TaskListButtons'>
                        <Button variant='primary' className='AddTasksButton'
                          onClick={()=>{
                            setModalShow(true)
                            setModelDisplay("TasksForm")
                            //navigate('/AddTasksForm')
                          }}
                        >
                        <FontAwesomeIcon icon={faPlus} className='ProjectButtonIcon'/>Add New Tasks</Button>
                        {/* <Button variant='primary' className='AddTasksButton'
                        onClick={()=>{
                          setModalShow(true)
                          setModelDisplay("EditTasksForm")
                          //navigate('/AddTasksForm')
                        }}
                        >
                        <FontAwesomeIcon icon={faPenToSquare} className='ProjectButtonIcon'/>Edit Tasks Details</Button> */}
                      </div>
                     {/* <MyModal
                          show = {modalShow}
                          onHide = {()=>setModalShow(false)}
                          getUserDetailsAPIResponse = {getUserDetailsAPIResponse}
                          display = "TasksForm"
                    /> */}
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
                  <Link to="/example"><a href='#'><p>Example</p></a></Link>
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
                            projectTech = {item.projectTech}
                            url = {item.url}
                            webUrl = {item.webUrl}
                            createrId = {item.createrId}
                            description = {item.description}
                            templateId = {item.templateId}
                            repo = {item.repo}
                            vmId = {item.vmId}
                            containerId = {item.containerId}
                            currentUser = {userName}
                            // changeStartCodeblockResponse = {(value)=>changeStartCodeblockResponse(value)}
                            getUserDetailsAPIResponse = {getUserDetailsAPIResponse}
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
                        setModelDisplay("ProjectForm")
                        // axios.get(`${baseURL}api/v0/`)
                        // .then((response) => {
                        //   console.log("Response from Axios before getting new project details(Get): "+ JSON.stringify(response))
                        //   console.log("data from axios (Get): "+response.data)
                        // })
                        // .catch((error) => console.log("error msg: "+error))
                        }}>
                        <FontAwesomeIcon icon={faPlus} className='ProjectButtonIcon'/>Add New Projects</Button>
                        <MyModal
                          show = {modalShow}
                          onHide = {()=>setModalShow(false)}
                          getUserDetailsAPIResponse = {getUserDetailsAPIResponse}
                          changeTasksList = {(value1,value2)=>{changeTasksList(value1,value2)}}
                          editTasksList = {(value1,value2)=>{editTasksList(value1,value2)}}
                          display = {modelDisplay}
                        />
                      <Button variant='primary' className='ProjectButton'>
                        <FontAwesomeIcon icon={faPenToSquare} className='ProjectButtonIcon'/>Edit Project Info</Button>
                </div>
              </div>
            </div>
          </>
          : 
          <AuthContext.Provider value={{token: kcToken }}>
          <UserDetails
          show = {passwordModel}
          onHide = {()=>setPasswordModel(false)}
          token = {"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlU3NBaU81ZTFHUkJsNVJjbmZvR0hRc1lqZ2tvRGtxdURtT3BKMXM2VjYwIn0.eyJleHAiOjE2OTYxNjcyNTUsImlhdCI6MTY5NjE2Njk1NSwiYXV0aF90aW1lIjoxNjk2MTY1MDU0LCJqdGkiOiJmZjJhNTE0Mi1iZmVlLTQyYmUtYTg0Ni1iMDc3MDVjM2Q0ZTYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMva2FydGhpa3JlYWxtIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjJlOTE4Y2RhLWMwMTgtNDkyZS1hNWQ2LTIwNmVjNmU4N2Q3YyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJjYXV0aCIsIm5vbmNlIjoiNmQxZDlkZGUtMjZiYS00YzcwLWJmY2UtNjNjNmMyYmNjMTM5Iiwic2Vzc2lvbl9zdGF0ZSI6ImQ2OWRjZDMwLTc4ZGMtNGE0Ni1iYzczLTg4MmQ5N2IzM2U0YiIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJKb2huIERvZSIsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIxIiwibG9jYWxlIjoiZW4iLCJnaXZlbl9uYW1lIjoiSm9obiIsImZhbWlseV9uYW1lIjoiRG9lIiwiZW1haWwiOiJ1c2VyMUB0ZXN0LmdtYWlsLmNvbSJ9.Com1mwmaUYybozi3eC3x0uMqF8f6uu9_zljlzZRfPIHpcs_KxeJEHMZf5b-jhD8b-UcpF_enScSs2Xe85m08JsCo3iX-r6W3ywvUfkH085L6QgQ3aIrdbLlEoOwoDhRuBpV8nv7120C55OOVstO3WFcJESJ5u52VWBIKUjjlbz7PuIHyhzrTOEehVks69Je6UFtqzOYD5WRmG5xSmMRE1X3lm99gj8p94N9BE4kWY23uO1xC9lHmgwvAa-846OFR0a5-dZBmhItTKQNGE6VIHDdPeimI2HpaPXpK9ywQrxXf6jOTN-IyHgAG9TWixjs-KgRxAhXXNJjcXjm5WCf0oQ"}
          newLoginAPI = {processUserLoginAPIRequest.newLogin}
          changeNewLogin = {(value)=>setNewLogin(value)}
          userInfo = {teamMembersArray}
          getUserDetailsAPIResponse = {getUserDetailsAPIResponse}
          />
          </AuthContext.Provider>
        }
        />
      <Route path='/AllProjects' element = 
      {
        <AllProjects
          project = {project}
          currentUser = {userName}
          searchValue = {searchVal}
          setSearchBarValue = {setSearchBarInput}
          getUserDetailsAPIResponse = {getUserDetailsAPIResponse}
        />
      }/>
      <Route path = '/example' element = {
        <>
          <Example/>
        </>
      }> 
      </Route>
      <Route path='/AddTasksForm' element={
        <AddTasksForm
        />
      }>
      </Route>
      </>
      </Routes>
    </>
  )
}

