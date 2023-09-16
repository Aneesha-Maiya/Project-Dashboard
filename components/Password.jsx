import React from 'react'
import {useRef, useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {Link,useNavigate} from 'react-router-dom'
import {set, useForm} from 'react-hook-form'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye,faHome} from '@fortawesome/free-solid-svg-icons';

export default function Password(props) {
  const defaultValues = {
    password: "",
    confirmPassword: "",
  }
  const [passwordShow, setPasswordShow] = useState(false)
  const {register,handleSubmit,formState: {errors},watch} = useForm({defaultValues},);
  const password = useRef("")
  password.current = watch("password","")
  const navigate = useNavigate()
  const togglePasswordVisiblity = () =>{
    setPasswordShow(passwordShow ? false : true)
  }
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
            <Modal.Title className ='MyModalHeader'>Password Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit = {
            handleSubmit(
              (d)=>{
                  props.passwordSetModel(true)
                  console.log(d)
                  navigate('/UserDetails')
              }
            )
          }>
            <Form.Group>
              <Form.Label className='FormControlElementLabels'>Password</Form.Label>
              <Form.Control
                required
                type={passwordShow ? "text" : "password"}
                placeholder='Enter Password'
                className='FormControlElements'
                id='password'
                {
                  ...register('password',{
                    required: "Password is required",
                    // validate: {
                    //   minLenght : (v) => v.length >= 8 || "Password should contain minimum 8 characters"
                    // },
                    minLength: {
                      value: 4,
                      message: "Password should contain minimum 8 characters"
                    }
                  })
                }
              />
              <p className='TogglePassword'>Show Password  <FontAwesomeIcon icon={faEye} 
              onClick={togglePasswordVisiblity}/></p>
              {errors.password?.message && (
                <small className='errorMessage'>{errors.password.message}</small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label className='FormControlElementLabels'>Confirm Password</Form.Label>
              <Form.Control
                required
                type={passwordShow ? "text" : "password"}
                placeholder='ReEnter your password'
                className='FormControlElements'
                id='confirmPassword'
                {
                  ...register('confirmPassword',{
                    required: "Confirming password is necessary",
                    validate: {
                      value: (val) => val === password.current || "Passwords do not match"
                    }
                  })
                }
              />
              <p className='TogglePassword'>Show Password  <FontAwesomeIcon icon={faEye} 
              onClick={togglePasswordVisiblity}/></p>
              {errors.confirmPassword?.message && (
                <small  className='errorMessage'>{errors.confirmPassword.message}</small>
              )}
            </Form.Group>
            <Form.Group>
              <Button type='submit' variant='success' className='FormControlElementsButton'>Submit</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='MyModalFooter'>
            <Link to = '/'><Button onClick={()=>{props.onHide}} 
            variant='warning' className = "MyModalFooterHomeButton">
           <FontAwesomeIcon icon={faHome}/> Home</Button></Link>
        </Modal.Footer>
    </Modal>
    </>
  )
}
