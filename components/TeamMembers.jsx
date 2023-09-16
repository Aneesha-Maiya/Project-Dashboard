import React from 'react'

export default function TeamMembers(props) {
  return (
    <>
        <div className='TeamMemberContent'>
          <img src={props.profileImg} alt='no img'/>
          <div className='TeamMemberInfo'>
            <h3>{props.name}</h3>
            <p>{props.position}</p> 
          </div>
          <i class = "fa fa-commenting-o"></i>
        </div>
    </>
  )
}
