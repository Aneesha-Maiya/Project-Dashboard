import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {Link,useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome} from '@fortawesome/free-solid-svg-icons'
import {useForm} from 'react-hook-form'

const APIResponse = new Map()
APIResponse.set("NewLogin",true)
APIResponse.set("ToolNameRequired",["discord","github"])
APIResponse.set("UserRole","Member/Admin")

let ToolNameRequiredArray = []
let DiscordReq = false
let GithubReq = false
let AzureReq = false
let LoginDone = false

APIResponse.forEach((value,key) => {
  console.log(`${key} = ${value}`);
  console.log(value)
  if(key=="ToolNameRequired"){  
    ToolNameRequiredArray = value
  }
  if(key=="NewLogin"){
    LoginDone = value
  }
});

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

export default function UserDetails(props) {
  const defaultValues = {
    discordUsername: "",
    githubUsername: "",
    azureDevopsUsername: "",
  }
  const navigate = useNavigate()
  const {register,watch,handleSubmit,formState:{errors}} = useForm({defaultValues},)
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
                    alert("Details updated successfully!")
                    console.log(d)
                    // navigate('/')
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
            <Link to = '/'><Button onClick={props.onHide} variant='warning' className = "MyModalFooterButton">
            <FontAwesomeIcon icon={faHome}/>  Home</Button></Link>
        </Modal.Footer>
    </Modal> : navigate('/')}
    </>
  )
}
