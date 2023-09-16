import React from 'react'
import Tasks from './Tasks'
export default function TaskPanel(props) {
  const task = props.tasks
  return (
        <Tasks 
          taskName = {task.name}
          taskDuration = {task.duration}
          taskStatus = {task.isCompleted}
          changeStatus = {props.changeStatus}
        />
  )
}
    