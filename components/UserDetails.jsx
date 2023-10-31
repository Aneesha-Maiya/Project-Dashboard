import React, { useEffect, useState,useContext} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {Link,useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome} from '@fortawesome/free-solid-svg-icons'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import AuthContext from '../src/contexts/authContext'

import API_Response from '../src/APIResponse.json'
const baseUrl = import.meta.env.VITE_BASE_URL
//http://e82a-106-51-171-133.ngrok-free.app/
// const APIResponse = new Map()
// APIResponse.set("NewLogin",true)
// APIResponse.set("datasRequired",["discord","github"])
// APIResponse.set("userRole","Member/Admin")

let ToolNameRequiredArray = []

// APIResponse.forEach((value,key) => {
//   console.log(`${key} = ${value}`);
//   console.log(value)
//   if(key=="datasRequired"){  
//     ToolNameRequiredArray = value
//   }
//   if(key=="NewLogin"){
//     LoginDone = value
//   }
// });

var APIResponseFetch = []

let enteredValue = {
  discordUsername: "",
  githubUsername: "",
  azureDevopsUsername: "",
}
let testValue = {
  title: "ha",
  body: "haha",
}
let option = {
  method: 'POST',
  headers: {
    'Content-Type' : 'application/json; charset=UTF-8'
  },
  body: JSON.stringify(testValue),
}

for (let i = 0; i < ToolNameRequiredArray.length; i++) {
  if(ToolNameRequiredArray[i]=="discord" || ToolNameRequiredArray=="Discord"){
   DiscordReq = true
  }
  else if(ToolNameRequiredArray[i]=="github" || ToolNameRequiredArray=="Github"){
    GithubReq = true
  }
  else if(ToolNameRequiredArray[i]=="azure" || ToolNameRequiredArray=="Azure"){
    AzureReq = true
   }
}

