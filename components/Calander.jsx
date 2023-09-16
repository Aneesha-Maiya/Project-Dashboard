import React from 'react'
import  Calendar from 'react-calendar'
import '../src/MyCalendar.css'

export default function Calander(props) {
  let dateValue = props.dateValue 
  return (
      <div className='CalanderContent'>
          <Calendar  onChange = {props.onChangeEvent} value={dateValue}/>
      </div>
  )
}
