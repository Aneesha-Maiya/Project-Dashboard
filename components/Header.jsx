import React from 'react'

export default function Header(props) {
  return (
    <div className='HeaderContent'>
      <h3 className='CompanyName'><i class = "fa fa-bolt"/>Krejo </h3>
      <div className='Greeting'>
          <h2>Hi {props.name}</h2>
          <p>Keep up the good work!</p>
      </div>
      <div className='SearchBar'>
        <i class = "fa fa-search"><input type='search' placeholder='Search your project,task,etc...'/></i>
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
