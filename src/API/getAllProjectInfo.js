import React from 'react'
import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL
const getAllProjectInfo = () => {
    axios.get(`${baseURL}api/User/CodeBlock/GetAll?userId=LA2345`) 
      .then((response) => {
        console.log("Response from Axios for getting all projects of user(Get): "+ JSON.stringify(response))
        console.log("data from axios (Get): "+response.data)
      })
      .catch((error) => {console.log("error msg: "+error)})
}

export default getAllProjectInfo
