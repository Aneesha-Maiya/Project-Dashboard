import React,{useEffect} from 'react'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL
const getUserDetails = () => {
    axios.get(`${baseUrl}api/User/GetUserDetails?userName=abc`)
    .then((response) => {
      console.log("Response from Axios for getting user details: "+ JSON.stringify(response))
      console.log("data from axios (Get): "+response.data)
    })
    .catch((error) => console.log("error msg: "+error))
}

export default getUserDetails
