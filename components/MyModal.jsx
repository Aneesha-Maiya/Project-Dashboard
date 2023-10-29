import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import AddProjectForm from './AddProjectForm'
import AddTasksForm from './AddTasksForm'

export default function MyModal(props) {
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
            {props.display == "ProjectForm" &&  <Modal.Title className ='MyModalHeader'>Add Project Form</Modal.Title>}
            {props.display == "TasksForm" &&  <Modal.Title className ='MyModalHeader'>Add Tasks Form</Modal.Title>}
        </Modal.Header>
        <Modal.Body className='MyModalBody'>
            {props.display == "ProjectForm" && <AddProjectForm
                 getUserDetailsAPIResponse = {props.getUserDetailsAPIResponse}
            />}
            {props.display == "TasksForm" && <AddTasksForm
                changeTasksList = {props.changeTasksList}
            />}
        </Modal.Body>
        <Modal.Footer className='MyModalFooter'>
            <Button onClick={props.onHide} variant='danger' className ='MyModalHeaderButton'>Close</Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}
