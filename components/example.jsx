import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Example = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        setTimeout(()=>{
            navigate('/')
        },2000)
    },[])
    return (
        <>
         <h1>Example component</h1>
        </>
    )
}

export default Example;