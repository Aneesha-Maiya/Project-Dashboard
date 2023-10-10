import {React} from 'react'
import { useState } from 'react'
import {Form ,Button} from 'react-bootstrap'
import {useForm} from 'react-hook-form'

import newProjectInfoContext from '../src/contexts/newprojectInfoContext'

export default function AddProjectForm() {
  const [validated ,setValidated] = useState(false)
  const [userName,setUserName] = useState("")
  const [projectName,setProjectName] = useState("")
  const [techUsed,setTechUsed] = useState("")
  const [userID,setUserID] = useState("")

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
  const addProjectAPIResponse = {
    action: "openedCodeBlock",
    projectId:{},
    url: "https://www.geeksforgeeks.org/",
    webAppUrl: "https://www.youtube.com/",
    type: "Cs/js/webapp",
  }
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
        (data)=>{
            console.log(data)
            // setProjectName(d.projectName)
            // setTechUsed(d.projectSelect)
            outputValues.projectName = data.projectName
            outputValues.projectSelect = data.projectSelect
            outputValues.userID = data.userID
            outputValues.userName = data.userName
            console.log("project name -> ", outputValues.projectName)
            console.log("tech used -> ",outputValues.projectSelect)
            if(data.projectSelect == "WebApp"){
                window.electronAPI.sendWebURL(addProjectAPIResponse)
            }
            else{
                window.electronAPI.sendURL(addProjectAPIResponse)
            }
            alert("Form Submitted Successfully")
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
                    required: "ProjectName is required"
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
                <option value="Java">Java</option>
                <option value="Python">Python</option>
                <option value="C++">C++</option>
                <option value="WebApp">Web App</option>
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
            <Button type ="submit" variant='success' className='FormControlElementsButton'>Submit</Button>
        </Form.Group>
    </Form>
  )
}

