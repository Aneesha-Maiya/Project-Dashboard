import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header(props) {
  const navigate = useNavigate()
  return (
    <div className='HeaderContent'>
      <h3 className='CompanyName'><i class = "fa fa-bolt"/>Krejo </h3>
      <div className='Greeting'>
          <h2>Hi {props.name}</h2>
          <p>Keep up the good work!</p>
      </div>
      <div className='SearchBar'>
        <button onClick={()=>{
          alert('clicked')
          navigate('/AllProjects')
        }}><i class = "fa fa-search"></i></button>
        <input type='text' placeholder='Search your project,task,etc...'/>
      </div>
      <div className='UserInfo'>
          <img src = {props.profileImg} alt=''/>
          <div className='UserBio'>
            <h3>{props.fullName}</h3>
            <p>{props.position}</p>
          </div>
      </div>
    </div>
  )
}
