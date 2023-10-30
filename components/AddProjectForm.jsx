import {React} from 'react'
import { useState, useEffect} from 'react'
import {Form ,Button} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import newProjectInfoContext from '../src/contexts/newprojectInfoContext'

export default function AddProjectForm(props) {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const navigate = useNavigate()
  const templateAPIResponse = [
    {
        "id": 123,
        "name": "C++",
        "image": null,
        "type": null
    },
    {
        "id": 234,
        "name": "Python",
        "image": null,
        "type": null
    },
    {
        "id": 345,
        "name": "Java",
        "image": null,
        "type": null
    },
    {
        "id": 456,
        "name": "WebApp",
        "image": null,
        "type": null
    }
  ]

  const [validated ,setValidated] = useState(false)
  const [userName,setUserName] = useState("")
  const [projectName,setProjectName] = useState("")
  const [techUsed,setTechUsed] = useState("")
  const [userID,setUserID] = useState("")
  const [templateAPI_Response,settemplateAPI_Response] = useState(templateAPIResponse)

  const defaultValues = {
    projectName:"",
    userName: "",
    userID: "",
    projectSelect: 1,
    projectDesc: "",
  }
  const outputValues = {
    projectName:"",
    userName: "",
    userID: "",
    projectSelect: 1,
    projectDesc: "",
  }
  const startCodeBlockRequest = {
    "codeBlockId": "Project1",
    "userId":  props.getUserDetailsAPIResponse.id
  }
  const createCodeBlockRequest = {
    "projectName": "MissionAneesh",
    "projectDescription": "Trial project 1",
    "userId": props.getUserDetailsAPIResponse.id,
    "tempalteId": "1",
    "id": "Project1"
  }
  const addProjectAPIResponse = {
    action: "openedCodeBlock",
    projectId:{},
    url: "https://www.geeksforgeeks.org/",
    webAppUrl: "https://www.youtube.com/",
    type: "Cs/js/webapp",
  }
//   const connection = new signalR.HubConnectionBuilder()
//     .withUrl("/codehub")
//     .configureLogging(signalR.LogLevel.Information)
//     .build();

//     async function start() {
//         try {
//             await connection.start();
//             console.log("SignalR Connected.");
//         } catch (err) {
//             console.log(err);
//             setTimeout(start, 5000);
//         }
//     };
    // const createNewCodeBlock = async() => {
    //     try {
    //     //Request structure 
    //     const request = {
    //     "projectName": null,
    //     "projectDescription": null,
    //     "userId": null,
    //     "tempalteId": null,
    //     "id": null
    //     }
    //     await connection.invoke("CreateAndStartCodeBlock", request);
    //     } 
    //     catch (err) {
    //         console.error(err);
    //     }
    //  }
    useEffect(()=>{
        axios.get(`${baseUrl}api/template/all`)
          .then((response) => {
            console.log("Response from Axios for getting all projects of user(Get): "+ JSON.stringify(response))
            console.log("data from axios (Get): "+response.data)
          })
          .catch((error) => console.log("error msg: "+error))
      },[])

  const handleFormSubmit = (event) =>{
    alert("Form submitted")
    console.log("from submitted")
    const form = event.currentTarget;
    if(form.checkValidity() === false){
        event.preventDefault();
        event.stopPropagation();
    }
    setValidated(true);
  }
  const {register,handleSubmit,formState: {errors}} = useForm({defaultValues},)
  return (
    <Form noValidate onSubmit={
        handleSubmit(
        (data,event)=>{
            console.log(data)
            // setProjectName(d.projectName)
            // setTechUsed(d.projectSelect)
            outputValues.projectName = data.projectName
            outputValues.projectSelect = data.projectSelect
            outputValues.userID = data.userID
            outputValues.userName = data.userName
            console.log("project name -> ", outputValues.projectName)
            console.log("tech used -> ",outputValues.projectSelect)
            createCodeBlockRequest.projectName = data.projectName
            for (let i = 0; i <data.projectName.length; i++) {
                if(data.projectName[i] == '*' || data.projectName[i] == '&'){
                    alert('Special Characters are not allowed')
                }
            }
            createCodeBlockRequest.projectDescription = data.projectDesc
            createCodeBlockRequest.tempalteId = data.projectSelect
            createCodeBlockRequest.id = `${createCodeBlockRequest.projectName.toLowerCase()}-${createCodeBlockRequest.tempalteId}`
            // axios.post("https://jsonplaceholder.typicode.com/posts",{})
            // .then((response) => {
            //     console.log("Response from Axios after sending project details(Post): "+ JSON.stringify(response))
            //     console.log("data from axios (Post): " + response.data)
            // })
            // .catch((error) => console.log("error msg: "+error))
            // createNewCodeBlock
            alert("Form Submitted Successfully")
            if(data.projectSelect == "WebApp"){
                window.electronAPI?.sendWebURL(addProjectAPIResponse)
            }
            else{
                window.electronAPI?.sendURL(addProjectAPIResponse)
            }
            window.electronAPI?.createCodeBlock(createCodeBlockRequest)
            window.electronAPI?.startCodeBlock(startCodeBlockRequest)
        })
        } validated={validated}>
        <Form.Group>
            <Form.Label className='FormControlElementLabels'>Project Name</Form.Label>
            <Form.Control
                required
                type='text'
                placeholder='Enter Project Name'
                className='FormControlElements'
                onChange={(event) => setProjectName(event.target.value)}
                id = 'projectName'
                {
                    ...register('projectName',{
                    required: "ProjectName is required",
                    })
                }
            />
            {/* <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
            <Form.Control.Feedback type = "invalid">UserID is required</Form.Control.Feedback> */}
            {errors.projectName?.message &&  (
                <small className='errorMessage'>{errors.projectName.message}</small>
            )}
        </Form.Group>
        <Form.Group>
            <Form.Label className='FormControlElementLabels'>UserName</Form.Label>
            <Form.Control
                required
                type='text'
                placeholder='Enter UserName'
                className='FormControlElements'
                id = 'userName'
                onChange={(event) => setUserName(event.target.value)}
                {
                    ...register('userName',{
                        required: "UserName is required"
                    })
                }
            />
            {/* <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
            <Form.Control.Feedback type = "invalid">UserID is required</Form.Control.Feedback> */}
            {errors.userName?.message &&  (
                <small className='errorMessage'>{errors.userName.message}</small>
            )}
        </Form.Group>
        <Form.Group>
            <Form.Label className='FormControlElementLabels'>UserID</Form.Label>
            <Form.Control
                required
                type='text'
                placeholder='Enter UserID'
                className='FormControlElements'
                id = "userID"
                onChange={(event) => setUserID(event.target.value)}
                {
                    ...register('userID',{
                        required: "userID is required"
                    })
                }
            />
            {/* <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
            <Form.Control.Feedback type = "invalid">UserID is required</Form.Control.Feedback> */}
            {errors.userID?.message && (
                <small className='errorMessage'>{errors.userID.message}</small>
            )}
        </Form.Group>
        <Form.Group>
            <Form.Label className='FormControlElementLabels'>Project Technology Used</Form.Label>
            <Form.Select 
                className='FormControlElements' 
                id="projectSelect" 
                required 
                onChange={(event) => setTechUsed(event.target.value)}
                {
                    ...register('projectSelect',{
                        required: "Please select atleast one option"
                    })
                }>
                <option value={templateAPIResponse[0].id}>{templateAPIResponse[0].name}</option>
                <option value={templateAPIResponse[1].id}>{templateAPIResponse[1].name}</option>
                <option value={templateAPIResponse[2].id}>{templateAPIResponse[2].name}</option>
                <option value={templateAPIResponse[3].id}>{templateAPIResponse[3].name}</option>
            </Form.Select>
            {/* <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
            <Form.Control.Feedback type = "invalid">UserID is required</Form.Control.Feedback> */}
            {errors.projectSelect?.message && (
                <small className='errorMessage'>{errors.projectSelect.message}</small>
            )}
        </Form.Group>
        <Form.Group>
            <Form.Label className='FormControlElementLabels'>Project Description</Form.Label>
            <Form.Control
                required
                as = "textarea"
                rows={3}
                placeholder='Give a brief description of the project'
                className='FormControlElements'
                id="projectDesc"
                {
                    ...register('projectDesc',{
                        required: "Project Description is required"
                    })
                }
            />
            {/* <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
            <Form.Control.Feedback type = "invalid">UserID is required</Form.Control.Feedback> */}
            {errors.projectDesc?.message && (
                <small className='errorMessage'>{errors.projectDesc.message}</small>
            )}
        </Form.Group>
        <Form.Group>
            <Button type ="submit" variant='success' className='FormControlElementsButton'>Launch</Button>
        </Form.Group>
    </Form>
  )
}

