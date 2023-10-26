import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Project from './Project'
import {useEffect,useState} from 'react'
import '../src/index.css'
import axios from 'axios'

import Lindsley from '../image/Lindsley.jfif'

export default function AllProjects(props) {
  let otherProject = []
  let projectItem = props.project
  const baseUrl = import.meta.env.VITE_BASE_URL
  const [sharedProjects,setSharedProjects] = useState({})
  const [sharedProjects1,setSharedProjects1] = useState(otherProject)
  const [projectsSearched,setProjectsSearched] = useState(projectItem)
  // useEffect(()=>{
  //   let data = new Map();
  //   for (let i = 0; i < props.project.length; i++) {
  //     if(props.project[i].sharedBy != null){
  //       if(data.has(props.project[i].sharedBy.userID)){
  //         data[props.project[i].sharedBy.userID].projects.push(props.project[i])
  //       }
  //       else{
  //         data.set(props.project[i].sharedBy.userID,{
  //           name: props.project[i].sharedBy.userName,
  //           projects: [props.project[i]]
  //         })
  //       }
  //     }
  //   }
  //   setSharedProjects(data)
  // },[props.project])
  // console.log("Shared Project-"+sharedProjects)
  
  let nameList = []
  function checkName(index){
    for (let i = index; i < projectItem.length; i++) {
      let currentName = projectItem[i].sharedBy.userName
      let check = true
      nameList.push(currentName)
      for (let j = i+1; j < projectItem.length; j++) {
        if(projectItem[j].sharedBy.userName == currentName){
          check = false
          break
        }
      }
      if(check == false){
        nameList.pop()
      }
    }
  }
  checkName(4)
  // for (let i = 0; i < nameList.length; i++) {
  //   console.log(nameList[i] + i)
  // }
  // console.log("---End---")
  function showItems(){
    for (let i = 0; i < nameList.length; i++) {
      let currentItem = nameList[i]
      console.log("Projects of "+currentItem)
      for (let j = 0; j < projectItem.length; j++) {
        if(projectItem[j].sharedBy.userName == currentItem){
          console.log(projectItem[j].name)
        }
      }
    }
  }
  function addOtherProjects(){
    for (let i = 0; i < nameList.length; i++) {
      let pushObject = {
        name: "",
        project: []
      }
      let currentName = nameList[i]
      pushObject.name = currentName
      for (let j = 0; j < projectItem.length; j++) {
        if(projectItem[j].sharedBy.userName == currentName){
          pushObject.project.push(projectItem[j])
        }
      }
      otherProject.push(pushObject)
    }
  }
  addOtherProjects()
  // console.log("OtherProject- ",otherProject)
  // console.log("---Finish---")
  useEffect(()=>{
    function setSearchedProjectList(){
      if(props.searchValue === ""){
        console.log("SearchValue is Blank")
        return;
      }
      const filterBySearch = projectItem.filter((Item) => {
        if(Item.name.toLowerCase().includes(props.searchValue.toLowerCase())){
          return Item
        }
      })
      setProjectsSearched(filterBySearch)
      console.log("Searched project: "+JSON.stringify(projectsSearched))
      console.log("Search Value is:"+props.searchValue)
    }
    setSearchedProjectList()
  },[props.searchValue])
  // const searchedProjectDisplay = () => {
  //   alert("Search display")
  //   return (
  //   <div className = 'TaskContent'>
  //   <div className='TaskContentBottomHeading'>
  //     <h1>Search Results for {props.searchValue}</h1>
  //   </div>
  //   </div> )
  // }
  useEffect(()=>{
    axios.get(`${baseUrl}/api/User/CodeBlock/GetAll`)
      .then((response) => {
        console.log("Response from Axios for getting all projects of user(Get): "+ JSON.stringify(response))
        console.log("data from axios (Get): "+response.data)
      })
      .catch((error) => console.log("error msg: "+error))
  },[])
  return (
    <>
        <Header 
        name = "Lindsey"
        fullName = "Lindsley Alison"
        position = "UI Designer"
        profileImg = {Lindsley}
        setSearchBarValue = {props.setSearchBarValue}
        />
        <div className='MainContent' >
            <Sidebar
                project = {props.project}
            />
            {props.searchValue == "" ? <div className = 'TaskContent'>
              <div className='TaskContentBottomHeading'>
                <h1>My Projects</h1>
              </div>
              <div className='TaskContentBottomAllProject'>
                {
                  projectItem.map((item,index)=>
                  {
                    if(item.sharedBy.userName == props.currentUser){
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
                          currentUser = {props.currentUser}
                        />
                      ) //return
                    } //if
                  } //callback function braces
                 ) //map function
                }
              </div>
              <div className='TaskContentBottomHeading'>
                <h1>Other Projects</h1>
              </div>
              {/* sharedProjects.keys().map((uid,index)=>{
                    let item = sharedProjects.get(uid)
                    console.log(item)
              }) */}
              {
                otherProject.map((item,index)=>(
                <>
                  <div className='TaskContentBottomNameHeading'>
                    <h1>Projects Shared By {item.name}</h1>
                  </div> 
                  <div className='TaskContentBottomOthersProject'>
                    {
                      item.project.map((item2,index2)=>(
                            <Project
                                name = {item2.name}
                                deadline = {item2.deadline}
                                numberOfTasks = {item2.numberOfTasks}
                                numberOfTasksCompleted = {item2.numberOfTasksCompleted}
                                numberOfMembers = {item2.numberOfMembers}
                                id = {item2.id}
                                favorite = {item2.isFavorite}
                                logo = {item2.logo}
                                sharedBy = {item2.sharedBy}
                                projectTech = {item2.projectTech}
                                url = {item2.url}
                                webUrl = {item2.webUrl}
                                createrId = {item2.createrId}
                                description = {item2.description}
                                templateId = {item2.templateId}
                                repo = {item2.repo}
                                vmId = {item2.vmId}
                                containerId = {item2.containerId}
                                currentUser = {props.currentUser}
                            />
                        )
                      )
                    }
                  </div>
                </>
                )
                )
              }
              <div className='TaskContentBottomAllProject'>
              {/* {showItems()} */}
              </div>
            </div> : 
              <div className = 'TaskContent'>
                <div className='TaskContentBottomHeading'>
                  <h1>Search Results for '{props.searchValue}'</h1>
                </div>
                {projectsSearched.length > 0 ? <div className='TaskContentBottomAllProject'>
                {
                  projectsSearched.map((item,index)=>{
                    return(
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
                        currentUser = {props.currentUser}
                      /> 
                    )
                  })
                }
                </div> : 
                  <div className='TaskContentBottomHeadingMessage'>
                  <h1>No Search Result found for '{props.searchValue}'! </h1>
                  </div>
                }
              </div>
            }
        </div>
    </>
  )
}

// function searchedProjectDisplay(){
//   return(
//     <div className='TaskContentBottomHeading'>
//       <h1>Search Results</h1>
//     </div>
//   )
// }