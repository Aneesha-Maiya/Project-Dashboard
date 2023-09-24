import React from 'react'
import TaskPanel from './TaskPanel'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {Row,Col,Container} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"


export default function Sidebar(props) {
  const projects = props.project
  return (
    <>
    <div className='SideBarContent'>
        <div className='SideBarList'>
            <Link to='/'><a href='#'><i class = 'fa fa-home'/>Home</a></Link>
            <Link to='/Password'><a href='#'onClick={()=>{props.passwordSetModel(true)}}
            ><i class ='fa fa-check-square-o'/>My tasks</a></Link>
            <a href='/'><i class ='fa fa-bell-o'/>Inbox</a>
        </div>
        <div className='FavoriteProjects'>
          <h4 className='FavoriteHeading'>Favorites</h4>
          <ul>
              {
                projects.map((item,index)=>{
                  if(item.isFavorite && item.id === 1){
                    return (<li id='listItem1'>{item.name}</li>)
                  }
                  else if((item.isFavorite && item.id === 2) || (item.isFavorite && item.id%2 === 0)){
                    return (<li id='listItem2'>{item.name}</li>)
                  }
                  else if((item.isFavorite && item.id === 3) || (item.isFavorite && item.id%3 === 0)){
                    return (<li id='listItem3'>{item.name}</li>)
                  }
                  else if(item.isFavorite && item.id === 4){
                    return (<li id='listItem4'>{item.name}</li>)
                  }
                })
              }
          </ul>
        </div>
        <div className='Teams-Projects'>
              <h4>Teams</h4>
              {/* <DropdownButton
                id = "dropdown-basic-button" 
                title = "ProductStudio"
                variant = "warning"
              >
                <Dropdown.Item className='dropdownItem' ><i class = "fa fa-dot-circle-o"/> Action</Dropdown.Item>
                <Dropdown.Item className='dropdownItem'><i class = "fa fa-dot-circle-o"/> Another Action</Dropdown.Item>
              </DropdownButton> */}
              <Container className='ProductStudio'>
                <Row>
                  <Col className='ProductStudioHeading'>ProductStudio</Col>
                </Row>
                <Row>
                  {
                    projects.map((item,index)=>{
                      if(item.team == "ProductStudio" && item.id == 1){
                        return (<Col sm ={12} id='teamProject1'><i class = "fa fa-dot-circle-o"/> {item.name}</Col>)
                      }
                      else if(item.team == "ProductStudio" && item.id == 2){
                        return (<Col sm ={12} id='teamProject2'><i class = "fa fa-dot-circle-o"/> {item.name}</Col>)
                      }
                      else if(item.team == "ProductStudio" && item.id == 3){
                        return (<Col sm ={12} id='teamProject3'><i class = "fa fa-dot-circle-o"/> {item.name}</Col>)
                      }
                      else if(item.team == "ProductStudio" && item.id == 4){
                        return (<Col sm ={12} id='teamProject4'><i class = "fa fa-dot-circle-o"/> {item.name}</Col>)
                      }
                    })
                  }
                </Row>
              </Container>
              <Container className='AnimateStudio'>
                <Row>
                  <Col className='AnimateStudioHeading'>AnimateStudio</Col>
                </Row>
              </Container>
        </div>
    </div>
    </>
  )
}
let LinkElement = document.querySelector('a')
let ListItemElement = document.querySelector('li')