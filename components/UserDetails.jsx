import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome} from '@fortawesome/free-solid-svg-icons'
import {useForm} from 'react-hook-form'

export default function UserDetails(props) {
  const defaultValues = {
    discordUsername: "",
    githubUsername: "",
    azureDevopsUsername: "",
  }
  const {register,watch,handleSubmit,formState:{errors}} = useForm({defaultValues},)
  return (
    <>
    <Modal  
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
          <Form.Group>
            <Form.Label className='FormControlElementLabels'>Discord UserName</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Enter Your Discord Username'
              className='FormControlElements'
              id='discordUsername'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className='FormControlElementLabels'>GitHub UserName</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Enter Your GitHub Username'
              className='FormControlElements'
              id='githubUsername'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className='FormControlElementLabels'>Azure Devops UserName</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Enter Your Azure Devops Username'
              className='FormControlElements'
              id='azureDevopsUsername'
            />
          </Form.Group>
          <Form.Group>
              <Button type='submit' variant='success' className='FormControlElementsButton'>Submit</Button>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className='MyModalFooter'>
            <Link to = '/'><Button onClick={props.onHide} variant='warning' className = "MyModalFooterButton">
            <FontAwesomeIcon icon={faHome}/>  Home</Button></Link>
        </Modal.Footer>
    </Modal>
    </>
  )
}