const UserDetails = (props) => {
  const defaultValues = {
    discordUsername: "",
    githubUsername: "",
    azureDevopsUsername: "",
  }
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const {register,watch,handleSubmit,formState:{errors}} = useForm({defaultValues},)
  const [Response, setResponse] = useState(API_Response)
  let DiscordReq = false
  let GithubReq = false
  let AzureReq = false
  let LoginDone = Response[0].newLogin
  for (let i = 0; i < Response[0].datasRequired.length; i++) {
    if(Response[0].datasRequired[i].toLowerCase() == "discord"){
      DiscordReq = true
    }
    else if(Response[0].datasRequired[i].toLowerCase() == "github"){
      GithubReq = true
    }
    else if(Response[0].datasRequired[i].toLowerCase() == "azure"){
      AzureReq = true
    }
  }
//Getting data from baseUrl using async await
//   async function getDataAsync(){
//     const res = await fetch(`${baseUrl}api/User/ProcessUserLogin?token=${auth.token}`)
//     console.log("Response is: "+res)
//     // const data = await res.json()
//     // console.log("Data is : "+JSON.stringify(data))
//   }
//   getDataAsync()
// //Getting data from baseUrl using fetch then
// fetch(`${baseUrl}api/User/ProcessUserLogin?token=${auth.token}`)
// .then(res => {
//   console.log(res)
//   console.log("data :" + res.data)
// }).catch(error => {
//   console.log(error)
// })
//Getting data from baseUrl using axios
// useEffect(()=>{
//   axios.get(`${baseUrl}api/User/ProcessUserLogin?token=${auth.token}`)
//   .then((response) => {
//     console.log("Response from Axios(get): "+ JSON.stringify(response))
//     console.log("data from axios(get): "+response.data)
// })
//   .catch((error) => console.log("error msg: "+error))
// },[])
//Posting data to baseUrl using axios
function sendUpdatedUserDetails(){
  // useEffect(()=>{
    console.log(enteredValue.discordUsername)
  axios.put(`${baseUrl}api/User/UpdateUserDetails`,
  {
    "userName": props.getUserDetailsAPIResponse.userName,
    "userId": props.getUserDetailsAPIResponse.id,
    "tooluserName": [
      {
        toolname: "discord",
        username: enteredValue.discordUsername
      },
      { 
        toolname: Response[0].datasRequired[1] ?  Response[0].datasRequired[1] : "",
        username: enteredValue.discordUsername
      }
    ]
  })
  .then((response) => {
    console.log("Response from Axios (Post): "+ JSON.stringify(response))
    console.log("data from axios (Post): "+response.data)
})
  .catch((error) => console.log("error msg: "+error))
// },[])
}
useEffect(()=>{
  console.log("printing props.token "+auth.token)
},[])
  return (
    <>
    {LoginDone ? <Modal  
        show = {props.show}
        onHide={props.onHide}
        size='lg'
        centered
        className='MyModal'
    >
        <Modal.Header closeButton className ='MyModalHeader'>
            <Modal.Title className ='MyModalHeader'>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate onSubmit = {
              handleSubmit(
                (d)=>{
                    
                    enteredValue.discordUsername = d.discordUsername
                    enteredValue.githubUsername = d.githubUsername
                    enteredValue.azureDevopsUsername = d.azureDevopsUsername
                    testValue.title = d.discordUsername
                    testValue.body = d.githubUsername
                    console.log(d)
                    console.log(testValue)
                    // navigate('/')
                    // fetch('https://jsonplaceholder.typicode.com/posts',{
                    // method: 'POST',
                    // headers: {
                    //   'Content-Type' : 'application/json; charset=UTF-8'
                    // },
                    // body: JSON.stringify({
                    //   title: d.discordUsername,
                    //   body: d.githubUsername
                    // }),
                    // })
                    // .then(res => {
                    //   console.log(res.json())
                    // })
                    // .then( function(data){
                    //   console.log("Data after submit: "+ data)
                    // }
                    // )
                    // .catch(error => console.log(error))
                    // async () => {
                    //   try{
                    //     const res = await fetch('https://jsonplaceholder.typicode.com/posts',option,)
                    //     console.log(res)
                    //     const resData = await res.json()
                    //     console.log(resData);
                    //   }
                    //   catch(err){
                    //     console.log(err.message)
                    //   }
                    // }
                    sendUpdatedUserDetails()
                    props.changeNewLogin(!props.newLoginAPI)
                    alert(`Details updated successfully! before: ${props.newLoginAPI} after: ${!props.newLoginAPI}`)
                    alert(`${props.getUserDetailsAPIResponse.userName} and ${props.getUserDetailsAPIResponse.id}`)
                    navigate('/')
                }
              )
        }>
          {DiscordReq ? <Form.Group>
            <Form.Label className='FormControlElementLabels'>Discord UserName</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Enter Your Discord Username'
              className='FormControlElements'
              id='discordUsername'
              {
                ...register('discordUsername',{
                  required: "Discord username is required"
                })
              }
            />
          {errors.discordUsername?.message && (
            <small className='errorMessage'>{errors.discordUsername.message}</small>
          )}
          </Form.Group>: ""}
          {GithubReq ? <Form.Group>
            <Form.Label className='FormControlElementLabels'>GitHub UserName</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Enter Your GitHub Username'
              className='FormControlElements'
              id='githubUsername'
              {
                ...register('githubUsername',{
                  required: "GitHub username is required"
                })
              }
            />
            {errors.githubUsername?.message && (
            <small className='errorMessage'>{errors.githubUsername.message}</small>
          )}
          </Form.Group> : ""}
          {AzureReq ? <Form.Group>
            <Form.Label className='FormControlElementLabels'>Azure Devops UserName</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Enter Your Azure Devops Username'
              className='FormControlElements'
              id='azureDevopsUsername'
              {
                ...register('azureDevopsUsername',{
                  required: "AzureDevops Username is required"
                })
              }
            />
            {errors.azureDevopsUsername?.message && (
            <small className='errorMessage'>{errors.azureDevopsUsername.message}</small>
            )}
          </Form.Group> : ""}
          <Form.Group>
              <Button type='submit' variant='success' className='FormControlElementsButton'>Submit</Button>
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer className='MyModalFooter'>
            <Button onClick={()=>{
              props.onHide;
              props.changeNewLogin(!props.newLoginAPI);
              if(props.newLoginAPI == true){
                alert("Please submit details first")
                navigate('/UserDetails')
              }
              else{
                alert(`before: ${props.newLoginAPI} after: ${!props.newLoginAPI}`)
                navigate('/')
              }
            }}
            variant='warning' className = "MyModalFooterButton">
            <FontAwesomeIcon icon={faHome}/>  Home</Button>
        </Modal.Footer>
    </Modal> : 
    <div className="LoginNotDone">
        <p>Please Login First!</p>
        <Link to = '/'><Button onClick={props.onHide} variant='warning' className = "MyModalFooterButton">
        <FontAwesomeIcon icon={faHome}/>  Login</Button></Link>
    </div>}
    </>
  )
}

export default UserDetails