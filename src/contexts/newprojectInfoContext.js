import React from 'react'
import { createContext } from 'react'
const newProjectInfoContext = createContext(
    {
        projectName: "",
        userName: "",
        userId:"",
        techUsed: "",
    }
)
export default newProjectInfoContext