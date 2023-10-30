import React from 'react'
import {Modal,Form ,Button} from 'react-bootstrap'
import {useForm} from 'react-hook-form'


export default function AddTasksForm(props) {
  const defaultValues = {
    taskName: "",
    deadline:  new Date().toJSON().slice(0, 10)
  }
  const {register,handleSubmit,formState: {errors}} = useForm({defaultValues},)
  return (
        <Form noValidate onSubmit={
            handleSubmit(
            (data)=>{
                console.log(data)
                props.editTasksList(data.taskName,data.deadline)
            })
        }>
            <Form.Group>
                <Form.Label className='FormControlElementLabels'>Edit Tasks Name</Form.Label>
                <Form.Control 
                    required
                    type='text'
                    placeholder='Enter new Tasks Name'
                    className='FormControlElements'
                    id = 'taskName'
                    {
                        ...register('taskName',{
                            required: "Tasks Name is required"
                        })
                    }
                />
                {errors.taskName?.message && (
                    <small className='errorMessage'>{errors.taskName.message}</small>
                )}
            </Form.Group>
            <Form.Group>
                <Form.Label className='FormControlElementLabels'>Edit Deadline</Form.Label>
                <Form.Control 
                    required
                    type='date'
                    className='FormControlElements'
                    id = 'deadline'
                    {
                        ...register('deadline',{
                            required: "Deadline is required"
                        })
                    }
                />
                {errors.deadline?.message && (
                    <small className='errorMessage'>{errors.deadline.message}</small>
                )}
            </Form.Group>
            <Form.Group>
                <Button type ="submit" variant='success' className='FormControlElementsButton'>Submit</Button>
            </Form.Group>
        </Form>
  )
}
