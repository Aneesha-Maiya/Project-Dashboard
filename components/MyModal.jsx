import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import AddProjectForm from './AddProjectForm'

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
            <Modal.Title className ='MyModalHeader'>Add Project Form</Modal.Title>
        </Modal.Header>
        <Modal.Body className='MyModalBody'>
            <AddProjectForm
                 getUserDetailsAPIResponse = {props.getUserDetailsAPIResponse}
            />
        </Modal.Body>
        <Modal.Footer className='MyModalFooter'>
            <Button onClick={props.onHide} variant='danger' className ='MyModalHeaderButton'>Close</Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}
